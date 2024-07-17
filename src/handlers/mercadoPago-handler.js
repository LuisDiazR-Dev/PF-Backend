const createPreference = require('../controllers/mercadoPago-controller')

const mercadoPagoPreference = async (req, res) => {
	const { title, quantity, unit_price } = req.body
	try {
		const response = await createPreference(title, quantity, unit_price)
		res.status(200).json(response)
	} catch (error) {}
}

module.exports = mercadoPagoPreference
