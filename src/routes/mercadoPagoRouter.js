const { Router } = require('express')
const mercadoPagoRouter = Router()

const { mercadoPagoPreference, mercadoPagoNotification} = require('../handlers/mercadoPago-handler')

mercadoPagoRouter.post('/preference', mercadoPagoPreference)
mercadoPagoRouter.post('/notification', mercadoPagoNotification)

module.exports = mercadoPagoRouter
