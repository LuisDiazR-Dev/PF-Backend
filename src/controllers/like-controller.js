const { Like } = require('../db')

const toggleProjectLikeController = async ({ userId, projectId }) => {
	try {
		const [likedProject, created] = await Like.findOrCreate({
			where: { userId, projectId },
		})

		if (!created) {
			await likedProject.destroy()
			return 'Like removed from project'
		}

		return 'Project liked'
	} catch (error) {
		throw error
	}
}

module.exports = {
	toggleProjectLikeController,
}
