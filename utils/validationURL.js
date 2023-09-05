const { BadRequestError } = require('./errors/errors');

const checkValidityURL = (url) => {
  // eslint-disable-next-line no-useless-escape
  const regex = /^https?:\/\/(www\.)?[0-9a-z-._~:\/\?#\[\]@!$&'()*+,;=]+#?$/igm;
  if (regex.test(url)) {
    return url;
  }
  throw new BadRequestError('Некорректные данные');
};

module.exports = { checkValidityURL };
