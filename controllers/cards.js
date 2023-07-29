const Card = require('../models/card');

module.exports.getCards = (_, res) => {
  Card.find({})
  .then((card) => res.send(card))
  .catch((err) => {
      res.status(500).send({
        message: 'Произошла ошибка: Server Error'
      })
  })
}
module.exports.createCard = (req, res) => {

  const {name, link} = req.body;
  const { _id: userId } = req.user;

  Card.create({name, link, owner: userId})
  .then((card) => res.send({card}))
  .catch((err) => {
    if (err.name === 'ValidationError'){
      res.status(400).send({
        message:'Произошла ошибка: Bad Request'
      })
    }else{
      res.status(500).send({
        message:'Произошла ошибка: Server Error'
      })
    }
  })
}
module.exports.deleteCard = (req, res) => {
  const { cardId: cardId } = req.params;
  const { _id: userId } = req.user;

  Card.findById(cardId)
  .then((card) => {
    if(!card){
      return res.status(404).send({
        message: 'Произошла ошибка: Not Found'
      })
    }
    const  { owner: ownerId } = card;

    if (ownerId.valueOf() !== userId){
      return res.status(403).send({
        message: 'Произошла ошибка: Its not your card'
      })
    }
    return Card.findByIdAndRemove(cardId)
      .then(() => res.send({
        message: "Карточка удалена"
      }))
  })
  .catch((err) => {
    if (err.name === 'ValidationError' || err.name === 'CastError'){
      res.status(400).send({
        message:'Произошла ошибка: Bad Request'
      })
    }else{
      res.status(500).send({
        message:'Произошла ошибка: Server Error'
      })
    }
  })
}
module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  const { _id: userId } = req.user;
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
  .then((card) => {
    if(!card){
      return res.status(404).send({
        message: 'Произошла ошибка: Not Found'
      })
    }
    res.send(card)
  })
  .catch((err) => {
    if (err.name === 'CastError'){
      res.status(400).send({
        message:'Произошла ошибка: Bad Request'
      })
    }else{
      res.status(500).send({
        message: 'Произошла ошибка: Server Error'
      })
    }
  })
}
module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const { _id: userId } = req.user;
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
  .then((card) => {
    if(!card){
      return res.status(404).send({
        message: 'Произошла ошибка: Not Found'
      })
    }
    res.send(card)
  })
  .catch((err) => {
    if (err.name === 'CastError'){
      res.status(400).send({
        message:'Произошла ошибка: Bad Request'
      })
    }else{
      res.status(500).send({
        message: 'Произошла ошибка: Server Error'
      })
    }
  })
}