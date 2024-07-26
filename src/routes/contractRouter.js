const { Router } = require('express')
const contractRouter = Router()
const {
    createContract
} = require('../handlers/contract-handler')

const { verifyToken } = require('../middlewares/auth-middleware')

contractRouter.post('/', verifyToken, createContract)

module.exports = contractRouter