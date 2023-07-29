const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const cardShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: ObjectId,
    required: true,
  },
  likes: {
    type: ObjectId,
    defailt: [],
  },
  createdAt: {
    type: Date,
    defailt: Date.now,
  },
});

module.exports = mongoose.model('card', cardShema);
