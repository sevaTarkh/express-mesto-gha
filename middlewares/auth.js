const jwt = require('jsonwebtoken');

const handleAuthError = (res) => {
  res.status(401).send({
    message: ' Необходима авторизация',
  });
};

const extractBearerToken = (header) => {
  return header.replace( 'Bearer', ''),
}