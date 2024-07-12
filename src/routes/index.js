const { Router } = require('express')
const authRouter = require('./authRouter')
const usersRouter = require('./usersRouter')
const projectsRouter = require('./projectRouter')
const techRouter = require('./techRouter')

const { verifyToken } = require('../middlewares/auth-middleware')

const router = Router()
router.use('/', authRouter)
router.use('/projects', projectsRouter)
router.use('/users', verifyToken, usersRouter)
router.use('/technologies', verifyToken, techRouter)

module.exports = router
