const User = require('../models/user');

const ERROR_CODE = 400;
const ERROR_BAD_REQUEST = 404;
const ERROR_SERVER = 500;



module.exports.getUsersInfo = (_, res) => {
  User
    .find({})
    .then((user) => res.send(user))
    .catch((err) => res.status(ERROR_SERVER).send({
      message: 'Произошла ошибка: Server Error'
    }))
}
module.exports.getUserInfoById = (req, res) => {

  const { id } = req.params;
  User.findById(id)
  .then((user) => {
    if(!user){
      return res.status(ERROR_BAD_REQUEST).send({
        message: 'Произошла ошибка: Not Found'
      })
    }
    res.send({user})
  })
  .catch((err) => {
    if (err.name === 'CastError'){
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
module.exports.createUser = (req, res) => {

  const {name, about, avatar} = req.body;
  User.create({name, about, avatar})
  .then((user) => res.send({user}))
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
module.exports.setUserInfo = (req, res) => {
  const { name, about } = req.body;
  const { _id: userId } = req.user;

  User.findByIdAndUpdate(
    userId,
    {
      name,
      about
    },
    {
      new: true,
      runValidators: true
    }
  )
  .then((user) => {
    if(!user){
      return res.status(ERROR_BAD_REQUEST).send({
        message: 'Произошла ошибка: Not Found'
      })
    }
    res.send({ user })
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
module.exports.setUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id: userId } = req.user;

  User.findByIdAndUpdate(
    userId,
    {
      avatar
    },
    {
      new: true,
      runValidators: true,
    }
    )
  .then((user) => {
    if(!user){
      return res.status(ERROR_BAD_REQUEST).send({
        message: 'Произошла ошибка: Not Found'
      })
    }
    res.send({ user })
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
