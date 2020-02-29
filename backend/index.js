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
  fs.readFile('./data/events.json', function (err, data) {
    if (err) {
      return res.status(500).send();
    }

    return res.send(JSON.parse(data)['events']);
  });
});

app.get('/events/:id', function (req, res) {
  var id = req.params.id;

  fs.readFile('./data/events.json', function (err, data) {
    if (err) {
      return res.status(500).send();
    }

    return res.send(JSON.parse(data)['events'][id]);
  });
});

app.get('/events/:id/users', function (req, res) {
  var id = req.params.id;

  fs.readFile('./data/events.json', function (err, data) {
    if (err) {
      return res.status(500).send();
    }

    fs.readFile('./data/users.json', function (err1, data1) {
      if (err1) {
        return res.status(500).send();
      }

      var users = [];
      var us = JSON.parse(data1)['users'];

      JSON.parse(data)['events'][id]['visitors'].forEach(uid => {
        users.push(us[uid]['username']);
      });

      return res.send(users);
    });
  });
});

app.post('/events', function (req, res) {
  var data = fs.readFileSync('./data/events.json');
  var events = JSON.parse(data)['events'];
  var newEvent = req.body;

  if (newEvent['name'] == null || newEvent['organiser'] == null || newEvent['location'] == null || newEvent['time'] == null || newEvent['image'] == null) {
    return res.status(400).json({message: "Invalid event format"});
  }

  events.push(newEvent);

  newEvent['id'] = events.length;
  newEvent['post_time'] = new Date();
  newEvent['visitors'] = [];

  fs.writeFile('./data/events.json', JSON.stringify({events: events}), 'utf8', function (err) {
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

    return res.send(JSON.parse(data)['users']);
  });
});

app.get('/users/:uname/events', function (req, res) {
  var uname = req.params.uname;

  fs.readFile('./data/users.json', function (err, data) {
    if (err) {
      return res.status(500).send();
    }

    JSON.parse(data)['users'].forEach(u => {
      if (u['username'] === uname.toString()) {
        var events = [];

        fs.readFile('./data/events.json', function (err1, data1) {
          if (err1) {
            return res.status(500).send();
          }

          var es = JSON.parse(data1);

          u['events'].forEach(id => {
            events.push(es['events'][id]);
          });

          return res.send(events);
        });
      }
    });
  });
});

app.post('/users', function (req, res) {
  var data = fs.readFileSync('./data/users.json');
  var users = JSON.parse(data)['users'];
  var newUser = req.body;

  console.log(newUser);

  if (newUser['username'] == null) {
    return res.status(400).json({message: "Invalid event format"});
  }
  users.forEach(user => {
    if (user['username'] === newUser['username']) {
      return res.status(400).json({ message: "Username is already taken"});
    }
  });

  users.push(newUser);

  newUser['id'] = users.length;
  newUser['events'] = [];

  fs.writeFile('./data/users.json', JSON.stringify({users: users}), 'utf8', function (err) {
    if (err) {
      return res.status(500).json({ message: "Internal server error"});
    }

    return res.status(200).send(users);
  });
});

app.listen(port);
