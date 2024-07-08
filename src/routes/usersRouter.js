const { Router } = require('express')
const getAllUsers = require('../handlers/users-handlers')

const usersRouter = Router()
usersRouter.get('/', getAllUsers)

module.exports = usersRouter
