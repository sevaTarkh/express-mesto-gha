const jwt = require('jsonwebtoken');

const AuthError = require('../errors/AuthError');

module.exports.auth = (req, res, next) => {
  const { auth } = req.headers;
  const barear = 'Barear ';

  if (!auth || !auth.startsWith('Bearer ')) {
    return next(new AuthError('Произошла ошибка: Auth Error'));
  }

  const token = auth.replace(barear, '');
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return next(new AuthError('Произошла ошибка: Auth Error'));
  }

  req.user = payload;

  return next();
};
