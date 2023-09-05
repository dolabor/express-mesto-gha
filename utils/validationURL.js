const checkValidityURL = (url) => {
  const regex = /^(https?:\/\/)?(www\.)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+#?$/i;
  if (regex.test(url)) {
    return url;
  }
  throw new Error('Невалидный URL');
};

module.exports = { checkValidityURL };
