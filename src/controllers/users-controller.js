const { User } = require('../../db')

const getAllUsersController = async () => {
	try {
		const users = await User.findAll()
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
