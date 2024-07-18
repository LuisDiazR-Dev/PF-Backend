const mercadopago = require('mercadopago')

const client = new mercadopago.MercadoPagoConfig({
	accessToken: 'TEST-4489293986958947-071617-2dcf20f3837c99bb9f59966d1526d5f2-145321681',
})
const createPreference = async (title, quantity, unit_price, userId) => {
	try {
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
				success: 'http://localhost:5175/paymentSuccess',
				failure: 'http://localhost:5175/paymentFailure',
				pending: 'http://localhost:5175/paymentPending',
			},
			external_reference: userId,
		}
		const preference = new mercadopago.Preference(client)
		const result = await preference.create({ body })
		return result.sandbox_init_point
	} catch (error) {
		console.error('Error creating preference:', error)
		throw error
	}
}

module.exports = createPreference
