const { Router } = require('express')
const usersRouter = Router()
const { getAllUsers, getUserById } = require('../handlers/users-handler')

usersRouter.get('/', getAllUsers)
usersRouter.get('/:id', getUserById)

module.exports = usersRouter
