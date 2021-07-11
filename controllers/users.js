const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

// Get all the users
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('tweets', { text: 1 })

  response.json(users)
})

// Get a particular user
usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id).populate('tweets', {
    text: 1,
  })

  if (!user) {
    return response
      .status(404)
      .json({ error: `No user with user id ${request.params.id} found` })
  }
  response.json(user)
})

// Create a user
usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.password && body.password.length < 5) {
    return response
      .status(400)
      .json({ error: `Please provide password of length 5 or more` })
  }

  const saltRounds = 10
  const password = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    password,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

// Delete a particular user
usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id)

  response.status(204).end()
})

module.exports = usersRouter
