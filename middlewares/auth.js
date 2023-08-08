const jwt = require('jsonwebtoken');

const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  const { auth } = req.headers;
  const bearer = 'Bearer ';

  if (!auth || !auth.startsWith(bearer)) {
    return next(new AuthError('Произошла ошибка: Auth Error'));
  }

  const token = auth.replace(bearer, '');
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return next(new AuthError('Произошла ошибка: Auth Error'));
  }

  req.user = payload;

  return next();
};
