const { User } = require('../db')

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

const createUserController = async (userName, email, password, bio, image, isPremium) => {
	try {
		const newUser = await User.create({
			userName,
			email,
			password,
			bio,
			image,
			isPremium,
		})
		return newUser
	} catch (error) {
		console.log(error)
		throw new Error(' No se pudo crear el usuario')
	}
}

module.exports = { getAllUsersController, getUserByIdController, createUserController }
