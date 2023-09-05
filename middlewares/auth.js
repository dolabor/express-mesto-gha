const jwt = require('jsonwebtoken');
const { UnauthorisedError } = require('../utils/errors/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorisedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorisedError('Необходима авторизация');
  }

  req.user = payload;

  next();
};