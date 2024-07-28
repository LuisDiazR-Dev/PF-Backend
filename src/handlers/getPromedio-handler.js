const averagePrice = require('../controllers/getPromedio-controller')

const getPromedioHandler = async (req, res) => {
	try {
		const ganancia = await averagePrice()
		res.status(200).json(ganancia)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

module.exports = getPromedioHandler
