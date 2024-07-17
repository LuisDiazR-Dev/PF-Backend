const { User, Project, Technology } = require('../db')
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

const updateUserController = async (userData, id) => {
	try {
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

const deleteUserByIdController = async (id, user) => {
	try {
		console.log(`Attempting to delete user with id: ${user.id}`)
		const userToDelete = await User.findByPk(id)
		if (!userToDelete) throw new AppError('User not found', 404)

		if (user.id !== id && user.role !== 'admin') {
			throw new AppError('You are not authorized to delete this user', 403)
		}

		await User.destroy({ where: { id } })
		console.log(`User whit id: ${id} deleted successfully`)

		return { message: 'User deleted successfully' }
	} catch (error) {
		console.error(`Error deleting user: ${error.message}`)
		throw new AppError(error.message || `Error deleting user`, error.statusCode || 500)
	}
}

module.exports = {
	getAllUsersController,
	getUserByIdController,
	updateUserController,
	deleteUserByIdController,
}
