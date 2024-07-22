const mercadopago = require('mercadopago')
const { MP_TEST_ACCESS_TOKEN, 
		FRONT_DEPLOY, 
		FRONT_LOCAL_SUCCESS, 
		FRONT_LOCAL_FAILURE, 
		FRONT_LOCAL_PENDING 
	} = process.env

const client = new mercadopago.MercadoPagoConfig({
	accessToken: MP_TEST_ACCESS_TOKEN,
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
// 	   		back_urls: {
//               success: FRONT_DEPLOY,
//               failure: FRONT_DEPLOY,
//               pending: FRONT_DEPLOY
//          },
			back_urls: {
                success: FRONT_LOCAL_SUCCESS,
                failure: FRONT_LOCAL_FAILURE,
                pending: FRONT_LOCAL_PENDING
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
