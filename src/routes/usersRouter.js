const { Router } = require('express')
const usersRouter = Router()
const {
	getAllUsers,
	getUserById,
	getUserProfile,
	updateUser,
	deleteUserById,
	deleteUserProfile,
} = require('../handlers/users-handler')

usersRouter.get('/', getAllUsers)
usersRouter.get('/profile', getUserProfile)
usersRouter.get('/:id', getUserById)
usersRouter.put('/', updateUser)
usersRouter.delete('/', deleteUserProfile)
usersRouter.delete('/:id', deleteUserById)

module.exports = usersRouter
