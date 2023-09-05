const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserById, updateUserProfile, updateAvatar, getCurrentUserProfile,
} = require('../controllers/users');
const { checkValidityURL } = require('../utils/validationURL');

const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUserProfile);

usersRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserById);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserProfile);

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().min(2).custom(checkValidityURL),
  }),
}), updateAvatar);

module.exports = usersRouter;
