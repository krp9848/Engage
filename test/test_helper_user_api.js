const User = require('../models/user')

const initialUsers = [
  {
    name: 'kabiraj',
    username: 'kabi_pant',
    password: 'kaviraj',
  },

  {
    name: 'rituraj',
    username: 'ritu_pant',
    password: 'rituraj',
  },
]

const nonExistingId = async () => {
  const user = new User({
    name: 'somename',
    password: 'some_password',
    username: 'some_username',
  })

  await user.save()
  await user.remove()

  return user._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

const helper = { initialUsers, usersInDb, nonExistingId }

module.exports = helper
