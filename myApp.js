const express = require('express');
require('dotenv').config();
const path = require('path');
const app = express();

// static files
app.use('/public', express.static(path.join(__dirname, 'public')));

//loger middleware
app.use((req, res, next) => {
  console.log(`${req.method}${req.path} - ${req.ip}`);
  next();
});

app.get('/', (req, res) => {
  const file_path = path.join(__dirname, 'views/index.html');
  // console.log(file_path);
  res.sendFile(file_path);
  // res.send('Hello Express');
});

app.get('/json', (req, res) => {
  const isUpper = process.env.MESSAGE_STYLE === 'uppercase';
  res.json({ message: isUpper ? 'HELLO JSON' : 'Hello json' });
});

module.exports = app;
