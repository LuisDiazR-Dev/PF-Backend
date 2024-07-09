const { Router } = require('express')
const usersRouter = Router()
const { getAllUsers, getUserById, createUser } = require('../handlers/users-handler')

usersRouter.get('/', getAllUsers)
usersRouter.get('/:id', getUserById)
usersRouter.post('/', createUser)

module.exports = usersRouter
