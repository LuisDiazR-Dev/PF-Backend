const { getAllTechnologiesController } = require('../controllers/technology-controller')

const getAllTechnologies = async (req, res) => {    
    try {
        const { name } = req.query;
        const response = await getAllTechnologiesController(name)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getAllTechnologies
}