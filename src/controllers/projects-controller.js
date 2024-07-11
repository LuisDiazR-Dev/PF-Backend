const { Sequelize, Op } = require('sequelize')
const { Project, Technology } = require('../db')

const getAllProjectsController = async (search, technology) => {
	let where = {
		// ...(title !== undefined && { title: title }),
		// ...(tags !== undefined && { tags: tags }),
		// ...(technology !== undefined && { technology: technology }),
	}
	try {
		if (search)
			where[Op.or] = [
				{ title: { [Op.iLike]: `%${search}%` } },
				Sequelize.where(Sequelize.fn('array_to_string', Sequelize.col('tags'), ','), {
					[Op.iLike]: `%${search}%`,
				}),
			]

		const projects = await Project.findAll({
			where,
			include: {
				model: Technology,
				as: 'technologies',
			},
		})
		
		if (technology)
			return projects.filter((project) =>
				project.technologies.filter((technology) => technology.name === technology)
			)
		return projects
	} catch (error) {
		console.error('Error fetching projects:', error)
		throw new Error('Error fetching projects')
	}
}

const getProjectByIdController = async (id) => {
	try {
		const project = await Project.findByPk(id)
		return project
	} catch (error) {
		throw error
	}
}

const createProjectController = async (title, description, tags, technology, image) => {
	try {
		const [project, created] = await Project.findOrCreate({
			where: {
				title,
				description,
				tags,
				technology,
				image,
			},
		})
		if (!created) throw new Error('This project already exists in DB!')

		return project
	} catch (error) {
		console.error('Error creating a project', error)
	}
}

module.exports = {
	getAllProjectsController,
	getProjectByIdController,
	createProjectController,
}
