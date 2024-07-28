const { Router } = require('express')
const authRouter = require('./authRouter')
const usersRouter = require('./usersRouter')
const projectsRouter = require('./projectRouter')
const techRouter = require('./techRouter')
const paymentRouter = require('./paymentRouter')
const tagRouter = require('./tagRouter')
const likesRouter = require('./likesRouter')
const contractRouter = require('./contractRouter')
const reviewsRouter = require('./reviewsRouter')
const promediosRouter = require('./promedioRoute')

const router = Router()
router.use('/', authRouter)
router.use('/projects', projectsRouter)
router.use('/technologies', techRouter)
router.use('/users', usersRouter)
router.use('/payment', paymentRouter)
router.use('/tags', tagRouter)
router.use('/likes', likesRouter)
router.use('/contract', contractRouter)
router.use('/reviews', reviewsRouter)
router.use('/promedios', promediosRouter)

module.exports = router
