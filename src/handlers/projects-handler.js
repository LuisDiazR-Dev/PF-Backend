<<<<<<< HEAD
const createProject = require('../controllers/postProjects')

const createProjectHandler = async (req, res) => {
	const { title, description, tags, technology, image } = req.body
	try {
		const project = await createProject(title, description, tags, technology, image)
		res.status(200).json({ project: project })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

module.exports = createProjectHandler;
=======
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
>>>>>>> 4e0562b2bdf375b1ea7d6f0aa693ff30260755c7
