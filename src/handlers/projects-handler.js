const {
	getAllProjectsController,
	getProjectByIdController,
	createProjectController,
	updateProjectController,
	deleteProjectController,
} = require('../controllers/projects-controller')

const getAllProjects = async (req, res, next) => {
	const queries = req.query
	try {
		const response = await getAllProjectsController(queries)
		res.status(200).json(response)
	} catch (error) {
		next(error);
	}
}

const getProjectById = async (req, res, next) => {
	try {
		const { id } = req.params
		const response = await getProjectByIdController(id)
		res.status(200).json(response)
	} catch (error) {
		next(error);
	}
}

const createProject = async (req, res, next) => {
	const projectData = req.body
	try {
		const user = req.user
		const project = await createProjectController(projectData, user)
		res.status(201).json({ project: project })
	} catch (error) {
		next(error);
	}
}

const updateProject = async (req, res, next) => {
	try {
		const { id } = req.params
		const projectData = req.body
		const response = await updateProjectController(projectData, id)
		res.status(200).json(response)
	} catch (error) {
		next(error);
	}
}

const deleteProject = async (req, res, next) => {
	try {
		const { id } = req.params
		const response = await deleteProjectController(id)
		res.status(200).json(response)
	} catch (error) {
		next(error);
	}
}

module.exports = {
	getAllProjects,
	getProjectById,
	createProject,
	updateProject,
	deleteProject,
}
