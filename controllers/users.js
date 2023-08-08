const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const AuthError = require('../errors/AuthError');
const ConflictError = require('../errors/ConflictError');

module.exports.getUsersInfo = (_, res, next) => {
  User
    .find({})
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getUserInfoById = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Произошла ошибка: Not Found');
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Произошла ошибка: Bad Request'));
      } else {
        next(err);
      }
    });
};
module.exports.getCurrentUserInfo = (req, res, next) => {
  const { id } = req.user;
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Произошла ошибка: Not Found');
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Произошла ошибка: Bad Request'));
      } else {
        next(err);
      }
    });
};
module.exports.createUser = (req, res, next) => {
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
      if (err.code === 11000) {
        next(new ConflictError('Произошла ошибка: User with this email already exists'));
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Произошла ошибка: Bad Request'));
      } else {
        next(err);
      }
    });
};
module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' }),
      });
    })
    .catch(() => next(new AuthError('Произошла ошибка: Auth Error')));
};
module.exports.setUserInfo = (req, res, next) => {
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
        throw new NotFoundError('Произошла ошибка: Not Found');
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Произошла ошибка: Bad Request'));
      } else {
        next(err);
      }
    });
};
module.exports.setUserAvatar = (req, res, next) => {
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
        throw new NotFoundError('Произошла ошибка: Not Found');
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Произошла ошибка: Bad Request'));
      } else {
        next(err);
      }
    });
};
