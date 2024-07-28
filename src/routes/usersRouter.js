const { Router } = require('express')
const usersRouter = Router()
const {
	getAllUsers,
	getUserById,
	getUserProfile,
	updateUserProfile,
	updateUserById,
	deleteUserById,
	deleteUserProfile,
} = require('../handlers/users-handler')

const { verifyToken } = require('../middlewares/auth-middleware')
const { checkAdmin } = require('../middlewares/admin_middleware')

usersRouter.get('/', getAllUsers)
usersRouter.get('/profile', verifyToken, getUserProfile)
usersRouter.get('/:id', getUserById)
usersRouter.put('/profile', verifyToken, updateUserProfile)
usersRouter.put('/', verifyToken, checkAdmin, updateUserById)
usersRouter.delete('/', verifyToken, deleteUserProfile)
usersRouter.delete('/:id', verifyToken, checkAdmin, deleteUserById)

module.exports = usersRouter
