const Tweet = require('../models/tweet')

const initialTweets = [
  {
    text: 'My first tweet',
  },

  {
    text: 'My second tweet',
  },
]

const nonExistingId = async () => {
  const tweet = new Tweet({
    text: 'some random tweet',
  })

  await tweet.save()
  await tweet.remove()

  return tweet._id.toString()
}

const tweetsInDb = async () => {
  const tweets = await Tweet.find({})
  return tweets.map((tweet) => tweet.toJSON())
}

const helper = { initialTweets, tweetsInDb, nonExistingId }

module.exports = helper
