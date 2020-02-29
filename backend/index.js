var express = require('express');
const cors = require('cors');
var fs = require('fs');
var app = express();

var port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', function (req, res) {
  res.send('Nothing here');
});

app.get('/events', function (req, res) {
  fs.readFile('./data/data.json', function (err, data) {
    if (err) {
      return res.status(500).send();
    }

    return res.send(JSON.parse(data)['events']);
  });
});

app.get('/events/:id', function (req, res) {
  var id = req.params.id;
  fs.readFile('./data/data.json', function (err, data) {
    if (err) {
      return res.status(500).send();
    }

    return res.send(JSON.parse(data)['events'][id]);
  });
});

app.post('/events', function (req, res) {
  var data = fs.readFileSync('./data/data.json');
  var events = JSON.parse(data)['events'];
  var newEvent = req.body;

  if (newEvent['name'] == null || newEvent['organiser'] == null || newEvent['location'] == null || newEvent['time'] == null || newEvent['image'] == null) {
    return res.status(400).json({message: "Invalid event format"});
  }

  events.push(newEvent);

  newEvent["id"] = events.length;
  newEvent["post_time"] = new Date();
  newEvent["visitors"] = [];

  fs.writeFile('./data/data.json', JSON.stringify({events: events}), 'utf8', function(err) {
    if (err) {
      return res.status(500).json({message: "Internal server error"});
    }
    return res.status(200).send(events);
  });
});

app.get('/users', function (req, res) {
  fs.readFile('./data/users.json', function (err, data) {
    if (err) {
      return res.status(500).send();
    }
    console.log(JSON.parse(data)['users'][1])
    return res.send(JSON.parse(data)['users']);
  });
});

app.post('/users', function (req, res) {
  var data = fs.readFileSync('./data/users.json');
  var users = JSON.parse(data)['users'];
  var newUser = req.body;

  console.log(newUser);

  if (newUser['username'] == null) {
    return res.status(400).json({ message: "Invalid event format"});
  }
  users.forEach(user => {
    if (user['username'] === newUser['username']) {
      return res.status(400).json({ message: "Username is already taken"});
    }
  });

  users.push(newUser);

  newUser['id'] = users.length;
  newUser['events'] = [];

  fs.writeFile('./data/users.json', JSON.stringify({users: users}), 'utf8', function(err) {
    if (err) {
      return res.status(500).json({ message: "Internal server error"});
    }
    return res.status(200).json(users);
  });
});

app.listen(port)

