const { User, Project, Technology, Tag, Like } = require('../db')
const { Op } = require('sequelize')
const AppError = require('../utils/index')

const getAllProjectsController = async (queries, user) => {
	const { title, tags, technologies, sort, page = 1, pageSize = 10 } = queries

	let where = {
		deletedAt: null,
	}
	let order = []
	let offset = (page - 1) * parseInt(pageSize, 10)
	let limit = parseInt(pageSize, 10)

	try {
		if (sort === 'a-z') order = [['title', 'ASC']]
		if (sort === 'z-a') order = [['title', 'DESC']]
		if (sort === 'new') order = [['createdAt', 'DESC']]
		if (sort === 'old') order = [['createdAt', 'ASC']]

		if (title) where[Op.or] = [{ title: { [Op.iLike]: `%${title}%` } }]

		const include = [
			{
				model: User,
				as: 'user',
			},
			{
				model: Technology,
				as: 'technologies',
				through: { attributes: [] },
				where: technologies ? { name: { [Op.in]: technologies.split(',') } } : undefined,
				required: !!technologies,
			},
			{
				model: Tag,
				as: 'tags',
				through: { attributes: [] },
				where: tags ? { tagName: { [Op.iLike]: `%${tags.split(',').join('%')}%` } } : undefined,
				required: !!tags,
			},
			{
				model: Like,
				as: 'likes',
				attributes: ['userId'],
				required: false,
			},
		]

		const projectsData = await Project.findAndCountAll({
			limit,
			offset,
			order,
			where,
			include,
		})

		const projects = projectsData.rows.map((project) => {
			if (user)
				return {
					...project.dataValues,
					liked: project.likes.some((like) => like.userId == user.id),
				}
			else {
				return project.dataValues
			}
		})

		return projects
	} catch (error) {
		throw new Error(`Error fetching projects: ${error.message}`)
	}
}

const getProjectByIdController = async (id, user) => {
	try {
		const projectData = await Project.findByPk(id, {
			include: [
				{
					model: User,
					as: 'user',
				},
				{
					model: Technology,
					as: 'technologies',
				},
				{
					model: Tag,
					as: 'tags',
				},
				{
					model: Like,
					as: 'likes',
					attributes: ['userId'],
					required: false,
				},
			],
		})

		if (!projectData) throw new AppError(`Project with id ${id} not found`, 404)

		const project = user
			? {
					...projectData.dataValues,
					liked: projectData.likes.some((like) => like.userId == user.id),
			  }
			: projectData.dataValues
		console.log(project)

		return project
	} catch (error) {
		throw new AppError(`Error fetching project with id ${id}`, 500)
	}
}

const getDeletedProjectsController = async (id, role) => {
	try {
		let whereCondition = { deletedAt: { [Op.not]: null } }

		if (role !== 'admin') {
			whereCondition = { ...whereCondition, userId: id }
		}

		const projects = await Project.findAll({
			where: whereCondition,
			paranoid: false,
			include: [
				{
					model: User,
					as: 'user',
				},
				{
					model: Technology,
					as: 'technologies',
				},
				{
					model: Tag,
					as: 'tags',
				},
				{
					model: Like,
					as: 'likes',
					attributes: ['userId'],
					required: false,
				},
			],
		})

		return projects
	} catch (error) {
		console.error('Error getting deleted projects:', error)
		throw new AppError('Error fetching deleted projects', 500)
	}
}

const getDeletedProjectByIdController = async (id) => {
	try {
		const project = await Project.findOne({
			where: { id },
			paranoid: false,
			include: [
				{
					model: User,
					as: 'user',
				},
				{
					model: Technology,
					as: 'technologies',
				},
				{
					model: Tag,
					as: 'tags',
				},
				{
					model: Like,
					as: 'likes',
					attributes: ['userId'],
					required: false,
				},
			],
		})
		if (!project) throw new AppError('No project found with the given id', 404)

		return project
	} catch (error) {
		throw new AppError('Error fetching deleted project', 500)
	}
}

const createProjectController = async (projectData, user) => {
	try {
		const { title, description, tags, technologies, image } = projectData
		const [project, created] = await Project.findOrCreate({
			where: { title, userId: user.id },
			defaults: { description, image },
		})
		if (!created) throw new AppError('This project already exists in the database!', 400)

		if (technologies) {
			const techNames = technologies.map((tech) => (typeof tech === 'string' ? tech : tech.name))
			const techInstances = await Technology.findAll({ where: { name: techNames } })
			if (techInstances.length !== techNames.length)
				throw new AppError('Some technologies were not found in the database', 400)
			await project.addTechnologies(techInstances)
		}
		if (tags) {
			const tagNames = tags.map((tag) => (typeof tag === 'string' ? tag : tag.tagName))

			const tagInstances = await Tag.findAll({ where: { tagName: tagNames } })

			if (tagInstances.length !== tagNames.length)
				throw new AppError('Some tags were not found in the database', 400)

			await project.addTags(tagInstances)
		}

		return 'Proyecto creado exitosamente'
	} catch (error) {
		console.error(error)
		throw new AppError('Error creating a project', 500)
	}
}

const restoreProjectController = async (id) => {
	try {
		const project = await Project.findOne({
			where: { id: id },
			paranoid: false,
			include: [				
				{
					model: Technology,
					as: 'technologies',
				},
				{
					model: Tag,
					as: 'tags',
				},
				{
					model: Like,
					as: 'likes',
					attributes: ['userId'],
					required: false,
				},
			],
		})

		if (!project) throw new AppError('No deleted project found with the given id', 404)

		await project.restore()

		return { message: 'Project restored successfully' }
	} catch (error) {
		throw new AppError('Error restoring project', 500)
	}
}

const updateProjectController = async (projectData, userId, userRole) => {
	try {
		const project = await Project.findByPk(projectData.id)
		if (!project) throw new AppError('Project not found', 404)

		if (project.userId !== userId && userRole !== 'admin') {
			throw new AppError('You do not have permission to edit this project', 403)
		}

		await project.update({
			title: projectData.title ?? project.title,
			description: projectData.description ?? project.description,
			image: projectData.image ?? project.image,
		})

		if (projectData.tags) {
			const tags = await Promise.all(
				projectData.tags.map(async (tagName) => {
					const [tag] = await Tag.findOrCreate({
						where: { tagName: tagName },
					})
					return tag
				})
			)
			await project.setTags(tags)
		}

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

		const updatedProject = await Project.findByPk(projectData.id, {
			include: [
				{
					model: User,
					as: 'user',
				},
				{
					model: Technology,
					as: 'technologies',
				},
				{
					model: Tag,
					as: 'tags',
				},
				{
					model: Like,
					as: 'likes',
					attributes: ['userId'],
					required: false,
				},
			],
		})

		return updatedProject
	} catch (error) {
		console.error('Error updating project:', error)
		throw new AppError('Error updating project', 500)
	}
}

const deleteProjectController = async (id, user) => {
	try {
		const project = await Project.findByPk(id)
		if (!project) throw new AppError('Project not found', 404)

		if (project.userId !== user.id && user.role !== 'admin') {
			throw new AppError('You are not authorized to delete this project', 403)
		}
		await Project.destroy({ where: { id } })
		return { message: 'Project deleted successfully' }
	} catch (error) {
		throw new AppError(error.message || 'Error deleting project', error.status || 500)
	}
}

module.exports = {
	getAllProjectsController,
	getProjectByIdController,
	createProjectController,
	updateProjectController,
	deleteProjectController,
	restoreProjectController,
	getDeletedProjectsController,
	getDeletedProjectByIdController,
}
