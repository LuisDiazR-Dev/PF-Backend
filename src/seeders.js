const { User, Project, Technology } = require('./db')

const createSeeders = async () => {
	try {
		const users = [
			{
				userName: 'JaneSmith456',
				email: 'janesmith@example.com',
				password: 'securePassword!',
				bio: 'UX/UI designer',
				image: 'https://example.com/images/janesmith.jpg',
				isPremium: false,
			},
			{
				userName: 'JohnDoe789',
				email: 'johndoe@example.com',
				password: 'password123',
				bio: 'Fullstack developer',
				image: 'https://example.com/images/johndoe.jpg',
				isPremium: true,
			},
			{
				userName: 'AliceJohnson101',
				email: 'alicejohnson@example.com',
				password: 'alicepassword',
				bio: 'Data scientist',
				image: 'https://example.com/images/alicejohnson.jpg',
				isPremium: true,
			},
			{
				userName: 'BobBrown202',
				email: 'bobbrown@example.com',
				password: 'bobbypassword',
				bio: 'Project manager',
				image: 'https://example.com/images/bobbrown.jpg',
				isPremium: false,
			},
			{
				userName: 'CharlieDavis303',
				email: 'charliedavis@example.com',
				password: 'charliedpassword',
				bio: 'Backend developer',
				image: 'https://example.com/images/charliedavis.jpg',
				isPremium: true,
			},
			{
				userName: 'DanaEvans404',
				email: 'danaevans@example.com',
				password: 'danapassword',
				bio: 'Graphic designer',
				image: 'https://example.com/images/danaevans.jpg',
				isPremium: false,
			},
			{
				userName: 'EvanGarcia505',
				email: 'evangarcia@example.com',
				password: 'evanpassword',
				bio: 'Marketing specialist',
				image: 'https://example.com/images/evangarcia.jpg',
				isPremium: false,
			},
			{
				userName: 'FionaHarris606',
				email: 'fionaharris@example.com',
				password: 'fionapassword',
				bio: 'Sales manager',
				image: 'https://example.com/images/fionaharris.jpg',
				isPremium: true,
			},
			{
				userName: 'GeorgeIbrahim707',
				email: 'georgeibrahim@example.com',
				password: 'georgepassword',
				bio: 'Frontend developer',
				image: 'https://example.com/images/georgeibrahim.jpg',
				isPremium: false,
			},
			{
				userName: 'HannahJackson808',
				email: 'hannahjackson@example.com',
				password: 'hannahpassword',
				bio: 'SEO specialist',
				image: 'https://example.com/images/hannahjackson.jpg',
				isPremium: true,
			},
			{
				userName: 'IanKing909',
				email: 'ianking@example.com',
				password: 'ianpassword',
				bio: 'Content writer',
				image: 'https://example.com/images/ianking.jpg',
				isPremium: true,
			},
			{
				userName: 'JulieLopez010',
				email: 'julielopez@example.com',
				password: 'juliepassword',
				bio: 'HR manager',
				image: 'https://example.com/images/julielopez.jpg',
				isPremium: false,
			},
			{
				userName: 'KyleMartin111',
				email: 'kylemartin@example.com',
				password: 'kylepassword',
				bio: 'Business analyst',
				image: 'https://example.com/images/kylemartin.jpg',
				isPremium: false,
			},
			{
				userName: 'LauraNelson212',
				email: 'lauranelson@example.com',
				password: 'laurapassword',
				bio: 'Accountant',
				image: 'https://example.com/images/lauranelson.jpg',
				isPremium: true,
			},
			{
				userName: 'MikeOlsen313',
				email: 'mikeolsen@example.com',
				password: 'mikepassword',
				bio: 'Software engineer',
				image: 'https://example.com/images/mikeolsen.jpg',
				isPremium: true,
			},
		]

		const createdUsers = await Promise.all(
			users.map(async (user) => {
				const [createdUser] = await User.findOrCreate({ where: user })
				return createdUser
			})
		)

		const projects = [
			{
				title: 'Project Management App',
				description: 'An app to manage programming projects effectively',
				tags: ['management', 'productivity', 'collaboration'],
				image: 'https://example.com/images/project-management-app.jpg',
				technologies: ['JavaScript', 'React', 'Node.js'],
				userId: createdUsers[0].id,
			},
			{
				title: 'E-commerce Platform',
				description: 'A scalable e-commerce platform with multiple features',
				tags: ['e-commerce', 'sales', 'shopping'],
				image: 'https://example.com/images/e-commerce-platform.jpg',
				technologies: ['Python', 'Django', 'PostgreSQL'],
				userId: createdUsers[1].id,
			},
			{
				title: 'Social Networking Site',
				description: 'A site to connect with friends and family',
				tags: ['social', 'networking', 'community'],
				image: 'https://example.com/images/social-networking-site.jpg',
				technologies: ['Ruby', 'Rails', 'SQLite'],
				userId: createdUsers[2].id,
			},
			{
				title: 'Fitness Tracker',
				description: 'An app to track fitness activities and goals',
				tags: ['fitness', 'health', 'tracking'],
				image: 'https://example.com/images/fitness-tracker.jpg',
				technologies: ['Java', 'Spring Boot', 'MySQL'],
				userId: createdUsers[3].id,
			},
			{
				title: 'Recipe Sharing Platform',
				description: 'A platform to share and discover new recipes',
				tags: ['cooking', 'recipes', 'food'],
				image: 'https://example.com/images/recipe-sharing-platform.jpg',
				technologies: ['PHP', 'Laravel', 'MongoDB'],
				userId: createdUsers[4].id,
			},
		]

		const technologies = [
			'MongoDB',
			'Spring Boot',
			'MySQL',
			'Laravel',
			'Django',
			'Node.js',
			'JavaScript',
			'Python',
			'Java',
			'C#',
			'C++',
			'Ruby',
			'PHP',
			'Swift',
			'TypeScript',
			'Go',
			'Kotlin',
			'Rust',
			'Scala',
			'Objective-C',
			'Perl',
			'R',
			'Dart',
			'Elixir',
			'Haskell',
			'Lua',
			'MATLAB',
			'Clojure',
			'Shell',
			'SQL',
			'HTML',
			'CSS',
			'Sass',
			'Less',
			'XML',
			'JSON',
			'YAML',
			'Markdown',
			'GraphQL',
			'PL/SQL',
			'Transact-SQL',
			'VHDL',
			'Verilog',
			'Assembly',
			'Fortran',
			'COBOL',
			'Pascal',
			'Ada',
			'Lisp',
			'Scheme',
			'F#',
			'VB.NET',
			'Groovy',
			'Crystal',
			'Nim',
			'React',
			'PostgreSQL',
			'Rails',
			'SQLite',
		]

		await Promise.all(
			technologies.map(async (tech) => {
				await Technology.findOrCreate({
					where: { name: tech },
				})
			})
		)
		console.log('All technologies have been added to the database.')

		for (const projectData of projects) {
			const user = createdUsers.find((u) => u.id === projectData.userId)

			const [newProject, created] = await Project.findOrCreate({
				where: {
					title: projectData.title,
					description: projectData.description,
					tags: projectData.tags,
					image: projectData.image,
					userId: user.id,
				},
			})

			const newTechnologies = await Promise.all(
				projectData.technologies.map(
					async (technology) => (await Technology.findAll({ where: { name: technology } }))[0]
				)
			)

			if (!created) await newProject.addTechnologies(newTechnologies)
		}

		console.log('Users and Projects alredy created!')
	} catch (error) {
		console.log(error)
	}
}

module.exports = createSeeders
