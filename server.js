//server.js
const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const cors = require('cors');
const dotenv = require('dotenv').config();
const shortId = require('shortid');
let mocks = require('./mocks');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const pusher = new Pusher({
  appId: process.env.PUSHER_APPID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  encrypted: true
});

app.post('/user', (req, res) => {
  // simulate actual db save with id (using shortId) and createdAt added
  const user = {
    id: shortId.generate(),
    createdAt: new Date().toISOString(),
    ...req.body
  };
  mocks.push(user); // like our db
  // trigger this update to our pushers listeners
  pusher.trigger('user', 'new', user);
  res.send(user);
});

app.delete('/user/:id', (req, res) => {
  const user = mocks.find(emp => emp.id === req.params.id);
  mocks = mocks.filter(emp => emp.id !== user.id);
  pusher.trigger('user', 'deleted', user);
  res.send(user);
});

app.get('/user', (req, res) => {
  res.send(mocks);
});

app.listen(2000, () => console.log('Listening at 2000'));
