const { User, Plan } = require('../db'); 
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

const cancelSubscription = async (req, res) => {
	try {
	  const { userId } = req.body;
	  if (!userId) {
		return res.status(400).json({ error: 'User ID is required' });
	  }
	  const user = await User.findByPk(userId);
	  if (!user) {
		return res.status(404).json({ error: 'User not found' });
	  }
	  const freePlan = await Plan.findOne({ where: { planName: 'Free' } });
	  if (!freePlan) {
		return res.status(404).json({ error: 'Free plan not found' });
	  }
	  user.planName = freePlan.planName;
	  await user.save();
	  return res.status(200).json({ message: 'Subscription canceled and user updated to free plan' });
	} catch (error) {
	  return res.status(500).json({ error: 'Internal server error' });
	}
  };
  


module.exports = {
	createPreference,
	cancelSubscription
}
