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
  const user = request.user
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

// Like a tweet

tweetsRouter.post('/:id/like', getUserFrom, async (request, response) => {
  const user = request.user
  const tweet = await Tweet.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
  })

  // if tweet id was invalid, send an appropriate response
  if (!tweet) {
    return response
      .status(404)
      .json({ error: `No tweet with tweet id ${request.params.id} found` })
  }

  // check if the tweet was already liked by the user
  const isAlreadyLiked = tweet.likes.find(
    (liker) => liker.toString() === user._id.toString()
  )

  // if already liked, operation was suppose to be unlike, perform unlike, else perform like
  if (isAlreadyLiked) {
    tweet.likes = tweet.likes.filter(
      (liker) => liker.toString() !== user._id.toString()
    )
  } else {
    tweet.likes = tweet.likes.concat(user._id)
  }

  await tweet.save()

  response.json(tweet)
})

// Retweet a tweet
tweetsRouter.post('/:id/retweet', getUserFrom, async (request, response) => {
  const user = request.user
  const tweet = await Tweet.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
  })

  // if tweet id was invalid, send an appropriate response
  if (!tweet) {
    return response
      .status(404)
      .json({ error: `No tweet with tweet id ${request.params.id} found` })
  }

  // check if the tweet was already retweeted by the user
  const isAlreadyRetweeted = tweet.retweets.find(
    (retweeter) => retweeter.toString() === user._id.toString()
  )

  // if already retweeted, operation was suppose to be remove retweet, else perform retweet
  if (isAlreadyRetweeted) {
    tweet.retweets = tweet.retweets.filter(
      (retweeter) => retweeter.toString() !== user._id.toString()
    )
  } else {
    tweet.retweets = tweet.retweets.concat(user._id)
  }

  await tweet.save()

  response.json(tweet)
})

module.exports = tweetsRouter
