const { Schema, model } = require('mongoose')

const user = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatarUrl: String,
  resetToken: String,
  resetTokenExp: Date,
})

export default model('User', user)
