const express = require('express');
const bp = require('body-parser');
require('dotenv').config();
const path = require('path');
const app = express();

function timeMiddleware(req, res, next) {
  req.time = new Date().toString();
  next();
}

app.use(bp.urlencoded({ extended: false }));
//loger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});
// static files
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  const file_path = path.join(__dirname, 'views/index.html');

  res.sendFile(file_path);
});

app.get('/json', (req, res) => {
  const isUpper = process.env.MESSAGE_STYLE === 'uppercase';
  res.json({ message: isUpper ? 'HELLO JSON' : 'Hello json' });
});
app.get('/now', timeMiddleware, (req, res) => {
  res.json({ time: req.time });
});

app.get('/:word/echo', (req, res) => {
  const { word } = req.params;

  res.json({ echo: word });
});

app.get('/name', (req, res) => {
  const { first, last } = req.query;

  res.json({ name: first + ' ' + last });
});

app.module.exports = app;
