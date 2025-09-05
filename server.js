const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index3.html');
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.error("❌ MongoDB Connection Failed:", err));

// Schema
const FormSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});
const Form = mongoose.model('Form', FormSchema);

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

// Listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
