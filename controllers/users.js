const usersRouter = require('express').Router()
const User = require('../models/user')

// Get all the users
usersRouter.get('/', async (request, response) => {
  const users = await User.find({})

  response.json(users)
})

// Get a particular user
usersRouter.get('/:id', (request, response, next) => {
  User.findById(request.params.id)
    .then((user) => {
      if (user) {
        response.json(user)
      } else {
        response
          .status(404)
          .json({ error: `No user with user id ${request.params.id} found` })
      }
    })
    .catch((error) => next(error))
})

// Create a user
usersRouter.post('/', (request, response, next) => {
  const user = new User(request.body)

  user
    .save()
    .then((savedUser) => {
      response.json(savedUser)
    })
    .catch((error) => next(error))
})

// Delete a particular user
usersRouter.delete('/:id', (request, response, next) => {
  User.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

module.exports = usersRouter
