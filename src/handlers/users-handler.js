const {
	getAllUsersController,
	getUserByIdController,
	createUserController,
} = require('../controllers/users-controller')

const getAllUsers = async (req, res) => {

	const { search } = req.query
	try {
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

const createUser = async (req, res) => {
	const { userName, email, password, bio, image, isPremium } = req.body
	console.log(req.body)
	try {
		const newuser = await createUserController(userName, email, password, bio, image, isPremium)
		res.status(201).json({ newuser })
	} catch (error) {
		console.log(error)
		res.status(400).json({ error: error.message })
	}
}

module.exports = {
	getAllUsers,
	getUserById,
	createUser,
}
