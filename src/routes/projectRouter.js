const { Router } = require('express')
const projectRouter = Router()
const { getAllProjects, getProjectById, createProject } = require('../handlers/projects-handler')
const { verifyToken } = require("../middlewares/auth-middleware")

projectRouter.get('/', getAllProjects)
projectRouter.get('/:id', getProjectById)
projectRouter.post('/', createProject)


module.exports = projectRouter

