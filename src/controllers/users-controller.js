const { User, Project, Technology, Tag, Plan, Contract } = require('../db')
const { Op } = require('sequelize')
const AppError = require('../utils/index')

const include = [
	{
		model: Project,
		as: 'projects',
		include: [
			{
				model: Technology,
				as: 'technologies',
			},
			{
				model: Tag,
				as: 'tags',
			},
		],
	},
	{
		model: Contract,
		as: 'sentContracts',
	},
	{
		model: Contract,
		as: 'receivedContracts',
	},
	{
		model: Plan,
		as: 'plan',
	},
]

const getAllUsersController = async (search) => {
	try {
		let where = {}
		if (search)
			where[Op.or] = [
				{ userName: { [Op.iLike]: `%${search}%` } },
				{ email: { [Op.iLike]: `%${search}%` } },
			]
		const users = await User.findAll({ where, include })
		return users
	} catch (error) {
		throw error
	}
}

const getUserByIdController = async (id) => {
	try {
		const user = await User.findByPk(id, { include })
		if (!user) throw new AppError('User not found', 404)
		return user
	} catch (error) {
		throw error
	}
}

const updateUserProfileController = async (userData, currentUser) => {
	try {
		const updatingUser = await User.findByPk(currentUser.id)
		if (!updatingUser || updatingUser.role !== 'user') {
			throw new AppError('You are not authorized to update this user', 401)
		}
		await updatingUser.update(
			{
				userName: userData.userName ?? updatingUser.userName,
				password: userData.password ?? updatingUser.password,
				bio: userData.bio ?? updatingUser.bio,
				aboutMe: userData.aboutMe ?? updatingUser.aboutMe,
				image: userData.image ?? updatingUser.image,
			},
			{ where: { id: updatingUser.id } }
		)
		const updatedUser = await User.findByPk(updatingUser.id)
		return updatedUser
	} catch (error) {
		throw error
	}
}

const updateUserByIdController = async (userData, currentUser) => {
	try {
		const userAdmin = await User.findByPk(currentUser.id)
		if (!userAdmin || userAdmin.role !== 'admin') {
			throw new AppError('You are not authorized to update this user', 401)
		}
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
		throw error
	}
}

const deleteUserByIdController = async (id, user) => {
	try {
		const userToDelete = await User.findByPk(id)
		if (!userToDelete) throw new AppError('User not found', 404)
		if (user.role !== 'admin') {
			throw new AppError('You are not authorized to delete this user', 401)
		}
		await User.destroy({ where: { id } })
		return { message: 'User deleted successfully' }
	} catch (error) {
		console.error(`Error deleting user: ${error.message}`)
		throw new AppError(error.message || `Error deleting user`, error.statusCode || 500)
	}
}

const deleteUserProfileController = async (user) => {
	try {
		const userToDelete = await User.findByPk(user.id)
		if (!userToDelete) throw new AppError('User not found', 404)
		if (user.role !== 'user') {
			throw new AppError('You are not authorized to delete this user', 401)
		}
		await User.destroy({ where: { id: user.id } })
		return { message: 'User deleted successfully' }
	} catch (error) {
		console.error(`Error deleting user: ${error.message}`)
		throw new AppError(error.message || `Error deleting user`, error.statusCode || 500)
	}
}

module.exports = {
	getAllUsersController,
	getUserByIdController,
	updateUserProfileController,
	updateUserByIdController,
	deleteUserByIdController,
	deleteUserProfileController,
}
