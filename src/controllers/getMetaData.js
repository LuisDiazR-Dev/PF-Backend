const { User, Plan, Link, Like, Project, Review } = require('../db')
const { fn, col } = require('sequelize')

const metaDateDashboard = async () => {
	try {
		const likeCount = await Like.count()

		const projectsLikes = await Project.count({
			include: [
				{
					model: Like,
					as: 'likes',
					attributes: [],
					required: true,
				},
			],
		})
		const userCount = await User.count()
		const userAdmin = await User.count({
			where: {
				role: 'admin',
			},
		})
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

		const incomeTotal = await User.findAll({
			attributes: [[fn('SUM', col('plan.price')), 'totalPrice']],
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

		const total = incomeTotal[0].totalPrice
		const roundedAverageTotal = total ? parseFloat(total).toFixed(2) : null

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

		const linkedInPercentage = ((linkedInCount / projectsCount) * 100).toFixed()
		const githubPercentage = ((githubCount / userCount) * 100).toFixed()
		const reviewsPercentage = ((reviewCount / projectsCount) * 100).toFixed()
		const likesPercentage = ((projectsLikes / projectsCount) * 100).toFixed(2)

		return {
			userCount,
			userAdmin,
			projectsCount,
			roundedAverageTotal,
			roundedAveragePrice,
			likeCount,
			likesPercentage,
			githubCount,
			linkedInCount,
			reviewCount,
			linkedInPercentage,
			githubPercentage,
			reviewsPercentage,
			userPremium,
			userFree,
		}
	} catch (error) {
		console.error('Error fetching dashboard data:', error)
		throw error
	}
}

module.exports = metaDateDashboard
