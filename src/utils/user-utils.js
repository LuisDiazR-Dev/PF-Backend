const { Project, Technology, Tag, Contract, Plan, Link } = require('../db')
const { Op } = require('sequelize')

const getUserIncludes = (queries = {}) => {
	let includes = [
		{
			model: Project,
			as: 'projects',
			include: [
				{
					model: Technology,
					as: 'technologies',
				},
				{
					model: Tag,
					as: 'tags',
				},
			],
		},
		{
			model: Contract,
			as: 'sentContracts',
		},
		{
			model: Contract,
			as: 'receivedContracts',
		},
		{
			model: Plan,
			as: 'plan',
		},
		{
			model: Link,
			as: 'links',
		},
	]

	if (queries.exclude) {
		const excludeModels = queries.exclude.split(',')
		includes = includes.filter((include) => !excludeModels.includes(include.as))
	}

	if (queries.technologies) {
		const technologyInclude = includes.find((include) => include.as === 'technologies')
		if (technologyInclude) {
			technologyInclude.where = { name: { [Op.in]: queries.technologies.split(',') } }
		}
	}

	if (queries.tags) {
		const tagInclude = includes.find((include) => include.as === 'tags')
		if (tagInclude) {
			tagInclude.where = { tagName: { [Op.iLike]: `%${queries.tags.split(',').join('%')}%` } }
		}
	}

	return includes
}

module.exports = {
	getUserIncludes,
}
