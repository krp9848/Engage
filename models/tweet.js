const mongoose = require('mongoose')

const tweetSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxLength: 140,
  },
  tweetedAt: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

tweetSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Tweet = mongoose.model('Tweet', tweetSchema)

module.exports = Tweet
