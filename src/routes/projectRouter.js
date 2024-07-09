const { Router } = require('express')
const projectRouter = Router()
const { getProjectById, createProjectHandler } = require('../handlers/projects-handler')

projectRouter.post('/create', createProjectHandler)
projectRouter.get('/:id', getProjectById)


module.exports = projectRouter

