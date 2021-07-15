const jwt = require('jsonwebtoken')
const Tweet = require('../models/tweet')
const User = require('../models/user')
const tweetsRouter = require('express').Router()

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

// Get token
const getTokenFrom = (request) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7)
  }

  return null
}

// Create a new tweet
tweetsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

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
