const { Router } = require('express')
const projectRouter = Router()
const {
	getAllProjects,
	getProjectById,
	createProject,
	updateProject,
	deleteProject,
	restoreProject,
	getDeletedProjects,
	getDeletedProjectById,
} = require('../handlers/projects-handler')

const { verifyToken } = require('../middlewares/auth-middleware')

projectRouter.get('/', getAllProjects)
projectRouter.get('/deleted', verifyToken, getDeletedProjects)
projectRouter.get('/deleted/:id', verifyToken, getDeletedProjectById)
projectRouter.get('/:id', getProjectById)
projectRouter.post('/', verifyToken, createProject)
projectRouter.post('/restore/:id', verifyToken, restoreProject)
projectRouter.put('/:id', verifyToken, updateProject)
projectRouter.delete('/:id', verifyToken, deleteProject)

module.exports = projectRouter
