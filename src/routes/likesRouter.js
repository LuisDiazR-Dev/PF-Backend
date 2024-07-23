const { Router } = require('express')
const {
	getProjectLikes,
    toggleProjectLike
} = require('../handlers/likes-handler')

const likeRouter = Router()
likeRouter.post('/projects', toggleProjectLike)

module.exports = likeRouter
