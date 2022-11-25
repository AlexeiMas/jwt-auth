const {Schema, model} = require("mongoose");

const TokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  refreshToken: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60*60*24*30 //in seconds, not ms
  }
})

module.exports = model('Token', TokenSchema)