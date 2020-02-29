var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.json());

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

app.post('/events', function (req, res) {
  var data = fs.readFileSync('./data/data.json');
  var events = JSON.parse(data)["events"];
  var newEvent = req.body;
  if (newEvent["name"] == null || newEvent["organiser"] == null || newEvent["location"] == null || newEvent["time"] == null || newEvent["image"] == null) {
    return res.status(400).send({ message: "Invalid event format"})
  }
  console.log(events)
  events.push(newEvent)
  newEvent["id"] = events.length
  newEvent["post_time"] = new Date()
  newEvent["visitors"] = []

  fs.writeFile('./data/data.json', JSON.stringify({events: events}), 'utf8', function(err){
    if (err) {
      return res.status(500).send({ message: "Internal server format"})
    }
    return res.status(200).send(events)
  })
})

app.listen(3000)