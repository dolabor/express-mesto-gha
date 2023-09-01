const User = require('../models/user');
const { HTTP_STATUS } = require('../utils/constants');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(HTTP_STATUS.NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(HTTP_STATUS.BAD_REQUEST).send({ message: 'Некорректные данные' });
      } else {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(HTTP_STATUS.CREATED).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(HTTP_STATUS.BAD_REQUEST).send({ message: 'Некорректные данные' });
      } else {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .orFail()
    .then((user) => {
      res.status(HTTP_STATUS.OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(HTTP_STATUS.BAD_REQUEST).send({ message: 'Некорректные данные' });
      } else {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .orFail()
    .then((user) => {
      res.status(HTTP_STATUS.OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(HTTP_STATUS.BAD_REQUEST).send({ message: 'Некорректные данные' });
      } else {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  getUsers, getUserById, createUser, updateUserProfile, updateAvatar,
};
