const { Router } = require('express')
const {
    getAllReviews,
    getReviewById,
    getUserReviews,
    createReview,
    updateUserReview,
    deleteUserReview,
    // updateUserReviewById,
    // deleteUserByIdReview
} = require('../handlers/reviews-handler')

const { checkAdmin } = require('../middlewares/admin_middleware')
const { checkPremium } = require('../middlewares/premium_moddleware')
const { verifyToken } = require('../middlewares/auth-middleware')

const reviewsRouter = Router()
reviewsRouter.get('/', verifyToken, checkAdmin, getAllReviews)
reviewsRouter.get('/:id', verifyToken, getReviewById)
reviewsRouter.get('/users/:id', verifyToken, getUserReviews)
reviewsRouter.post('/', verifyToken, checkPremium, createReview)
reviewsRouter.put('/', verifyToken, updateUserReview)
reviewsRouter.delete('/:id', verifyToken, deleteUserReview)
// reviewsRouter.put('/', verifyToken, checkAdmin, updateUserReviewById)
// reviewsRouter.delete('/:id', verifyToken, checkAdmin, deleteUserByIdReview)

module.exports = reviewsRouter
