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

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
