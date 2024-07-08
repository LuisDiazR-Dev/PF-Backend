const { Router } = require('express')
const { getProjectById } = require('../handlers/projects-handler')

const projectsRouter = Router()
projectsRouter.get('/:id', getProjectById)

module.exports = projectsRouter
