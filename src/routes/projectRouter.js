const { Router } = require('express')
const projectRouter = Router()
const { getAllProjects, getProjectById, createProject } = require('../handlers/projects-handler')
const { verifyToken } = require("../middlewares/auth-middleware")

projectRouter.get('/', verifyToken, getAllProjects)
projectRouter.get('/:id', verifyToken, getProjectById)
projectRouter.post('/', verifyToken, createProject)


module.exports = projectRouter

