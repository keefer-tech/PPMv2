const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    username: {
      type: String,
      required: true
    },
    displayName: {
      type: String,
      required: true
    },
    accessToken: {
      type: String,
      required: true
    },
    refreshToken: {
      type: String,
      // required: true,
    },
    friends: {
      type: Array
    }
})


module.exports = mongoose.model("User", User)

