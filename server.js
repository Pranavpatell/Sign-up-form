require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index3.html');
  });
  
mongoose.connect(process.env.MONGO_URI || 'mongodb://mongo:YKdhFxNCBVpvWuotHDCKHvwAKdRjxOuT@trolley.proxy.rlwy.net:35483/');

const FormSchema = new mongoose.Schema({
  name: String,
  email: String,
  
  message: String
});

const Form = mongoose.model('Form', FormSchema);

app.post('/submit', async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.send('Form Submitted Successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to submit form');
  }
});

app.listen('mongodb://mongo:YKdhFxNCBVpvWuotHDCKHvwAKdRjxOuT@trolley.proxy.rlwy.net:35483/', () => {
  console.log('Server is running on http://localhost:3000');
});
