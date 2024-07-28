const { User } = require('../db')
const { Op } = require('sequelize')
const AppError =require('../utils/errors-util')
const { getUserIncludes } = require('../utils/users-utils')

const getAllUsersController = async (search) => {
	try {
		let where = {}
		if (search)
			where[Op.or] = [
				{ userName: { [Op.iLike]: `%${search}%` } },
				{ email: { [Op.iLike]: `%${search}%` } },
			]
		const users = await User.findAll({ where, include: getUserIncludes() })
		return users
	} catch (error) {
		console.error('Error fetching users:', error)
		throw new Error(`Error fetching users: ${error.message}`)
	}
}

const getUserByIdController = async (id) => {
	try {
		const user = await User.findByPk(id, { include: getUserIncludes() })
		if (!user) throw new AppError('User not found', 404)
		return user
	} catch (error) {
		console.error(`Error fetching project with id ${id}`, error)
		throw new AppError(`Error fetching project with id ${id}`, 500)
	}
}

const updateUserProfileController = async ({ userData }, { id }) => {
	try {
		const updatingUser = await User.findByPk(id)
		if (!updatingUser || updatingUser.role !== 'user') {
			throw new AppError('You are not authorized to update this user', 401)
		}
		await updatingUser.update(userData, { where: userData.id })
		const updatedUser = await User.findByPk(updatingUser.id)
		return updatedUser
	} catch (error) {
		console.error('Error updating project:', error)
		throw new AppError('Error updating project', 500)
	}
}

const updateUserByIdController = async (userData) => {
	try {
		const updatingUser = await User.findByPk(userData.id)
		if (!updatingUser) {
			throw new AppError('User not found', 404)
		}
		await updatingUser.update(
			{
				userName: userData.userName ?? updatingUser.userName,
				password: userData.password ?? updatingUser.password,
				bio: userData.bio ?? updatingUser.bio,
				aboutMe: userData.aboutMe ?? updatingUser.aboutMe,
				image: userData.image ?? updatingUser.image,
			},
			{ where: { id: userData.id } }
		)
		const updatedUser = await User.findByPk(userData.id)
		return updatedUser
	} catch (error) {
		console.error('Error updating project:', error)
		throw new AppError('Error updating project', 500)
	}
}

const deleteUserProfileController = async (user) => {
	try {
		const id = user.id
		const userToDelete = await User.findByPk(user.id)
		if (!userToDelete) throw new AppError('User not found', 404)
		if (user.role !== 'user') {
			throw new AppError('You are not authorized to delete this user', 401)
		}
		await User.destroy({ where: { id } })
		return { message: 'User deleted successfully' }
	} catch (error) {
		console.error('Error getting deleted user:', error)
		throw new AppError(error.message || 'Error deleting user', error.status || 500)
	}
}

const deleteUserByIdController = async (id) => {
	try {
		const userToDelete = await User.findByPk(id)
		if (!userToDelete) throw new AppError('User not found', 404)
		await User.destroy({ where: { id } })
		return { message: 'User deleted successfully' }
	} catch (error) {
		console.error(`Error deleting user by Id: ${error.message}`)
		throw new AppError(error.message || `Error deleting user`, error.statusCode || 500)
	}
}

const getDeletedUsersController = async () => {
	try {
		let where = { deletedAt: { [Op.not]: null } }

		const users = await User.findAll({
			where,
			paranoid: false,
			include: getUserIncludes(),
		})

		return users
	} catch (error) {
		console.error('Error getting deleted user:', error)
		throw new AppError('Error fetching deleted user', 500)
	}
}

const getDeletedUserByIdController = async (id) => {
	try {
		const user = await User.findOne({
			where: { id },
			paranoid: false,
			include: getUserIncludes(),
		})

		if (!user) throw new AppError('No user found with the given id', 404)

		return user
	} catch (error) {
		console.error('Error fetching deleted project by Id', error)
		throw new AppError('Error fetching deleted user', 500)
	}
}

const restoreUserController = async (id) => {
	try {
		const user = await User.findOne({
			where: { id },
			paranoid: false,
			include: getUserIncludes(),
		})

		if (!user) throw new AppError('No user found with the given id', 404)

		return user
	} catch (error) {
		console.error('Error restoring user', error)
		throw new AppError('Error restoring user', 500)
	}
}

module.exports = {
	getAllUsersController,
	getUserByIdController,
	updateUserProfileController,
	updateUserByIdController,
	deleteUserByIdController,
	deleteUserProfileController,
	getDeletedUsersController,
	getDeletedUserByIdController,
	restoreUserController,
}
