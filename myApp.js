const express = require('express');
const path = require('path');
const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));
// console.log('Hello World');

app.get('/', (req, res) => {
  const file_path = path.join(__dirname, 'views/index.html');
  // console.log(file_path);
  res.sendFile(file_path);
  // res.send('Hello Express');
});

module.exports = app;
