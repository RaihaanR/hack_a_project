var express = require('express')
var app = express()

var fs = require('fs')

app.get('/', function (req, res) {
  res.send('');
})

app.get('/events', function (req, res) {
  var data = fs.readFileSync('./data/data.json');
  res.send(data.toString());
})

app.get('/events/:id', function (req, res) {
  var id = req.params.id;
  var data = JSON.parse(fs.readFileSync('./data/data.json'))['events'][id];
  res.send(data);
})

app.listen(3000)
