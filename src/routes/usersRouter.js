const { Router } = require('express')
const usersRouter = Router()
const { verifyToken } = require('../middlewares/auth-middleware')
const { verifyAdmin } = require('../middlewares/verifyAdmin')
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
usersRouter.delete('/', verifyToken, verifyAdmin, deleteUserProfile)
usersRouter.delete('/:id', verifyToken, deleteUserById)

module.exports = usersRouter
