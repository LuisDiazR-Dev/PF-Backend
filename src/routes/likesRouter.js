const { Router } = require('express')
const {
    toggleProjectLike
} = require('../handlers/likes-handler')

const { verifyToken } = require('../middlewares/auth-middleware')

const likesRouter = Router()
likesRouter.post('/projects', verifyToken, toggleProjectLike)

module.exports = likesRouter
