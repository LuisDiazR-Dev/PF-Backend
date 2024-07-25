const {
	createPreference,
	createStripePreference,
	paymentNotificationController,
} = require('../controllers/mercadoPago-controller')
const { getUserByIdController } = require('../controllers/users-controller')

const mercadoPagoPreference = async (req, res) => {
	const { title, quantity, unit_price, id } = req.body

	try {
		const loggedUser = await getUserByIdController(id)
		const userId = loggedUser.id
		if (!userId) {
			return res.status(400).json({ message: 'User not found ' })
		}
		const response = await createPreference(title, quantity, unit_price, userId)
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
	const payment = req.body
	try {
		const response = await paymentNotificationController(payment)
		res.status(200).json(response)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const cancelSubscriptionHandler = async (req, res) => {
	try {
		const { userId } = req.body
		console.log('Received cancel request with userId:', userId)
		if (!userId) {
			return res.status(400).json({ error: 'User ID is required' })
		}
		const user = await User.findByPk(userId)
		if (!user) {
			return res.status(404).json({ error: 'User not found' })
		}
		const freePlan = await Plan.findOne({ where: { planName: 'Free' } })
		if (!freePlan) {
			return res.status(404).json({ error: 'Free plan not found' })
		}
		user.planName = freePlan.planName
		await user.save()
		return res.status(200).json({ message: 'Subscription canceled and user updated to free plan' })
	} catch (error) {
		return res.status(500).json({ error: 'Internal server error' })
	}
}

module.exports = {
	mercadoPagoPreference,
	mercadoPagoNotification,
	cancelSubscriptionHandler,
	stripeWebhook,
	stripePreference,
}
