const User = require('../models/user');

module.exports.getUsersInfo = (_, res, next) => {
  User
    .find({})
    .then((user) => res.send(user))
    .catch(next)
}
module.exports.getUserInfoById = (req, res, next) => {

  const { id } = req.params;
  User.findById(id)
  .then((user) => {
    if(!user){
      return res.status(404).send({
        message: 'Произошла ошибка: Not Found'
      })
    }
    res.send({user})
  })
  .catch((err) => {
    if (err.name === 'CastError'){
      res.status(400).send('Произошла ошибка: Bad Request')
    }else{
      next(err)
    }
  })
}
module.exports.createUser = (req, res, next) => {

  const {name, about, avatar} = req.body;
  User.create({name, about, avatar})
  .then((user) => res.send({user}))
  .catch((err) => {
    if (err.name === 'CastError'){
      res.status(400).send('Произошла ошибка: Bad Request')
    }else{
      next(err)
    }
  })
}
module.exports.setUserInfo = (req, res, next) => {

  const {name, about} = req.body;
  const { userId } = req.user;

  User.findByIdAndUpdate(
    userId,
    {
      name,
      about
    },
    {
      new: true,
      runValidators: true,
    }
  )
  .then((user) => {
    if(!user){
      return res.status(404).send({
        message: 'Произошла ошибка: Not Found'
      })
    }
    res.send(user)
  })
  .catch((err) => {
    if (err.name === 'CastError'){
      res.status(400).send('Произошла ошибка: Bad Request')
    }else{
      next(err)
    }
  })
}
module.exports.setUserAvatar = (req, res, next) => {
  console.log(req.user._id);
  const {avatar} = req.body;
  const { userId } = req.user;
  User.findByIdAndUpdate(
    userId, {
      avatar
    },
    {
      new: true,
      runValidators: true,
    }
    )
  .then((user) => {
    if(!user){
      return res.status(404).send({
        message: 'Произошла ошибка: Not Found'
      })
    }
    res.send(user)
  })
  .catch((err) => {
    if (err.name === 'CastError'){
      res.status(400).send('Произошла ошибка: Bad Request')
    }else{
      next(err)
    }
  })
}
