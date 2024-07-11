const { loginUserController, registerUserController } = require('../controllers/auth-controller')

const loginUser = async (req, res) => {
	try {
        const { email, password } = req.body;
        const response = await loginUserController(email, password)
        return res.status(200).json(response);
	} catch (error) {
		res.status(401).json(error)
	}
}

const registerUser = async (req, res) => {
	try {
        const { userName, email, password } = req.body;
		if (!userName || !email || !password) res.status(400).send('All fields are required')
        const response = await registerUserController(userName, email, password)
        return res.status(201).json(response);
	} catch (error) {
		res.status(401).json(error)
	}
}

module.exports = {
	loginUser,
	registerUser
}
