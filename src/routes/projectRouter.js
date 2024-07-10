const { Router } = require('express')
const projectRouter = Router()
const { getAllProjects, getProjectById, createProject } = require('../handlers/projects-handler')

projectRouter.get('/', getAllProjects)
projectRouter.get('/:id', getProjectById)
projectRouter.post('/', createProject)


module.exports = projectRouter

