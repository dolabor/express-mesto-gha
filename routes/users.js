const express = require('express');
const {
  getUsers, getUserById, createUser, updateUserProfile, updateAvatar,
} = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.post('/', createUser);

usersRouter.patch('/me', updateUserProfile);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
