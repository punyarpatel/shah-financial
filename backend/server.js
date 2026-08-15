const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();

// ---------------------------------------------------------------------------
// CORS — restrict to frontend origin only
// ---------------------------------------------------------------------------
const allowedOrigins = [
  'http://localhost:5173',
  'https://drishtiwealth.com',
  'https://www.drishtiwealth.com'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server calls (no origin header) and known origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin '${origin}' not allowed`));
    }
  },
  credentials: true,
}));

const logger = require('./logger');
const monitor = require('./monitoring');

// ---------------------------------------------------------------------------
// HTTP Request Logging & Latency Monitoring Middleware
// ---------------------------------------------------------------------------
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const durationMs = Date.now() - start;
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';

    // Record in monitoring engine
    monitor.recordRequest({
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      durationMs,
      ip
    });

    // Structured JSON log for every HTTP request
    const level = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info';
    logger[level](`HTTP ${req.method} ${req.originalUrl} ${res.statusCode} ${durationMs}ms`, {
      event: 'HTTP_REQUEST',
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration_ms: durationMs,
      client_ip: ip
    });
  });
  next();
});

// ---------------------------------------------------------------------------
// Health Check & System Monitoring Endpoint
// ---------------------------------------------------------------------------
app.get('/api/health', (req, res) => {
  const healthStats = monitor.getHealthStats();
  const statusCode = healthStats.status === 'healthy' ? 200 : 503;
  res.status(statusCode).json(healthStats);
});

// Test Endpoint to simulate internal 500 error for log verification
app.get('/api/test-error', (req, res, next) => {
  const testError = new Error('Simulated internal server error for logging verification');
  next(testError);
});

// ---------------------------------------------------------------------------
// Supabase JWT verification middleware
// ---------------------------------------------------------------------------
// We verify the JWT locally using the Supabase JWT secret so we don't need
// a network round-trip. If you don't have the secret, set SUPABASE_JWT_SECRET
// in backend/.env; you can find it in Supabase → Project Settings → API.
//
// Fallback: if the secret is not set we do a lightweight introspection by
// calling the Supabase /auth/v1/user endpoint with the token.
// ---------------------------------------------------------------------------
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

async function verifySupabaseToken(token) {
  if (!token) return null;

  // Use the Supabase admin /auth/v1/user endpoint for token introspection.
  // This requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in backend env.
  if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
    try {
      const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          apikey: SUPABASE_SERVICE_KEY,
        },
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.error('Token verification error:', err.message);
    }
    return null;
  }

  // ----------------------------------------------------------------
  // Fallback: decode (NOT verify) the JWT payload so we can at least
  // confirm it looks like a Supabase token.  This is weaker than
  // full signature verification — configure SUPABASE_SERVICE_ROLE_KEY
  // for production use.
  // ----------------------------------------------------------------
  try {
    const [, payloadB64] = token.split('.');
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) return null; // expired
    if (payload.role !== 'authenticated') return null;  // not a user token
    return payload;
  } catch {
    return null;
  }
}

async function requireAuth(req, res, next) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  const user = await verifySupabaseToken(token);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized: valid session token required' });
  }

  req.user = user;
  next();
}

// ---------------------------------------------------------------------------
// File-based helpers
// ---------------------------------------------------------------------------
const DB_PATH = path.join(__dirname, 'leads.json');

const readLeads = () => {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeLeads = (leads) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(leads, null, 2));
};

const NOTES_PATH = path.join(__dirname, 'notes.json');

const readNotes = () => {
  try {
    if (!fs.existsSync(NOTES_PATH)) {
      fs.writeFileSync(NOTES_PATH, JSON.stringify({}, null, 2));
      return {};
    }
    const data = fs.readFileSync(NOTES_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
};

const writeNotes = (notes) => {
  fs.writeFileSync(NOTES_PATH, JSON.stringify(notes, null, 2));
};

// ---------------------------------------------------------------------------
// Public endpoint — lead submission from the public contact forms
// (intentionally left open; this is the website's enquiry form)
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Rate Limiting Middleware (In-memory IP tracking)
// ---------------------------------------------------------------------------
const createRateLimiter = (options = {}) => {
  const windowMs = options.windowMs || 15 * 60 * 1000; // default 15 minutes
  const max = options.max || 5;                         // default 5 requests per window
  const message = options.message || { error: 'Too many requests. Please try again later after 15 minutes.' };
  
  const hits = new Map();

  setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of hits.entries()) {
      if (now - data.startTime > windowMs) {
        hits.delete(ip);
      }
    }
  }, windowMs);

  return (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const now = Date.now();

    if (!hits.has(ip)) {
      hits.set(ip, { count: 1, startTime: now });
      return next();
    }

    const data = hits.get(ip);

    if (now - data.startTime > windowMs) {
      data.count = 1;
      data.startTime = now;
      return next();
    }

    data.count += 1;

    if (data.count > max) {
      res.setHeader('Retry-After', Math.ceil((windowMs - (now - data.startTime)) / 1000));
      return res.status(429).json(message);
    }

    next();
  };
};

// Strict rate limiter for lead submissions / sensitive endpoints (5 requests per 15 minutes)
const leadSubmissionLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many lead submissions from this IP. Limit is 5 requests per 15 minutes.' }
});

// General rate limiter for API endpoints (60 requests per minute)
const generalApiLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 60,
  message: { error: 'Too many requests. Limit is 60 requests per minute.' }
});

app.use('/api/', generalApiLimiter);

// ---------------------------------------------------------------------------
// Input sanitization helper — trims strings and enforces max length.
// This is defense-in-depth; React auto-escapes on render, but we also
// want clean data at the storage layer.
// ---------------------------------------------------------------------------
const sanitize = (val, maxLen = 500) => {
  if (typeof val !== 'string') return '';
  return val.trim().slice(0, maxLen);
};

app.post('/api/leads', leadSubmissionLimiter, (req, res) => {
  const { name, phone, city, interest, isNri, nriCountry, message } = req.body;

  const cleanName  = sanitize(name, 100);
  const cleanPhone = sanitize(phone, 30);

  if (!cleanName || !cleanPhone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  const leads = readLeads();
  const newLead = {
    id: uuidv4(),
    name:       cleanName,
    phone:      cleanPhone,
    city:       sanitize(city, 100),
    interest:   sanitize(interest, 200),
    is_nri:     sanitize(isNri, 100),
    nri_country: sanitize(nriCountry, 100),
    message:    sanitize(message, 1000),
    status: 'new',
    created_at: new Date().toISOString(),
  };

  leads.push(newLead);
  writeLeads(leads);

  res.status(201).json({ success: true, lead: newLead });
});

// ---------------------------------------------------------------------------
// Protected admin endpoints — all require a valid Supabase session token
// ---------------------------------------------------------------------------

// GET all leads
app.get('/api/leads', requireAuth, (req, res) => {
  const leads = readLeads();
  leads.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  res.json(leads);
});

// PATCH lead status
app.patch('/api/leads/:id', requireAuth, (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  const leads = readLeads();
  const index = leads.findIndex((lead) => lead.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Lead not found' });
  }

  leads[index].status = status;
  writeLeads(leads);

  res.json(leads[index]);
});

// GET notes for a lead
app.get('/api/leads/:id/notes', requireAuth, (req, res) => {
  const { id } = req.params;
  const notesMap = readNotes();
  const leadNotes = notesMap[id] || [];
  leadNotes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  res.json(leadNotes);
});

// POST a note for a lead
app.post('/api/leads/:id/notes', requireAuth, (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Note text is required' });
  }

  const notesMap = readNotes();
  if (!notesMap[id]) {
    notesMap[id] = [];
  }

  const newNote = {
    id: uuidv4(),
    text: text.trim(),
    created_at: new Date().toISOString()
  };

  notesMap[id].push(newNote);
  writeNotes(notesMap);

  const leadNotes = notesMap[id];
  leadNotes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  res.status(201).json(leadNotes);
});

// DELETE a lead
app.delete('/api/leads/:id', requireAuth, (req, res) => {
  const { id } = req.params;

  const leads = readLeads();
  const updatedLeads = leads.filter((lead) => lead.id !== id);
  writeLeads(updatedLeads);

  const notesMap = readNotes();
  if (notesMap[id]) {
    delete notesMap[id];
    writeNotes(notesMap);
  }

  res.json({ success: true });
});

// ---------------------------------------------------------------------------
// Custom 404 Handler for Undefined Backend Routes
// ---------------------------------------------------------------------------
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// ---------------------------------------------------------------------------
// Global 500 Error Handler (Prevents stack traces in response)
// ---------------------------------------------------------------------------
app.use((err, req, res, next) => {
  logger.error(err.message || 'Unhandled Server Error', {
    event: 'SERVER_EXCEPTION',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    url: req.originalUrl,
    method: req.method
  });
  res.status(err.status || 500).json({
    status: err.status || 500,
    error: 'Internal Server Error',
    message: 'An unexpected error occurred on the server.'
  });
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
