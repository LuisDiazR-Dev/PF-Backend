const { User, Plan, Link, Like, Project, Review } = require('../db')
const { fn, col } = require('sequelize')

const metaDateDashboard = async () => {
	try {
		const likeCount = await Like.count()
		const userCount = await User.count()
		const userPremium = await Plan.count({
			where: {
				planName: 'Premium',
			},
		})

		const userFree = await User.count({
			where: {
				planName: 'Free',
			},
		})
		const projectsCount = await Project.count()
		const reviewCount = await Review.count()

		const githubCount = await Link.count({
			where: {
				name: 'GitHub',
			},
		})

		const linkedInCount = await Link.count({
			where: {
				name: 'LinkedIn',
			},
		})

		const incomes = await User.findAll({
			attributes: [[fn('AVG', col('plan.price')), 'averagePrice']],
			include: [
				{
					model: Plan,
					as: 'plan',
					attributes: [],
				},
			],
			where: {
				role: 'user',
			},
			raw: true,
		})
		const averagePrice = incomes[0].averagePrice
		const roundedAveragePrice = averagePrice ? parseFloat(averagePrice).toFixed(2) : null

		const linkedInPercentage = ((linkedInCount / userCount) * 100).toFixed()
		const githubPercentage = ((githubCount / userCount) * 100).toFixed()
		const reviewsPercentage = ((reviewCount / projectsCount) * 100).toFixed()
		const likesPercentage = ((likeCount / projectsCount) * 100).toFixed()

		return {
			userCount,
			projectsCount,
			roundedAveragePrice,
			likeCount,
			githubCount,
			linkedInCount,
			reviewCount,
			linkedInPercentage,
			githubPercentage,
			reviewsPercentage,
			likesPercentage,
			userPremium,
			userFree,
		}
	} catch (error) {
		console.error('Error fetching dashboard data:', error)
		throw error
	}
}

module.exports = metaDateDashboard
