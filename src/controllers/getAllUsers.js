const { User } = require('../db')

const getAllUsers = async () => {
	try {
		const users = await User.findAll()
		return users
	} catch (error) {
		throw error
	}
}

module.exports = getAllUsers
