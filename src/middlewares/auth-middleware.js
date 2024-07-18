const { JWE, JWK } = require('node-jose')
const jwt = require('jsonwebtoken')
const jwksClient = require('jwks-rsa')

const client = jwksClient({
	jwksUri: 'https://dev-bd0lpc8g2yokggoq.us.auth0.com',
})

const getKey = (header, callback) => {
	client.getSigningKey(header.kid, function (err, key) {
		if (err) return callback(err)
		const signingKey = key.publicKey || key.rsaPublicKey
		callback(null, signingKey)
	})
}

const decryptAuth0Token = async (token) => {
	try {
		const key = JWK.asKey(process.env.AUTH0_ENCRYPTION_KEY, {
			alg: 'dir',
			enc: 'A256GCM',
			iss: 'https://dev-bd0lpc8g2yokggoq.us.auth0.com/',
		})
		const { plaintext } = await JWE.decrypt(token, key)
		return JSON.parse(new TextDecoder().decode(plaintext))
	} catch (error) {
		throw new Error('Token decryption failed')
	}
}

const verifyLocalToken = async (token, secret) => {
	try {
		const decoded = jwt.verify(token, secret)
		return decoded
	} catch (err) {
		throw new Error('Invalid local token')
	}
}

const verifyToken = async (req, res, next) => {
	const token = req.headers.authorization && req.headers.authorization.split(' ')[1]
	if (!token) return res.status(401).json({ message: 'No token provided' })
	try {
		let decoded
		decoded = isAuth0Token(token)
			? await verifyAuth0Token(token)
			: await verifyLocalToken(token, process.env.ACCESS_TOKEN_SECRET)
		req.user = decoded
		next()
	} catch (err) {
		res.status(401).json({ message: 'Unauthorized: Invalid token' })
	}
}

const isAuth0Token = (token) => {
	const decoded = jwt.decode(token, { complete: true })
	return (
		decoded &&
		decoded.header &&
		decoded.header.iss &&
		decoded.header.iss.includes('dev-bd0lpc8g2yokggoq')
	)
}

module.exports = {
	decryptAuth0Token,
	verifyLocalToken,
	verifyToken,
	isAuth0Token,
}
