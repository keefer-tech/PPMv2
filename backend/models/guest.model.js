const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Guest = new Schema({
  playlistName: {
    type: String,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  users: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model("Guest", Guest)