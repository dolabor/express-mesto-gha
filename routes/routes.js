const express = require('express');
const { celebrate, Joi } = require('celebrate');
const userRouter = require('./users');
const cardRouter = require('./cards');
const { createUser, login } = require('../controllers/users');
const { NotFoundError } = require('../utils/errors/errors');
const auth = require('../middlewares/auth');
const { checkValidityURL } = require('../utils/validationURL');

const rootRouter = express.Router();

rootRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(checkValidityURL),
  }),
}), createUser);

rootRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

rootRouter.use('/users', auth, userRouter);
rootRouter.use('/cards', auth, cardRouter);

rootRouter.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = { rootRouter };
