var express = require('express')
var app = express()

var fs = require('fs')

app.get('/', function (req, res) {
  res.send('');
})

app.get('/events', function (req, res) {
  fs.readFile('./data/data.json'), function (err, data) {
    if (err) {
      throw err;
    }
  }
  console.log(data.toString());
})

app.listen(3000)
