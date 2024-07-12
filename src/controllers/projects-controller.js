const { Sequelize, Op } = require('sequelize')
const { Project, Technology } = require('../db')

const getAllProjectsController = async (search, technologies) => {
	let where = {}
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

		if (technologies) {
			return projects.filter((project) =>
				technologies
					.split(',')
					.some((technology) => project.technologies.some((t) => t.name === technology))
			)
		}
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

const createProjectController = async (title, description, tags, technologies, image, user) => {
	console.log(user)
	try {
		const [project, created] = await Project.findOrCreate({
			where: {
				title,
				userId: user.id,
			},
			defaults: {
				description,
				tags,
				image,
			},
		})
		if (!created) throw new Error('This project already exists in DB!')
		if (!technologies || technologies.length < 1) throw new Error('Add at least 1 technology')

		const techNames = technologies.map((tech) => (typeof tech === 'string' ? tech : tech.name))

		const techInstances = await Technology.findAll({
			where: { name: techNames },
		})

		if (techInstances.length !== techNames.length) {
			throw new Error('Some technologies were not found in the DB')
		}

		await project.addTechnologies(techInstances)

		return {
			...project.toJSON(),
			technologies: techNames,
		}
	} catch (error) {
		console.error('Error creating a project', error)
	}
}

module.exports = {
	getAllProjectsController,
	getProjectByIdController,
	createProjectController,
}
