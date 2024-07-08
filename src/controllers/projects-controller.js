const { Project } = require('../db')

const getProjectByIdController = async (id) => {
	try {
		const project = await Project.findByPk(id)
		return project
	} catch (error) {
		throw error
	}
}

module.exports = {
    getProjectByIdController,
}