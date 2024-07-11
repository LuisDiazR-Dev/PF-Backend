const { Router } = require('express')
const authRouter = require('./authRouter')
const usersRouter = require('./usersRouter')
const projectsRouter = require('./projectRouter')

const { verifyToken } = require('../middlewares/auth-middleware')

const router = Router()
router.use('/', authRouter)
router.use('/users', verifyToken, usersRouter)
router.use('/projects', projectsRouter)

module.exports = router
