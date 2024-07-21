const {
	getAllProjectsController,
	getProjectByIdController,
	createProjectController,
	updateProjectController,
	deleteProjectController,
	restoreProjectController,
	getDeletedProjectsController,
	getDeletedProjectByIdController,
} = require('../controllers/projects-controller')

const getAllProjects = async (req, res) => {
	const queries = req.query
	try {
		const response = await getAllProjectsController(queries)
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

const getDeletedProjects = async (req, res) => {
	try {
		const { id } = req.user
		const response = await getDeletedProjectsController(id)
		res.status(200).json(response)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const getDeletedProjectById = async (req, res) => {
	try {
		const { id } = req.params
		const response = await getDeletedProjectByIdController(id)
		res.status(200).json(response)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const createProject = async (req, res) => {
	const projectData = req.body
	try {
		const user = req.user
		const response = await createProjectController(projectData, user)
		res.status(201).json(response)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

const restoreProject = async (req, res) => {
	const { id } = req.params
	try {
		const response = await restoreProjectController(id)
		res.status(200).json(response)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

const updateProject = async (req, res) => {
	try {
		const { id } = req.params
		const projectData = req.body
		const response = await updateProjectController(projectData, id)
		res.status(200).json(response)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const deleteProject = async (req, res) => {
	try {
		const { id } = req.params
		const user = req.user
		const response = await deleteProjectController(id, user)
		res.status(200).json(response)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

module.exports = {
	getAllProjects,
	getProjectById,
	createProject,
	updateProject,
	deleteProject,
	restoreProject,
	getDeletedProjects,
	getDeletedProjectById
}
