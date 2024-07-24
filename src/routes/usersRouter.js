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

const { verifyToken } = require('../middlewares/auth-middleware')

usersRouter.get('/', getAllUsers)
usersRouter.get('/profile', verifyToken, getUserProfile)
usersRouter.get('/:id', getUserById)
usersRouter.put('/', verifyToken, updateUser)
usersRouter.delete('/', verifyToken, deleteUserProfile)
usersRouter.delete('/:id', verifyToken, deleteUserById)

module.exports = usersRouter
