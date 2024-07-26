const { Review } = require('../db')

const getAllReviewsController = async () => {
	try {
		const reviews = await Review.findAll()
		return reviews
	} catch (error) {
		throw error
	}
}

const getReviewByIdController = async (id) => {
	try {
		const review = await Review.findByPk(id)
		if (!review) throw new AppError('Review not found', 404)
		return review
	} catch (error) {
		throw error
	}
}

const createReviewController = async ({ rating, comment }, userId) => {
	try {
		const [review, created] = await Review.findOrCreate({
			where: { rating, userId },
			defaults: { comment },
		})
		if (!created) throw new Error('Review already exists')
		return review
	} catch (error) {
		throw new Error(`Failed to create a review: ${error.message}`)
	}
}

const updateUserReviewController = async (reviewData) => {
	try {
        const updatingReview = await Review.findByPk(reviewData.id)
		await Review.update(
			{
				rating: reviewData.rating ?? updatingReview.rating,
				comment: reviewData.comment ?? updatingReview.comment,
			},
			{ where: { id: reviewData.id } }
		)
		const updatedReview = await Review.findByPk(updatingReview.id)
		return updatedReview
	} catch (error) {
		throw error
	}
}

// const updateUserReviewByIdController = async (reviewData) => {
// 	try {
//         const updatingReview = await Review.findByPk(reviewData.id)
// 		await Review.update(
// 			{
// 				rating: reviewData.rating ?? updatingReview.rating,
// 				comment: reviewData.comment ?? updatingReview.comment,
// 			},
// 			{ where: { id: reviewData.id } }
// 		)
// 		const updatedReview = await Review.findByPk(updatingReview.id)
// 		return updatedReview
// 	} catch (error) {
// 		throw error
// 	}
// }

const deleteUserReviewController = async (reviewData) => {
	try {
        const updatingReview = await Review.findByPk(reviewData.id)
		await Review.destroy({ where: { id: reviewData.id }}
		)
		const deletedReview = await Review.findByPk(updatingReview.id)
		return 'Review deleted successfully'
	} catch (error) {
		throw error
	}
}

// const deleteUserReviewByIdController = async (reviewData) => {
// 	try {
//         const updatingReview = await Review.findByPk(reviewData.id)
// 		await Review.destroy({ where: { id: reviewData.id }}
// 		)
// 		const deletedReview = await Review.findByPk(updatingReview.id)
// 		return 'Review deleted successfully'
// 	} catch (error) {
// 		throw error
// 	}
// }

module.exports = {
	getAllReviewsController,
	getReviewByIdController,
	createReviewController,
    updateUserReviewController,
    deleteUserReviewController,
    // updateUserReviewByIdController,
    // deleteUserReviewByIdController
}
