const Tweet = require('../models/tweet')
const tweetsRouter = require('express').Router()
const getUserFrom = require('../utils/middleware').getUserFrom

// Get all the tweets
tweetsRouter.get('/', async (request, response) => {
  const tweets = await Tweet.find({}).populate('user', { username: 1, name: 1 })

  response.json(tweets)
})

// Get a particular tweet
tweetsRouter.get('/:id', async (request, response) => {
  const tweet = await Tweet.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
  })

  if (!tweet) {
    return response
      .status(404)
      .json({ error: `No tweet with tweet id ${request.params.id} found` })
  }

  response.json(tweet)
})

// Create a new tweet
tweetsRouter.post('/', getUserFrom, async (request, response) => {
  const body = request.body
  // const token = getTokenFrom(request)
  // const decodedToken = jwt.verify(token, process.env.SECRET)
  // if (!token || !decodedToken.id) {
  //   return response.status(401).json({ error: 'token missing or invalid' })
  // }

  const user = request.user
  console.log(user)
  const newTweet = new Tweet({
    text: body.text,
    tweetedAt: new Date(),
    user: user._id,
  })
  const savedTweet = await newTweet.save()
  user.tweets = user.tweets.concat(savedTweet._id)
  await user.save()

  response.json(savedTweet)
})

module.exports = tweetsRouter
