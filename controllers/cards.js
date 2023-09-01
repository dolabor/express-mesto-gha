const Card = require('../models/card');
const { HTTP_STATUS } = require('../utils/constants');

const getCards = (req, res) => {
  Card.find()
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      Card.findById(card._id)
        .populate('owner')
        .then((createdCard) => res.status(HTTP_STATUS.CREATED).send(createdCard))
        .catch(() => res.status(HTTP_STATUS.NOT_FOUND).send({ message: 'Карточкa не найденa' }));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(HTTP_STATUS.BAD_REQUEST).send({ message: 'Некорректные данные' });
      } else {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .populate(['owner', 'likes'])
    .orFail(new Error('DocumentNotFoundError'))
    .then((user) => {
      res.status(HTTP_STATUS.OK).send(user);
    })
    .catch((err) => {
      if (err.message === 'DocumentNotFoundError') {
        res.status(HTTP_STATUS.NOT_FOUND).send({ message: 'Карточка не найдена' });
      } else if (err.name === 'CastError') {
        res.status(HTTP_STATUS.BAD_REQUEST).send({ message: 'Некорректные данные' });
      } else {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(new Error('NotFoundError'))
    .then((card) => {
      res.status(HTTP_STATUS.OK).send(card);
    })
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        res.status(HTTP_STATUS.NOT_FOUND).send({ message: 'Карточка не найдена' });
      } else if (err.name === 'CastError') {
        res.status(HTTP_STATUS.BAD_REQUEST).send({ message: 'Некорректные данные' });
      } else {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotFoundError'))
    .then((card) => {
      res.status(HTTP_STATUS.OK).send(card);
    })
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        res.status(HTTP_STATUS.NOT_FOUND).send({ message: 'Карточка не найдена' });
      } else if (err.name === 'CastError') {
        res.status(HTTP_STATUS.BAD_REQUEST).send({ message: 'Некорректные данные' });
      } else {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
};
