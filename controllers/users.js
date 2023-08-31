const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.send(user);
    })
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).json({ error: 'Введены некорректные данные' });
      } else {
        res.status(500).json({ error: 'На сервере произошла ошибка' });
      }
    });
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .orFail(new Error('Пользователь не найден'))
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'На сервере произошла ошибка' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .orFail(new Error('Пользователь не найден'))
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).json({ error: err.message });
      } else {
        res.status(400).json({ error: err.message });
      }
    });
};

module.exports = {
  getUsers, getUserById, createUser, updateUserProfile, updateAvatar,
};
