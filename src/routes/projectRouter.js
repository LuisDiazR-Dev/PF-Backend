const { Router } = require('express')
const projectRouter = Router()
const {
	getAllProjects,
	getProjectById,
	createProject,
	updateProject,
	deleteProject,
} = require('../handlers/projects-handler')

const { verifyToken } = require('../middlewares/auth-middleware')
const { verifyAdmin } = require('../middlewares/verifyAdmin')

projectRouter.get('/', getAllProjects)
projectRouter.get('/:id', getProjectById)
projectRouter.post('/', verifyToken, createProject)
projectRouter.put('/:id', verifyToken, updateProject)
projectRouter.delete('/:id', verifyToken, deleteProject)

module.exports = projectRouter
