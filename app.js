const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');

mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const app = express();

app.use(express.json());

app.use('/users', usersRouter);

app.listen(3000);
