const { Router } = require('express')
const getPromedioHandler = require('../handlers/getPromedio-handler')
const pdf = require('../handlers/getpdf')

const promediosRouter = Router()
promediosRouter.get('/promedio', getPromedioHandler)
promediosRouter.get('/pdf', pdf)

module.exports = promediosRouter
