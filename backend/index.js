var express = require('express')
var app = express()

var fs = require('fs')

app.use(express.json());

app.get('/', function (req, res) {
  res.send('');
})

app.get('/events', function (req, res) {
  var data = fs.readFileSync('./data/data.json');
  console.log(data.toString());
})

app.post('/events', function (req, res) {
  var data = fs.readFileSync('./data/data.json');
  var events = JSON.parse(data)["events"];
  var newEvent = req.body;
  if (newEvent["name"] == null || newEvent["organizer"] == null || newEvent["location"] == null) {
    return res.status(400).send({ message: "Invalid event format"})
  }
  console.log(events)
  events.push(newEvent)
  newEvent["id"] = events.length
  newEvent["time"] = new Date()

  fs.writeFile('./data/data.json', JSON.stringify({events: events}), 'utf8', function(err){
    if (err) {
      return res.status(500).send({ message: "Internal server format"})
    }
    return res.status(200).send(events)
  })
})

app.listen(3000)
