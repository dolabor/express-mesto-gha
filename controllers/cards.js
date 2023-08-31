const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find()
    .then((cards) => {
      res.status(200).json(cards);
    })
    .catch(() => {
      res.status(500).json({ error: 'На сервере произошла ошибка' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).json(card);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};

const deleteCardById = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        res.status(404).json({ error: 'Карточка не найдена' });
      } else {
        res.status(200).json({ message: 'Карточка успешно удалена' });
      }
    })
    .catch(() => {
      res.status(500).json({ error: 'На сервере произошла ошибка' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).json({ error: 'Card not found' });
      } else {
        res.status(200).json(card);
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).json({ error: 'Card not found' });
      } else {
        res.status(200).json(card);
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};

module.exports = {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
};
