const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const getUserFrom = require('../utils/middleware').getUserFrom

// Get all the users
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('tweets', { text: 1 })

  response.json(users)
})

// Get a particular user
usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
    .populate('tweets', {
      text: 1,
    })
    .populate('following', { username: 1 })
    .populate('followers', { username: 1 })

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
  if (!body.password) {
    return response.status(400).json({ error: 'Password required' })
  }
  if (body.password.length < 5) {
    return response
      .status(400)
      .json({ error: 'Please provide password of length 5 or more' })
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

// Get the followers of a particular user

usersRouter.get('/:id/followers', async (request, response) => {
  const user = await User.findById(request.params.id).populate('followers', {
    username: 1,
  })

  if (!user) {
    return response
      .status(404)
      .json({ error: `No user with user id ${request.params.id} found` })
  }

  response.json(user.followers)
})

// Get the people followed by the particular user

usersRouter.get('/:id/following', async (request, response) => {
  const user = await User.findById(request.params.id).populate('following', {
    username: 1,
  })

  if (!user) {
    return response
      .status(404)
      .json({ error: `No user with the user id ${request.params.id} found` })
  }

  response.json(user)
})

// Follow/Unfollow request route

usersRouter.post('/:id/follow', getUserFrom, async (request, response) => {
  // Get the identity of the user making the request(request.user)
  const user = request.user
  // Check whether the id of the user trying to be followed is valid
  const userToBeFollowed = await User.findById(request.params.id)
  if (!userToBeFollowed) {
    response
      .status(404)
      .json({ error: `No user with the user id ${request.params.id} found` })
  }

  // Check whether the user is trying to follow himself (which should be forbidden)
  if (user.username === userToBeFollowed.username) {
    response.status(400).json({ error: 'Cannot follow yourself' })
  }
  // check if the request user is already the person he wants to follow
  const isAlreadyFollowing = userToBeFollowed.followers.find(
    (follower) => follower.toString() === user._id.toString()
  )

  if (!isAlreadyFollowing) {
    // update the followers list of the person to be followed and the following list of person requesting to follow
    console.log('You can update now')
    user.following = user.following.concat(userToBeFollowed._id)
    await user.save()
    userToBeFollowed.followers = userToBeFollowed.followers.concat(user._id)
    await userToBeFollowed.save()
  }

  response.json(user)
})

usersRouter.post('/:id/unfollow', getUserFrom, async (request, response) => {
  // Get the identity of the user making the request(request.user)
  const user = request.user
  // Check whether the id of the user trying to be unfollowed is valid
  const userToBeUnfollowed = await User.findById(request.params.id)
  if (!userToBeUnfollowed) {
    response
      .status(404)
      .json({ error: `No user with the user id ${request.params.id} found` })
  }

  // Check whether the user is trying to unfollow himself (which should be forbidden)
  if (user.username === userToBeUnfollowed.username) {
    response.status(400).json({ error: 'Cannot unfollow yourself' })
  }
  // check if the request user is even following the person
  const isAlreadyFollowing = userToBeUnfollowed.followers.find((follower) => {
    return follower.toString() === user._id.toString()
  })

  if (isAlreadyFollowing) {
    // update the followers list of the person to be unfollowed and the following list of person requesting to unfollow
    console.log('You can update now')
    user.following = user.following.filter(
      (follow) => follow.toString() !== userToBeUnfollowed._id.toString()
    )
    await user.save()
    userToBeUnfollowed.followers = userToBeUnfollowed.followers.filter(
      (follower) => follower.toString() !== user._id.toString()
    )
    await userToBeUnfollowed.save()
  }

  response.json(user)
})

module.exports = usersRouter
