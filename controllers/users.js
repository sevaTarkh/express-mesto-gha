const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const ERROR_CODE = 400;
const ERROR_BAD_REQUEST = 404;
const ERROR_SERVER = 500;

module.exports.getUsersInfo = (_, res) => {
  User
    .find({})
    .then((user) => res.send(user))
    .catch(() => res.status(ERROR_SERVER).send({
      message: 'Произошла ошибка: Server Error',
    }));
};

module.exports.getUserInfoById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(ERROR_BAD_REQUEST).send({
          message: 'Произошла ошибка: Not Found',
        });
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({
          message: 'Произошла ошибка: Bad Request',
        });
      } else {
        res.status(ERROR_SERVER).send({
          message: 'Произошла ошибка: Server Error',
        });
      }
    });
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(ERROR_CODE).send({
          message: 'Произошла ошибка: Bad Request',
        });
      } else {
        res.status(ERROR_SERVER).send({
          message: 'Произошла ошибка: Server Error',
        });
      }
    });
};
module.exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then(({ _id: userId }) => {
      if (userId) {
        const token = jwt.sign({ userId }, 'super-strong-secret', { expiresIn: '7d' });
      }

      return res.send({ _id: token });
    });
};
module.exports.setUserInfo = (req, res) => {
  const { name, about } = req.body;
  const { _id: userId } = req.user;

  User.findByIdAndUpdate(
    userId,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        res.status(ERROR_BAD_REQUEST).send({
          message: 'Произошла ошибка: Not Found',
        });
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(ERROR_CODE).send({
          message: 'Произошла ошибка: Bad Request',
        });
      } else {
        res.status(ERROR_SERVER).send({
          message: 'Произошла ошибка: Server Error',
        });
      }
    });
};
module.exports.setUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id: userId } = req.user;

  User.findByIdAndUpdate(
    userId,
    {
      avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        res.status(ERROR_BAD_REQUEST).send({
          message: 'Произошла ошибка: Not Found',
        });
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(ERROR_CODE).send({
          message: 'Произошла ошибка: Bad Request',
        });
      } else {
        res.status(ERROR_SERVER).send({
          message: 'Произошла ошибка: Server Error',
        });
      }
    });
};
