const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUser = require('./routes/users');
const routerCard = require('./routes/cards');

const ERROR_BAD_REQUEST = 404;

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '64c2921ee691692506ac8968',
  };
  next();
});

app.use('/users', routerUser);
app.use('/cards', routerCard);

app.use('*', (req, res) => {
  res.status(ERROR_BAD_REQUEST).send({
    message: 'Произошла ошибка: Not Found',
  });
});

app.listen(PORT);
