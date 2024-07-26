const { User, Plan } = require('../db')
const mercadopago = require('mercadopago')
const youArePremium = require('../mailer/newPremium')
const stripe = require('stripe')
const {
	MP_TEST_ACCESS_TOKEN,
	FRONT_DEPLOY,
	FRONT_LOCAL_SUCCESS,
	FRONT_LOCAL_FAILURE,
	FRONT_LOCAL_PENDING,
} = process.env

const client = new mercadopago.MercadoPagoConfig({
	accessToken: MP_TEST_ACCESS_TOKEN,
})
const createPreference = async (title, quantity, unit_price, user) => {
	try {
		if (!user.id) {
			return res.status(400).json({ message: 'User not found' })
		}
		const body = {
			items: [
				{
					title: title,
					quantity: Number(quantity),
					unit_price: Number(unit_price),
					currency_id: 'ARS',
				},
			],
			back_urls: {
				success: FRONT_LOCAL_SUCCESS,
				failure: FRONT_LOCAL_FAILURE,
				pending: FRONT_LOCAL_PENDING,
			},
			external_reference: user.id,
		}
		const preference = new mercadopago.Preference(client)
		const result = await preference.create({ body })
		console.log(result.sandbox_init_point)
		return result.id
	} catch (error) {
		console.error('Error creating preference:', error)
		throw error
	}
}

const paymentNotificationController = async (payment) => {
	try {
		if (payment.type === 'payment' && payment.data.status === 'approved') {
			const userId = payment.data.external_reference
			const user = await User.findByPk(userId)
			const premiumPlan = await Plan.findOne({ where: { planName: 'Premium' } })
			if (!user) throw new Error('User not found')
			user.planName = premiumPlan.planName
			await user.save()
			await youArePremium(payment)
			return 'User updated to premium'
		}
	} catch (error) {
		throw new Error('Payment not approved or not a payment type')
	}
}

const cancelSubscriptionController = async (currentUser) => {
	try {
		const user = await User.findByPk(currentUser.id)
		if (!user) throw new Error('User not found')
		const freePlan = await Plan.findOne({ where: { planName: 'Free' } })
		if (!freePlan) throw new Error('Free plan not found')
		user.planName = freePlan.planName
		await user.save()
		return 'Subscription canceled and user updated to free plan'
	} catch (error) {
		throw error
	}
}

const clientStripe = new stripe(
	'sk_test_51PfcjxApzRY4HXw3SaIcmqMxh742spkGCG0ne5zCdsJATcsRky6mzglZe5n7lsGXzGZF6YAee3smMVgx8f8MdAcq00jf92UHM2'
)

const createStripePreference = async (title, quantity, unit_price) => {
	const pesos = unit_price
	const centavos = pesos * 100
	const session = await clientStripe.checkout.sessions.create({
		line_items: [
			{
				price_data: {
					product_data: {
						name: title,
					},
					currency: 'ARS',
					unit_amount: centavos,
				},
				quantity: quantity,
			},
		],
		mode: 'payment',
		success_url: process.env.FRONT_DEPLOY,
		cancel_url: process.env.FRONT_DEPLOY,
	})
	console.log(session)
	return session.url
}

//* Tarjeta visa Argentina prueba 4000000320000021 COD 123 EXP 12/26

module.exports = {
	createPreference,
	paymentNotificationController,
	createStripePreference,
	cancelSubscriptionController,
}
