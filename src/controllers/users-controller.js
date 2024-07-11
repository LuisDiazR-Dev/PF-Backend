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

module.exports = { getAllUsersController, getUserByIdController }
