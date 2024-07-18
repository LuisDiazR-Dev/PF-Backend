<<<<<<< Updated upstream
const {
	auth0UserController,
	loginUserController,
	registerUserController,
} = require('../controllers/auth-controller')
=======
const { auth0UserController, loginUserController, registerUserController } = require('../controllers/auth-controller')
>>>>>>> Stashed changes

const auth0User = async (req, res) => {
	try {
		console.log('Headers:', req.headers);
		const token = req.headers.authorization?.split(' ')[1]
		if (!token) return res.status(401).json({ message: 'No token provided' })
		const response = await auth0UserController(token)
		res.status(200).json(response)
	} catch (error) {
		console.error('Token verification error:', error)
		return res.status(401).json({ message: 'Unauthorized: Invalid token' })
	}
}
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body
		const response = await loginUserController(email, password)
		return res.status(200).json(response)
	} catch (error) {
		res.status(401).json(error)
	}
}

const registerUser = async (req, res) => {
	try {
		const { userName, email, password } = req.body
		if (!userName || !email || !password) res.status(400).send('All fields are required')
		const response = await registerUserController(userName, email, password)
		return res.status(201).json(response)
	} catch (error) {
		res.status(401).json(error)
	}
}

module.exports = {
	auth0User,
	loginUser,
	registerUser,
}
