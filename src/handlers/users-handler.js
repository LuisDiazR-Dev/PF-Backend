const {
	getAllUsersController,
	getUserByIdController,
	updateUserProfileController,
	updateUserByIdController,
	deleteUserByIdController,
	deleteUserProfileController
} = require('../controllers/users-controller')

const getAllUsers = async (req, res) => {
	try {
		const { search } = req.query
		const response = await getAllUsersController(search)
		res.status(200).json(response)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const getUserById = async (req, res) => {
	try {
		const { id } = req.params
		const response = await getUserByIdController(id)
		res.status(200).json(response)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const getUserProfile = async (req, res) => {
	try {
		const { id } = req.user
		const response = await getUserByIdController(id)
		console.log(response);
		res.status(200).json(response)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const updateUserProfile = async (req, res) => {
	try {
		const user = req.user
		const userData = req.body
		const response = await updateUserProfileController(userData, user)
		res.status(200).json(response)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const updateUserById = async (req, res) => {
	try {
		const user = req.user;
		const userData = req.body
		const response = await updateUserByIdController(userData, user)
		res.status(200).json(response)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const deleteUserById = async (req, res) => {
	try {
		const { id } = req.params
		const user = req.user
		const response = await deleteUserByIdController(id, user)
		res.status(200).json(response)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const deleteUserProfile = async (req, res) => {
	try {
		const user = req.user
		const response = await deleteUserProfileController(user)
		res.status(200).json(response)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

module.exports = {
	getAllUsers,
	getUserById,
	getUserProfile,
	updateUserProfile,
	updateUserById,
	deleteUserById,
	deleteUserProfile,
}
