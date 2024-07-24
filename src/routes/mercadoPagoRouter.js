const { Router } = require('express')
const mercadoPagoRouter = Router()

const {
	mercadoPagoPreference,
	mercadoPagoNotification,
	cancelSubscriptionHandler,
} = require('../handlers/mercadoPago-handler')

mercadoPagoRouter.post('/preference', mercadoPagoPreference)
mercadoPagoRouter.post('/notification', mercadoPagoNotification)
mercadoPagoRouter.post('/cancel', cancelSubscriptionHandler)

module.exports = mercadoPagoRouter
