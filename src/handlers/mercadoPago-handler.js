// mercadopago-handler.js
const createPreference = require('../controllers/mercadoPago-controller')
const { getUserByIdController } = require('../controllers/users-controller')
const { User, Plan } = require('../db')

const mercadoPagoPreference = async (req, res) => {
	const { title, quantity, unit_price, id } = req.body
	
	try {
		const loggedUser = await getUserByIdController(id)
		const userId = loggedUser.id
		console.log(loggedUser)
		
		if (!userId) {
			return res.status(400).json({ message: 'User not found ' })
		}
		console.log(userId)
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
			// Obtén el userId del pago desde external_reference
			const userId = payment.data.external_reference

			const user = await User.findByPk(userId)
			if (!user) {
				return res.status(404).json({ message: 'User not found' })
			}

			// Actualizar el usuario a premium
			user.isPremium = true
			await user.save()

			// Actualizar el plan del usuario a Premium
			const plan = await Plan.findOne({ where: { id: user.planId } })
			if (plan) {
				plan.name = 'Premium'
				await plan.save()
			}

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
