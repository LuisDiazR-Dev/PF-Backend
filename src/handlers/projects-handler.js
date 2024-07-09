const {
	getAllProjectsController,
	getProjectByIdController,
	createProjectController,
} = require('../controllers/projects-controller')

const getAllProjects = async (req, res) => {

	const { search, technology } = req.query

	try {
		const response = await getAllProjectsController(search, technology)
		res.status(200).json(response)
	} catch (error) {
		res.status(500).send(error.message)
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

const createProject = async (req, res) => {
	const { title, description, tags, technology, image } = req.body
	try {
		const project = await createProjectController(title, description, tags, technology, image)
		res.status(201).json({ project: project })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

module.exports = {
	getAllProjects,
	getProjectById,
	createProject,
}
