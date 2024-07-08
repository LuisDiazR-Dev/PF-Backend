const { getAllUsersController, getUserByIdController } = require('../controllers/users-controller')

const getAllUsers = async (req, res) => {
	try {
		const response = await getAllUsersController()
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

module.exports = {
	getAllUsers,
	getUserById,
}
