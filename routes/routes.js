const express = require('express');
const userRouter = require('./users');
const cardRouter = require('./cards');

const rootRouter = express.Router();

rootRouter.use('/users', userRouter);
rootRouter.use('/cards', cardRouter);

module.exports = rootRouter;
