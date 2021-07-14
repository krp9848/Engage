const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper_user_api')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

describe('when there are some users initially saved', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('all users are returned', async () => {
    const response = await api.get('/api/users')

    expect(response.body).toHaveLength(helper.initialUsers.length)
  })

  test('a specific user is returned within returned users', async () => {
    const response = await api.get('/api/users')

    const contents = response.body.map((r) => r.username)

    expect(contents).toContain('kabi_pant')
  })
})

describe('viewing a specific user', () => {
  test('succeeds with a valid id', async () => {
    const usersAtStart = await helper.usersInDb()

    const userToView = usersAtStart[0]
    const response = await api
      .get(`/api/users/${userToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedUserToView = JSON.parse(JSON.stringify(userToView))
    expect(response.body).toEqual(processedUserToView)
  })

  test('fails with status code 404 if user does not exist', async () => {
    const nonExistingValidId = await helper.nonExistingId()

    await api.get(`/api/users/${nonExistingValidId}`).expect(404)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api.get(`/api/users/${invalidId}`).expect(400)
  })
})

describe('creation of a new user', () => {
  test('succeeds with valid data', async () => {
    const newUser = {
      name: 'somename',
      password: 'some_password',
      username: 'some_username',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1)

    const usernames = usersAtEnd.map((user) => user.username)
    expect(usernames).toContain('some_username')
  })

  test('fails with status code 400 and appropriate error message if name is missing', async () => {
    const newUser = {
      password: 'some_password',
      username: 'some_username',
    }
    const response = await api.post('/api/users').send(newUser).expect(400)

    expect(response.body.error).toContain(
      'User validation failed: name: Path `name` is required.'
    )
  })
  test('fails with status code 400 and appropriate error message if password is missing', async () => {
    const newUser = {
      name: 'somename',
      username: 'some_username',
    }
    const response = await api.post('/api/users').send(newUser).expect(400)

    expect(response.body.error).toContain('Password required')
  })
  test('fails with status code 400 and appropriate error message if username is missing', async () => {
    const newUser = {
      name: 'somename',
      password: 'some_password',
    }
    const response = await api.post('/api/users').send(newUser).expect(400)

    expect(response.body.error).toContain(
      'User validation failed: username: Path `username` is required.'
    )
  })
  test('fails with status code 400 and appropriate error message if password length is less than 4', async () => {
    const newUser = {
      name: 'somename',
      password: 'some',
      username: 'some_username',
    }
    const response = await api.post('/api/users').send(newUser).expect(400)
    expect(response.body.error).toContain(
      'Please provide password of length 5 or more'
    )
  })
})

describe('deletion of an existing user', () => {
  test('succeeds with valid id', async () => {
    const usersAtStart = await helper.usersInDb()
    const userToDelete = usersAtStart[0]

    await api.delete(`/api/users/${userToDelete.id}`).expect(204)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length - 1)

    const username = usersAtEnd.map((user) => user.username)
    expect(username).not.toContain(userToDelete.username)
  })

  test('fails with invalid id with appropriate message', async () => {
    const invalidId = '5a3d5da59070081a82a3445'
    const response = await api.delete(`/api/users/${invalidId}`).expect(400)
    expect(response.body.error).toContain('malformatted id')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
