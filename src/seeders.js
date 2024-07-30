const { User, Project, Tag, Plan, Technology, Link } = require('./db')
const bcrypt = require('bcrypt')
const users = require('./_db/users')
const projects = require('./_db/projects')
const technologies = require('./_db/technologies')
const plans = require('./_db/plans')

const hashPasswords = async (users) => {
	return await Promise.all(
		users.map(async (user) => {
			const hashedPassword = await bcrypt.hash(user.password, 10)
			return { ...user, password: hashedPassword }
		})
	)
}

const createSeeders = async () => {
	try {
		// Creación de planes
		await Promise.all(plans.map(async (plan) => await Plan.findOrCreate({ where: plan })))
		console.log('Free and premium plans have been added to the database!')

		// Hashear contraseñas de los usuarios
		const usersWithHashedPasswords = await hashPasswords(users)

		// Creación de usuarios
		const createdUsers = await Promise.all(
			usersWithHashedPasswords.map(async (user) => {
				try {
					const { links, email, ...userData } = user
					const [createdUser, created] = await User.findOrCreate({
						where: { email },
						defaults: userData,
					})

					if (links && created) {
						await Promise.all(
							links.map(async (link) => {
								if (createdUser.id) {
									await Link.findOrCreate({
										where: {
											name: link.name,
											url: link.url,
											userId: createdUser.id,
										},
									})
								} else {
									console.error(`No user ID found for user: ${user.email}`)
								}
							})
						)
					}
					return createdUser
				} catch (error) {
					console.error(error)
				}
			})
		)

		// Creación de tecnologías
		const createdTechnologies = await Promise.all(
			technologies.map(async (techName) => {
				const [createdTech] = await Technology.findOrCreate({ where: { name: techName } })
				return createdTech
			})
		)

		// Creación de proyectos
		for (const projectData of projects) {
			const user = createdUsers.find((u) => u.email === projectData.email)
			if (!user) {
				console.error(`User not found: ${projectData.title}`)
				continue
			}

			const [newProject, created] = await Project.findOrCreate({
				where: {
					title: projectData.title,
					description: projectData.description,
					image: projectData.image,
					userId: user.id,
				},
			})

			// Creación de tags
			const projectTags = await Promise.all(
				projectData.tags.map(async (tagName) => {
					const [createdTag] = await Tag.findOrCreate({ where: { tagName } })
					return createdTag
				})
			)
			await newProject.setTags(projectTags)

			// Creación de tecnologías
			const projectTechnologies = await Promise.all(
				projectData.technologies.map(async (techName) => {
					const [createdTech] = await Technology.findOrCreate({ where: { name: techName } })
					return createdTech
				})
			)
			await newProject.setTechnologies(projectTechnologies)
		}
		console.log('All projects have been added to the database!')
		console.log('Users alredy created!')
	} catch (error) {
		console.error('Error creating seed data:', error)
	}
}

module.exports = createSeeders
