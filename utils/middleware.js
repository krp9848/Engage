const User = require('../models/user')
const logger = require('./logger')
const jwt = require('jsonwebtoken')

// Request logger middleware
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

// get user middle ware
const getUserFrom = async (request, response, next) => {
  // get the token
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    const token = authorization.substring(7)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (token && decodedToken.id) {
      const user = await User.findById(decodedToken.id)
      request.user = user
    }
  }

  next()
}

// unknown endpoint middleware
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// error handler middleware
const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }
  logger.error(error.message)
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  getUserFrom,
}
