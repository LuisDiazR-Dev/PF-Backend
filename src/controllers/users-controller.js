const { User, Project, Technology, Tag } = require('../db')
const { Op } = require('sequelize')
const AppError = require('../utils/index')

const getAllUsersController = async (search) => {
	try {
		let where = {}
		if (search)
			where[Op.or] = [
				{ userName: { [Op.iLike]: `%${search}%` } },
				{ email: { [Op.iLike]: `%${search}%` } },
			]
		const users = await User.findAll({ where })
		return users
	} catch (error) {
		throw error
	}
}

const getUserByIdController = async (id) => {
	try {
		const user = await User.findByPk(id, {
			include: [
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
			],
		})
		if (!user) throw new AppError('User not found', 404)
		return user
	} catch (error) {
		throw error
	}
}

const updateUserByIdController = async (userData, id, loggedUser) => {
	try {
		const userAdmin = await User.findByPk(loggedUser.id)
		if (userAdmin.role !== 'admin') {
			throw new AppError('You are not authorized to delete this user', 401)
		}
		const user = await User.findByPk(id)
		await User.update(
			{
				userName: userData.userName ?? user.userName,
				password: userData.password ?? user.password,
				bio: userData.bio ?? user.bio,
				image: userData.image ?? user.image,
			},
			{ where: { id: id } }
		)
		const updatedUser = await User.findByPk(id)
		return updatedUser
	} catch (error) {
		throw error
	}
}

const updateUserProfileController = async (userData, id) => {
	try {
		const user = await User.findByPk(id)
		if (user.role !== 'user') {
			throw new AppError('You are not authorized to delete this user', 401)
		}
		await User.update(
			{
				userName: userData.userName ?? user.userName,
				password: userData.password ?? user.password,
				bio: userData.bio ?? user.bio,
				image: userData.image ?? user.image,
			},
			{ where: { id: id } }
		)
		const updatedUser = await User.findByPk(id)
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
