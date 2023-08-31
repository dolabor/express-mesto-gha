const express = require('express');
const mongoose = require('mongoose');
const rootRouter = require('./routes/routes');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use((req, res, next) => {
  req.user = {
    _id: '64f0e6459834f3bc99ab6c93',
  };

  next();
});

app.use(rootRouter);

app.listen(PORT);
