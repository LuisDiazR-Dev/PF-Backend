const { User } = require('../db')
const jwt = require('jsonwebtoken')

const loginUserController = async (email, password) => {
	try {
		const user = await User.findOne({ where: { email: email } })
		if (!user || user.password !== password) throw new Error('Invalid credential')
		const accessToken = jwt.sign(
			{ id: user.id, userName: user.userName },
			process.env.ACCESS_TOKEN_SECRET,
			// { expiresIn: '1h' }
		)
		return {user: user, token: accessToken}
	} catch (error) {
		throw error
	}
}

const registerUserController = async (userName, email, password) => {
	try {
        const [user, created] = await User.findOrCreate({
            where: { email, password, userName },
            defaults: { bio, image, role, isPremium }
        });
        if (!created) throw new Error('User already exists');
        return res.status(201).json(user);
	} catch (error) {
		console.log(error)
		throw new Error('No se pudo crear el usuario')
	}
}

module.exports = {
	loginUserController,
	registerUserController,
}
