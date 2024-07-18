const createPreference = require('../controllers/mercadoPago-controller')

const mercadoPagoPreference = async (req, res) => {
    const { title, quantity, unit_price } = req.body
    try {
        const preferenceId = await createPreference(title, quantity, unit_price)
        res.status(200).json({ preferenceId })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = mercadoPagoPreference
