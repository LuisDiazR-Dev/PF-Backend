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
} = require('../handlers/review-handler')

const { checkPremium } = require('../middlewares/premium_moddleware')
const { verifyToken, authenticate } = require('../middlewares/auth-middleware')

const reviewRouter = Router()
reviewRouter.get('/', authenticate, getAllReviews)
reviewRouter.get('/:id', verifyToken, getReviewById)
reviewRouter.get('/users/:id', verifyToken, getUserReviews)
reviewRouter.post('/', verifyToken, checkPremium, createReview)
reviewRouter.put('/', verifyToken, updateUserReview)
reviewRouter.delete('/:id', verifyToken, deleteUserReview)
// reviewRouter.put('/', verifyToken, checkAdmin, updateUserReviewById)
// reviewRouter.delete('/:id', verifyToken, checkAdmin, deleteUserByIdReview)

module.exports = reviewRouter
