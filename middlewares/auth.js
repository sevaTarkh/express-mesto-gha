const jwt = require('jsonwebtoken');

const AuthError = require('../errors/AuthError');

const extractBearerToken = (header) => {
  header.replace('Bearer ', '');
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError('Произошла ошибка: Auth Error 11111'));
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return next(new AuthError('Произошла ошибка: Auth Error'));
  }

  req.user = payload;

  return next();
};
