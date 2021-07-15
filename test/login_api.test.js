const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const password = await bcrypt.hash('kabiraj', 10)
  const newUser = new User({
    name: 'kabiraj',
    username: 'kabi_pant',
    password,
  })
  await newUser.save()
})

describe('login operation', () => {
  test('succeeds with valid credentials and returns the token', async () => {
    const creds = { username: 'kabi_pant', password: 'kabiraj' }

    const response = await api
      .post('/api/login/')
      .send(creds)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const tokenPresent = Object.prototype.hasOwnProperty.call(
      response.body,
      'token'
    )
    expect(tokenPresent).toBe(true)
  })
  test('fails with invalid credentials with appropriate error', async () => {
    const creds = { username: 'kabi_pant', password: 'akabiraj' }
    const response = await api
      .post('/api/login/')
      .send(creds)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('invalid username or password')
  })
})
afterAll(() => {
  mongoose.connection.close()
})
