const { Router } = require('express')
<<<<<<< HEAD
const getAllUsers = require('../handlers/users-handlers')

const usersRouter = Router()
usersRouter.get('/', getAllUsers)
=======
const { getAllUsers, getUserById } = require('../handlers/users-handler')

const usersRouter = Router()
usersRouter.get('/', getAllUsers)
usersRouter.get('/:id', getUserById)
>>>>>>> 4e0562b2bdf375b1ea7d6f0aa693ff30260755c7

module.exports = usersRouter
