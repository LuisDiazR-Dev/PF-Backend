const createPreference = require('../controllers/mercadoPago-controller')
const { getUserByIdController } = require('../controllers/users-controller')
const { User, Plan } = require('../db')

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
		if (payment.type === 'payment' && payment.data.status === 'approved') {
			const userId = payment.data.external_reference
			const user = await User.findByPk(userId)
			const premiumPlan = await Plan.findOne({ where: { planName: 'Premium' } })
			if (!user) {
				return res.status(404).json({ message: 'User not found' })
			}
			user.planName = premiumPlan.planName
			await user.save()
			res.status(200).json({ message: 'User updated to premium' })
		} else {
			res.status(200).json({ message: 'Payment not approved or not a payment type' })
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

module.exports = {
	mercadoPagoPreference,
	mercadoPagoNotification,
}
