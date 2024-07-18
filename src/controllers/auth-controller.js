const { User } = require('../db')
const jwt = require('jsonwebtoken')
const { decryptAuth0Token } = require('../middlewares/auth-middleware')

const auth0UserController = async (token) => {
	try {
		const decoded = await decryptAuth0Token(token)
		return {
			user: {
				id: decoded.sub,
				email: decoded.email,
			},
			token,
		}
	} catch (error) {
		throw error
	}
}

const loginUserController = async (email, password) => {
	try {
		const user = await User.findOne({ where: { email: email } })
		if (!user || user.password !== password) throw new Error('Invalid credential')
		const accessToken = jwt.sign(
			{ id: user.id, userName: user.userName },
			process.env.ACCESS_TOKEN_SECRET
			// { expiresIn: '1h' }
		)
		return { user, token: accessToken }
	} catch (error) {
		throw error
	}
}

const registerUserController = async (userName, email, password) => {
	try {
		const [user, created] = await User.findOrCreate({
			where: { email, password, userName },
		})
		if (!created) throw new Error('User already exists')
		return user
	} catch (error) {
		console.log(error)
		throw new Error('No se pudo crear el usuario')
	}
}

module.exports = {
	auth0UserController,
	loginUserController,
	registerUserController,
}
