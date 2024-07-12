const { User } = require('../db')
const { Op } = require('sequelize')

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
		const user = await User.findByPk(id)
		return user
	} catch (error) {
		throw error
	}
}

const updateUserController = async (userData, id) => {
	try {
		const user = await User.findByPk(id)
		await User.update({
			userName: userData.userName ?? user.userName,
            password: userData.password ?? user.password,
            bio: userData.bio ?? user.bio,
            image: userData.image ?? user.image,
		}, { where: {id: id}})
		const updatedUser = await User.findByPk(id)
		return updatedUser
	} catch (error) {
		throw error
	}
}

const deleteUserByIdController = async (id) => {
	try {
		await User.destroy({ where: { id: id } })
		return 'User correctly deleted'
	} catch (error) {
		throw error
	}
}

module.exports = {
	getAllUsersController,
	getUserByIdController,
	updateUserController,
	deleteUserByIdController,
}
