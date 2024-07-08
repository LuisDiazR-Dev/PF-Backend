const { getProjectByIdController } = require('../controllers/projects-controller')

const getProjectById = async (req, res) => {
	try {
		const { id } = req.params
		const response = await getProjectByIdController(id)
		res.status(200).json(response)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

module.exports = {
	getProjectById,
}