const { getAllTechsController } = require('../controllers/technology-controller')

const getAllTechs = async (req, res) => {    

    const { name } = req.query;
    try {
        const response = await getAllTechsController(name)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getAllTechs
}