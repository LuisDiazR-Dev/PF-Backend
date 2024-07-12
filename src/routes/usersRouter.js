const { Router } = require('express')
const usersRouter = Router()
const { getAllUsers, getUserById, getUserProfile } = require('../handlers/users-handler')

usersRouter.get('/', getAllUsers)
usersRouter.get('/:id', getUserById)
usersRouter.get('/profile', getUserProfile)

module.exports = usersRouter
