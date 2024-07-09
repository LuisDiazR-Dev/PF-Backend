const { Router } = require("express");
const usersRouter = require('./usersRouter')
const projectsRouter = require('./projectRouter')

// * Rutas
const router = Router();
router.use('/users', usersRouter)
router.use('/projects', projectsRouter)

module.exports = router;