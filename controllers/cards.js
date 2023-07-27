const Card = require('../models/card');

module.exports.getCards = (_, res) => {
  Card.find({})
  .then((card) => res.send(card))
  .catch((err) => res.status(500).send({ message: err.message }))
}
module.exports.createCard = (req, res) => {
  cconsole.log(req.user._id);
  const {name, link} = req.body;
  Card.create({name, link})
  .then((card) => res.send(card))
  .catch((err) => res.status(500).send({ message: err.message }))
}
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById({cardId})
  .then((card) => {
    if(!card){
      throw new Error('Нет такой карточки')
    }
    const ownerId = card.owner.id;
    const userId = req.user._id;
    if (ownerId !== userId){
      throw new Error('Нельзя удалять не свои карточки')
    }
    card
      .remove()
      .then(() => res.send(card))
      .catch(next)
  })
  .catch(next)
}
module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  const { userId } = req.user;
  Card.findByIdAndUpdate(
    cardId,
    {
      $addToSet: {
        likes:userId
      }
    },
    {
      new: true
    }
  )
  .then((card) => res.send(card))
  .catch((err) => res.status(500).send({ message: err.message }))
}
module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const { userId } = req.user;
  Card.findByIdAndUpdate(
    cardId,
    {
      $pull: {
        likes:userId
      }
    },
    {
      new: true
    }
  )
  .then((card) => res.send(card))
  .catch((err) => res.status(500).send({ message: err.message }))
}