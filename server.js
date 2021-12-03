const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./middleware/crud_user');
const allowedOrigins = ['http://localhost:5000'];

app.use(express.json());
app.use(cors({
  origin: allowedOrigins
}));

mongoose.connect('mongodb://localhost:27017/mongo-test', 
{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(res => {
  console.log('MongoDb connected');

  app.post('/user', async function(req, res) {
    let resp = await User.createUser(req)
    res.send(resp);
  });

  app.get('/user', async function(req, res) {
    let resp = await User.getUser(req)
    res.send(resp);
  });

  app.put('/user', async function (req, res) {
    let resp = await User.updateUser(req)
    res.send(resp);
  });

  app.delete('/user', async function (req, res) {
    let resp = await User.deleteUser(req)
    res.send(resp);
  });

  app.listen(5000, (req, res) => {
    console.log('Server is running on 5000 port.');
  });

}).catch(err => console.log(err))