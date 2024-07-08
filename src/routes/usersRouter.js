const { Router } = require('express')
const { getAllUsers, getUserById } = require('../handlers/users-handler')

const usersRouter = Router()
usersRouter.get('/', getAllUsers)
usersRouter.get('/:id', getUserById)

module.exports = usersRouter
