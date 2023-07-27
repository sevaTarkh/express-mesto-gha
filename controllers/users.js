const User = require('../models/user');

module.exports.getUsersInfo = (_, res) => {
  User.find({})
  .then((user) => {
    if (err.name === 'DataError'){
      res.status(400).send('Произошла ошибка: Bad Request')
    }
    res.send(user)
  })
  .catch((err) => res.status(500).send({
    message: 'Произошла ошибка: Server Error'
  }))
}
module.exports.getUserInfoById = (req, res) => {

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
  .catch(() => res.status(500).send({
    message: 'Произошла ошибка: Server Error'
  }))
}
module.exports.createUser = (req, res) => {

  const {name, about, avatar} = req.body;
  User.create({name, about, avatar})
  .then((user) => res.send({user}))
  .catch((err) => res.status(500).send({
    message: 'Произошла ошибка: Server Error'
  }))
}
module.exports.setUserInfo = (req, res) => {
  console.log(req.user._id);
  const {name, about} = req.body;
  const { userId } = req.user;

  User.findByIdAndUpdate(userId, {name, about})
  .then((user) => {
    if(!user){
      return res.status(404).send({
        message: 'Произошла ошибка: Not Found'
      })
    }
    res.send(user)
  })
  .catch((err) => {
    if (err.name === 'DataError'){
      res.status(400).send('Произошла ошибка: Bad Request')
    }else{
      res.status(500).send({
        message: 'Произошла ошибка: Server Error'
      })
    }
  })
}
module.exports.setUserAvatar = (req, res) => {
  console.log(req.user._id);
  const {avatar} = req.body;
  const { userId } = req.user;
  User.findByIdAndUpdate(userId, {avatar})
  .then((user) => {
    if(!user){
      return res.status(404).send({
        message: 'Произошла ошибка: Not Found'
      })
    }
    res.send(user)
  })
  .catch((err) => {
    if (err.name === 'DataError'){
      res.status(400).send('Произошла ошибка: Bad Request')
    }else{
      res.status(500).send({
        message: 'Произошла ошибка: Server Error'
      })
    }
  })
}
