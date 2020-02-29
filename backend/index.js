var express = require('express')
var app = express()

var fs = require('fs')

app.get('/', function (req, res) {
  res.send('');
})

app.get('/events', function (req, res) {
  var data = fs.readFileSync('./data/data.json');
  console.log(data.toString());
})

app.listen(3000)
