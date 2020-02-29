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
      return res.sendStatus(500);
    }

    return res.send(JSON.parse(data)['events']);
  });
});

app.get('/events/:id', function (req, res) {
  var id = req.params.id;

  fs.readFile('./data/events.json', function (err, data) {
    if (err) {
      return res.sendStatus(500);
    }

    return res.send(JSON.parse(data)['events'][id]);
  });
});

app.get('/events/:id/users', function (req, res) {
  var id = req.params.id;

  fs.readFile('./data/events.json', function (err, data) {
    if (err) {
      return res.sendStatus(500);
    }

    fs.readFile('./data/users.json', function (err1, data1) {
      if (err1) {
        return res.sendStatus(500);
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

app.get('/events/:id/getUsers', function (req, res) {
  var id = req.params.id;

  fs.readFile('./data/events.json', function (err, data) {
    if (err) {
      return res.sendStatus(500);
    }

    fs.readFile('./data/users.json', function (err1, data1) {
      if (err1) {
        return res.sendStatus(500);
      }

      var users = [];
      var us = JSON.parse(data1)['users'];

      JSON.parse(data)['events'][id]['visitors'].forEach(uid => {
        users.push(us[uid]['username']);
      });

      if (users.length == 0) {
        return res.send("Nobody is going yet");
      }

      if (users.length - 1 == 0) {
        return res.send(users[0] + " is going");
      }

      return res.send(users[0] + " and " + (users.length - 1) + " other users are going");
    });
  });
});

app.post('/events', function (req, res) {
  var data = fs.readFileSync('./data/events.json');
  var events = JSON.parse(data)['events'];
  var newEvent = req.body;

  if (newEvent['name'] == null || newEvent['organiser'] == null || newEvent['location'] == null || newEvent['time'] == null || newEvent['image'] == null || newEvent['description']) {
    return res.status(400).send("Invalid event format");
  }

  events.push(newEvent);

  newEvent['id'] = events.length;
  newEvent['post_time'] = new Date();
  newEvent['visitors'] = [];

  fs.writeFile('./data/events.json', JSON.stringify({events: events}), 'utf8', function (err) {
    if (err) {
      return res.sendStatus(500);
    }
    return res.send(events);
  });
});

app.get('/users', function (req, res) {
  fs.readFile('./data/users.json', function (err, data) {
    if (err) {
      return res.sendStatus(500);
    }

    return res.send(JSON.parse(data)['users']);
  });
});

app.get('/users/:uname/events', function (req, res) {
  var uname = req.params.uname;

  fs.readFile('./data/users.json', function (err, data) {
    if (err) {
      return res.sendStatus(500);
    }
    var found = false
    JSON.parse(data)['users'].forEach(u => {
      if (u['username'] === uname.toString()) {
        found = true
        var events = [];

        fs.readFile('./data/events.json', function (err1, data1) {
          if (err1) {
            return res.sendStatus(500);
          }

          var es = JSON.parse(data1);

          u['events'].forEach(id => {
            events.push(es['events'][id]);
          });

          return res.json(events);
        });
      }
    });
    if (!found) {
      return res.status(400).send("Username not found");
    }
  });
});

app.post('/users', function (req, res) {
  var data = fs.readFileSync('./data/users.json');
  var users = JSON.parse(data)['users'];
  var newUser = req.body;

  console.log(newUser);

  if (newUser['username'] == null) {
    return res.status(400).send("Invalid event format");
  }
  flag = false
  users.forEach(user => {
    if (user['username'] === newUser['username']) {
      flag = true
      return res.status(400).send("Username is already taken");
    }
  });
  if (flag) {
    return;
  }

  users.push(newUser);

  newUser['id'] = users.length;
  newUser['events'] = [];

  fs.writeFile('./data/users.json', JSON.stringify({users: users}), 'utf8', function (err) {
    if (err) {
      return res.sendStatus(500);
    }

    return res.send(users);
  });
});

app.get('/users/:username', function (req, res) {
  var username = req.params.username;

  fs.readFile('./data/users.json', function (err, data) {
    if (err) {
      return res.sendStatus(500);
    }
    var found = false
    JSON.parse(data)['users'].forEach (u => {
      if (u['username'] === username) {
        found = true
        return res.status(200).json(u);
      }
    });

    if (!found) {
      return res.status(400).send("Username not found");
    }
  });
});

app.listen(port);
