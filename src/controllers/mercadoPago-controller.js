const mercadopago = require('mercadopago')

const client = new mercadopago.MercadoPagoConfig({
	accessToken: 'APP_USR-4489293986958947-071617-8a9234090e2242df13e09b3ac062e3a2-145321681',
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
		console.log(result.sandbox_init_point)
		return result.id
	} catch (error) {
		console.error('Error creating preference:', error)
		throw error
	}
}

module.exports = createPreference
