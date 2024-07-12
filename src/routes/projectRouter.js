const { Router } = require('express')
const projectRouter = Router()
const {
	getAllProjects,
	getProjectById,
	createProject,
	updateProject,
	deleteProject,
} = require('../handlers/projects-handler')

projectRouter.get('/', getAllProjects)
projectRouter.get('/:id', getProjectById)
projectRouter.post('/', createProject)
projectRouter.put('/:id', updateProject)
projectRouter.delete('/:id', deleteProject)

module.exports = projectRouter
