const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUser = require('./routes/users');


const {PORT = 3000} = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb',{
  useNewUrlParser: true
});


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', routerUser);

app.use((req, res, next) => {
  req.user = {
    _id: '64c2921ee691692506ac8968' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

app.listen(PORT, () =>{
  console.log(`Application is runnig on port ${PORT}`)
});