const { Sequelize, Op } = require('sequelize')
const { Project, Technology } = require('../db')
const AppError = require('../utils')

const getAllProjectsController = async (queries) => {
	const { search, technologies, sort, page = 1, pageSize = 10 } = queries
	let where = {}
	let order = []
	let offset = (page - 1) * pageSize
	let limit = parseInt(pageSize, 10)
	try {
		if (sort === 'a-z') order = [['title', 'ASC']]
		if (sort === 'z-a') order = [['title', 'DESC']]
		if (sort === 'new') order = [['createdAt', 'DESC']]
		if (sort === 'old') order = [['createdAt', 'ASC']]

		if (search)
			where[Op.or] = [
				{ title: { [Op.iLike]: `%${search}%` } },
				Sequelize.where(Sequelize.fn('array_to_string', Sequelize.col('tags'), ','), {
					[Op.iLike]: `%${search}%`,
				}),
			]

		const projects = (
			await Project.findAndCountAll({
				limit,
				offset,
				order,
				where,
				include: {
					model: Technology,
					as: 'technologies',
				},
			})
		).rows.map((project) => project.dataValues)

		if (technologies)
			return projects.filter((project) =>
				technologies
					.split(',')
					.some((technology) => project.technologies.some((t) => t.name === technology))
			)

		return projects
	} catch (error) {
		throw new AppError('Error fetching projects', 500)
	}
}

const getProjectByIdController = async (id) => {
	try {
		const project = await Project.findByPk(id, {
			include: {
				model: Technology,
				as: 'technologies',
			},
		})

		if (!project) throw new AppError(`Project with id ${id} not found`, 404)

		return project
	} catch (error) {
		throw new AppError(`Error fetching project with id ${id}`, 500)
	}
}

const createProjectController = async (projectData, user) => {
	try {
		const { title, description, tags, technologies, image } = projectData
		const [project, created] = await Project.findOrCreate({
			where: { title, userId: user.id },
			defaults: { description, tags, image },
		})
		if (!created) throw new AppError('This project already exists in the database!', 400)
		if (!technologies || technologies.length < 1)
			throw new AppError('Add at least one technology', 400)

		const techNames = technologies.map((tech) => (typeof tech === 'string' ? tech : tech.name))

		const techInstances = await Technology.findAll({ where: { name: techNames } })

		if (techInstances.length !== techNames.length)
			throw new AppError('Some technologies were not found in the database', 400)

		await project.addTechnologies(techInstances)

		return {
			...project.toJSON(),
			technologies: techNames,
		}
	} catch (error) {
		throw new AppError('Error creating a project', 500)
	}
}

const updateProjectController = async (projectData, id) => {
	try {
		const project = await Project.findByPk(id)
		if (!project) throw new AppError('Project not found', 404)

		await Project.update(
			{
				title: projectData.title ?? project.title,
				description: projectData.description ?? project.description,
				tags: projectData.tags ?? project.tags,
				image: projectData.image ?? project.image,
			},
			{ where: { id: id } }
		)

		if (projectData.technologies) {
			const technologies = await Promise.all(
				projectData.technologies.map(async (techName) => {
					const [technology] = await Technology.findOrCreate({
						where: { name: techName },
					})
					return technology
				})
			)
			await project.setTechnologies(technologies)
		}

		const updatedProject = await Project.findByPk(id, {
			include: { model: Technology, as: 'technologies' },
		})

		return updatedProject
	} catch (error) {
		throw new AppError('Error updating project', 500)
	}
}

const deleteProjectController = async (id) => {
	try {
		const project = await Project.findByPk(id)
		if (!project) throw new AppError('Project not found', 404)
		await Project.destroy({ where: { id: id } })
		return 'Project correctly deleted'
	} catch (error) {
		throw new AppError('Error deleting project', 500)
	}
}

module.exports = {
	getAllProjectsController,
	getProjectByIdController,
	createProjectController,
	updateProjectController,
	deleteProjectController,
}
