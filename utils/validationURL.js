const { BadRequestError } = require('./errors/errors');

const checkValidityURL = (url) => {
  const regex = /^(https?:\/\/)?(www\.)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+#?$/i;
  if (regex.test(url)) {
    return url;
  }
  throw new BadRequestError('Некорректные данные');
};

module.exports = { checkValidityURL };
