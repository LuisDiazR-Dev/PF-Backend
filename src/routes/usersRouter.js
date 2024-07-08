const { Router } = require('express')
const getAllUsers = require('../handlers/users-handler')

const usersRouter = Router()
usersRouter.get('/', getAllUsers)

module.exports = usersRouter