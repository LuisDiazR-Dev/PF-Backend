const { Project } = require('../db')

const createProject = async (title, description, tags, technology, image) => {
    try {
		const [project, created] = await Project.findOrCreate({
			where: {
				title,
				description,
				tags,
				technology,
				image
			}
		})
		if (!created) throw new Error('This project already exists in DB!')
		
		return project
    } catch (error) {
        console.error("Error creating a project", error)
    }
}

module.exports = createProject;