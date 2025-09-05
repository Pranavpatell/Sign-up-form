const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ✅ MongoDB Connection (use existing DB & avoid creating new DBs)
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'ElSenorDB',          // force using your existing DB
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000
})
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch(err => console.error("❌ MongoDB Connection Failed:", err));

// Schema (all fields)
const FormSchema = new mongoose.Schema({
  name: String,
  number: String,
  email: String,
  birthdate: String,
  password: String
});

// Use existing collection 'forms' explicitly
const Form = mongoose.model('Form', FormSchema, 'forms');

// POST route
app.post('/submit', async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.send('✅ Form Submitted Successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Failed to submit form');
  }
});

// Listen on Render port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
