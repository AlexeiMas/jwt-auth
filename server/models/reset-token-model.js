const {Schema, model} = require("mongoose");

const ResetTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600 //in seconds, not ms
  }
})

module.exports = model('ResetToken', ResetTokenSchema)