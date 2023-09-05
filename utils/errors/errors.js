const BadRequestError = require('./BadRequestError');
const NotFoundError = require('./NotFoundError');
const UnauthorisedError = require('./UnauthorisedError');
const ConflictError = require('./ConflictError');
const ForbiddenError = require('./ForbiddenError');

module.exports = {
  BadRequestError, NotFoundError, UnauthorisedError, ConflictError, ForbiddenError,
};
