const jwt = require('jsonwebtoken');

const AuthError = require('../errors/AuthError');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError('Произошла ошибка: Auth Error 11111'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new AuthError('Произошла ошибка: token не совпадает'));
  }

  req.user = payload;

  return next();
};
