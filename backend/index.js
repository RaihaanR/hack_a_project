var express = require('express');
var fs = require('fs');
var app = express();

app.get('/', function (req, res) {
  res.send('');
})

app.get('/events', function (req, res) {
  var data = fs.readFileSync('./data/data.json');
  res.send(JSON.parse(data));
})

app.get('/events/:id', function (req, res) {
  var id = req.params.id;
  var data = JSON.parse(fs.readFileSync('./data/data.json'))['events'];

  res.send(data[id]);
})

app.listen(3000);
