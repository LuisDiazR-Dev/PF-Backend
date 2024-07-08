const { Router } = require('express')

const projectRouter = Router()
const createProjectHandler = require('../handlers/projects-handler')

projectRouter.post('/create', createProjectHandler)

module.exports = projectRouter
