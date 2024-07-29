const {
	createPreference,
	createStripePreference,
	paymentNotificationController,
	cancelSubscriptionController,
	paymentStripeController,
} = require('../controllers/payment-controller')

const stripe = require('stripe')(
	'sk_test_51PfcjxApzRY4HXw3SaIcmqMxh742spkGCG0ne5zCdsJATcsRky6mzglZe5n7lsGXzGZF6YAee3smMVgx8f8MdAcq00jf92UHM2'
)

const { User, Plan } = require('../db')

const mercadoPagoPreference = async (req, res) => {
	try {
		const user = req.user
		const { title, quantity, unit_price } = req.body
		const response = await createPreference(title, quantity, unit_price, user)
		res.status(200).json(response)
	} catch (error) {
		res.status(500).send(error.message)
	}
}
const mercadoPagoNotification = async (req, res) => {
	try {
		const payment = req.body
		const response = await paymentNotificationController(payment)
		res.status(200).json(response)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const stripePreference = async (req, res) => {
	const { title, quantity, unit_price } = req.body
	try {
		const response = await createStripePreference(title, quantity, unit_price)

		res.status(200).json(response)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const stripeWebhook = async (req, res) => {
	const sessionId = req.query.session_id
	const user = '15e71432-d7c4-445e-a873-d79090afe549'
	try {
		const response = await paymentStripeController(sessionId, user)
		res.status(200).json(response)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const cancelSubscription = async (req, res) => {
	try {
		const user = req.user
		const response = await cancelSubscriptionController(user)
		return res.status(200).json(response)
	} catch (error) {
		return res.status(500).json(error.message)
	}
}

module.exports = {
	mercadoPagoPreference,
	mercadoPagoNotification,
	cancelSubscription,
	stripeWebhook,
	stripePreference,
}
