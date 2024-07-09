const createProject = require('../controllers/postProjects')
const { getProjectByIdController } = require('../controllers/projects-controller')

const createProjectHandler = async (req, res) => {
	const { title, description, tags, technology, image } = req.body
	try {
		const project = await createProject(title, description, tags, technology, image)
		res.status(200).json({ project: project })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

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
	createProjectHandler,
}
