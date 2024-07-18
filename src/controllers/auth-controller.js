const { User } = require('../db')
const jwt = require('jsonwebtoken')

const auth0UserController = async (userData) => {
    try {
        const { userName, email, password, image } = userData;
        const [user, created] = await User.findOrCreate({
            where: { email },
            defaults: { userName, password, image }
        });
        const accessToken = jwt.sign(
            { id: user.id, userName: user.userName },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );
        return { user, token: accessToken };
    } catch (error) {
        throw error;
    }
};

const loginUserController = async (email, password) => {
	try {
		const user = await User.findOne({ where: { email: email } })
		if (!user || user.password !== password) throw new Error('Invalid credential')
		const accessToken = jwt.sign(
			{ id: user.id, userName: user.userName, role: user.role },
			process.env.ACCESS_TOKEN_SECRET
			// { expiresIn: '1h' }
		)
		return { user: user, token: accessToken }
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
		throw new Error('Failed to create a user')
	}
}

module.exports = {
	auth0UserController,
	loginUserController,
	registerUserController,
}
