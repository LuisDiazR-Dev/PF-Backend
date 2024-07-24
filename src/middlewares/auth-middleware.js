const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization
		if (!authHeader) return res.status(401).send('Token missing')
		const token = authHeader.split(' ')[1]
		const response = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
		req.user = response
		next()
	} catch (error) {
		return res.status(401).json(error)
	}
}

const authenticate = (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1]
	console.log(token, 'asd');
	if (token) {
		jwt.verify(token,  process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
			if (err) {
				console.error('Invalid token:', err.message)
				return next()
			}
			req.user = decoded.id
			next()
		})
	} else {
		next()
	}
}

module.exports = {
	verifyToken,
	authenticate,
}
