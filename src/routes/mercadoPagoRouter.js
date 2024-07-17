const { Router } = require('express')
const mercadoPagoRouter = Router()

const mercadoPagoPreference = require('../handlers/mercadoPago-handler')

mercadoPagoRouter.post('/', mercadoPagoPreference)

module.exports = mercadoPagoRouter
