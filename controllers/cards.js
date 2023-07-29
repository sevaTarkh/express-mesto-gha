const Card = require('../models/card');

const ERROR_CODE = 400;
const ERROR_FORBIDDEN = 403;
const ERROR_BAD_REQUEST = 404;
const ERROR_SERVER = 500;

module.exports.getCards = (_, res) => {
  Card.find({})
  .then((card) => res.send(card))
  .catch((err) => {
      res.status(ERROR_SERVER).send({
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
    if (err.name === 'ValidationError' || err.name === 'CastError'){
      res.status(ERROR_CODE).send({
        message:'Произошла ошибка: Bad Request'
      })
    }else{
      res.status(ERROR_SERVER).send({
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
      return res.status(ERROR_BAD_REQUEST).send({
        message: 'Произошла ошибка: Not Found'
      })
    }
    const  { owner: ownerId } = card;

    if (ownerId.valueOf() !== userId){
      return res.status(ERROR_FORBIDDEN).send({
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
      res.status(ERROR_CODE).send({
        message:'Произошла ошибка: Bad Request'
      })
    }else{
      res.status(ERROR_SERVER).send({
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
      return res.status(ERROR_BAD_REQUEST).send({
        message: 'Произошла ошибка: Not Found'
      })
    }
    res.send(card)
  })
  .catch((err) => {
    if (err.name === 'ValidationError' || err.name === 'CastError'){
      res.status(ERROR_CODE).send({
        message:'Произошла ошибка: Bad Request'
      })
    }else{
      res.status(ERROR_SERVER).send({
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
      return res.status(ERROR_BAD_REQUEST).send({
        message: 'Произошла ошибка: Not Found'
      })
    }
    res.send(card)
  })
  .catch((err) => {
    if (err.name === 'ValidationError' || err.name === 'CastError'){
      res.status(ERROR_CODE).send({
        message:'Произошла ошибка: Bad Request'
      })
    }else{
      res.status(ERROR_SERVER).send({
        message: 'Произошла ошибка: Server Error'
      })
    }
  })
}