const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const supertest = require('supertest')
const app = require('../app')
const Tweet = require('../models/tweet')
const User = require('../models/user')
const helper = require('./test_helper_tweet_api')
const api = supertest(app)
let token
beforeEach(async () => {
  await User.deleteMany({})
  await Tweet.deleteMany({})
  const password = await bcrypt.hash('kabiraj', 10)
  const newUser = new User({
    name: 'kabiraj',
    username: 'kabi_pant',
    password,
  })
  await newUser.save()
  const userForToken = { username: newUser.username, id: newUser._id }
  token = jwt.sign(userForToken, process.env.SECRET)
  for (let tweet of helper.initialTweets) {
    const newTweet = new Tweet({
      text: tweet.text,
      tweetedAt: new Date(),
      user: newUser._id,
    })
    await newTweet.save()
  }
}, 100000)

describe('when there are initially some tweets saved', () => {
  test('tweets are returned as json', async () => {
    await api
      .get('/api/tweets/')
      .expect(200)
      .expect('Content-type', /application\/json/)
  })

  test('all tweets are returned', async () => {
    const response = await api.get('/api/tweets')

    expect(response.body).toHaveLength(helper.initialTweets.length)
  })

  test('a specific tweet is returned within returned tweets', async () => {
    const response = await api.get('/api/tweets')

    const contents = response.body.map((r) => r.text)

    expect(contents).toContain('My first tweet')
  })
})

describe('viewing a specific tweet', () => {
  test('succeeds with a valid id', async () => {
    const tweetsAtStart = await helper.tweetsInDb()

    const tweetToView = tweetsAtStart[0]
    const response = await api
      .get(`/api/tweets/${tweetToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const responsedTweet = response.body
    responsedTweet.user = responsedTweet.user.id
    const processedTweetToView = JSON.parse(JSON.stringify(tweetToView))
    expect(responsedTweet).toEqual(processedTweetToView)
  })

  test('fails with status code 404 if tweet does not exist', async () => {
    const nonExistingValidId = await helper.nonExistingId()

    await api.get(`/api/tweets/${nonExistingValidId}`).expect(404)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api.get(`/api/tweets/${invalidId}`).expect(400)
  })
})

describe('creation of a new tweet', () => {
  test('succeeds with valid data and valid token', async () => {
    const newTweet = {
      text: 'some random tweet',
    }
    await api
      .post('/api/tweets')
      .set('Authorization', 'Bearer ' + token)
      .send(newTweet)
      .expect(200)
      .expect('Content-type', /application\/json/)

    const tweetsAtEnd = await helper.tweetsInDb()

    expect(tweetsAtEnd).toHaveLength(helper.initialTweets.length + 1)

    const tweetContent = tweetsAtEnd.map((tweet) => tweet.text)
    expect(tweetContent).toContain('some random tweet')
  })
  test('fails with invalid data with appropriate message', async () => {
    const newTweet = {}
    await api
      .post('/api/tweets')
      .set('Authorization', 'Bearer ' + token)
      .send(newTweet)
      .expect(400)
      .expect('Content-type', /application\/json/)
  })
  test('fails with invalid authorization with appropriate message', async () => {
    const newTweet = {}
    await api
      .post('/api/tweets')
      .set('Authorization', 'Bearer ')
      .send(newTweet)
      .expect(401)
      .expect('Content-type', /application\/json/)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
