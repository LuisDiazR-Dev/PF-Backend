const { Router } = require('express')
const authRouter = require('./authRouter')
const usersRouter = require('./usersRouter')
const projectsRouter = require('./projectRouter')
const techRouter = require('./techRouter')

const { verifyToken } = require('../middlewares/auth-middleware')

const router = Router()
router.use('/', authRouter)
router.use('/projects', projectsRouter)
router.use('/technologies', techRouter)
router.use('/users', verifyToken, usersRouter)

module.exports = router
