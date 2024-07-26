const { Router } = require('express')
const paymentRouter = Router()
const { verifyToken } = require('../middlewares/auth-middleware')

const {
	mercadoPagoPreference,
	mercadoPagoNotification,
	cancelSubscription,
	stripeWebhook,
	stripePreference,
} = require('../handlers/mercadoPago-handler')

paymentRouter.post('/preference', verifyToken, mercadoPagoPreference)
paymentRouter.post('/notification', mercadoPagoNotification)
paymentRouter.post('/cancel', verifyToken, cancelSubscription)
paymentRouter.post('/stripe/webhook', stripeWebhook)
paymentRouter.post('/stripe/preference', verifyToken, stripePreference)

module.exports = paymentRouter
