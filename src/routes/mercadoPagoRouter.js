const { Router } = require('express')
const mercadoPagoRouter = Router()
const { verifyToken } = require('../middlewares/auth-middleware')

const {
	mercadoPagoPreference,
	mercadoPagoNotification,
	cancelSubscriptionHandler,
	stripeWebhook,
	stripePreference,
} = require('../handlers/mercadoPago-handler')

mercadoPagoRouter.post('/preference', mercadoPagoPreference)
mercadoPagoRouter.post('/notification', mercadoPagoNotification)
mercadoPagoRouter.post('/cancel', cancelSubscriptionHandler)
mercadoPagoRouter.post('/stripe/webhook', stripeWebhook)
mercadoPagoRouter.post('/stripe/preference', verifyToken, stripePreference)

module.exports = mercadoPagoRouter
