const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(bodyParser.json());

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

app.post('/api/leads', (req, res) => {
  const { name, phone, city, interest, isNri, nriCountry, message } = req.body;
  
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  const leads = readLeads();
  const newLead = {
    id: uuidv4(),
    name,
    phone,
    city: city || '',
    interest: interest || '',
    is_nri: isNri || '',
    nri_country: nriCountry || '',
    message: message || '',
    status: 'new',
    created_at: new Date().toISOString(),
  };

  leads.push(newLead);
  writeLeads(leads);

  res.status(201).json({ success: true, lead: newLead });
});

app.get('/api/leads', (req, res) => {
  const leads = readLeads();
  leads.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  res.json(leads);
});

app.patch('/api/leads/:id', (req, res) => {
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

app.get('/api/leads/:id/notes', (req, res) => {
  const { id } = req.params;
  const notesMap = readNotes();
  const leadNotes = notesMap[id] || [];
  leadNotes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  res.json(leadNotes);
});

app.post('/api/leads/:id/notes', (req, res) => {
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
});app.delete('/api/leads/:id', (req, res) => {
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


app.listen(3001, () => {
  console.log('Server running on port 3001');
});
