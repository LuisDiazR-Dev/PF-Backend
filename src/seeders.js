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
			{
				userName: 'IvanBell',
				email: 'ivan@bell.com',
				password: 'ivan123',
				bio: 'Software engineer',
				image: 'https://example.com/images/ivanbell.jpg',
				isPremium: true,
				role: 'admin'
			},
			{
				userName: 'Luis Diaz',
				email: 'luis@diaz.com',
				password: 'luis123',
				bio: 'Accountant',
				image: 'https://example.com/images/luisdiaz.jpg',
				isPremium: false,
				role: 'admin'
			},
			{
				userName: 'Gaston Ibarra',
				email: 'gaston@ibarra.com',
				password: 'gaston123',
				bio: 'Business analyst',
				image: 'https://example.com/images/gastonibarra.jpg',
				isPremium: false,
				role: 'admin'
			},
			{
				userName: 'Miguel Linares',
				email: 'miguel@linares.com',
				password: 'miguel123',
				bio: 'HR manager',
				image: 'https://example.com/images/miguellinares.jpg',
				isPremium: false,
				role: 'admin'
			},
			{
				userName: 'Maria Sol Iha',
				email: 'mariasol@iha.com',
				password: 'marial123',
				bio: 'Content writer',
				image: 'https://example.com/images/mariasoliha.jpg',
				isPremium: false,
				role: 'admin'
			},
			{
				userName: 'Maximiliano Altamirano',
				email: 'maximiliano@altamirano.com',
				password: 'maximilianol123',
				bio: 'SEO specialist',
				image: 'https://example.com/images/maxialtamirano.jpg',
				isPremium: false,
				role: 'admin'
			},
			{
				userName: 'Aldana Delgado',
				email: 'aldana@delgado.com',
				password: 'aldana123',
				bio: 'UI/UX designer',
				image: 'https://example.com/images/aldanadelgado.jpg',
				isPremium: false,
				role: 'admin'
			}
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
				image:
					'https://img.freepik.com/foto-gratis/fotografia-lateral-editor-codigo-que-utiliza-react-js_181624-61842.jpg?t=st=1720916999~exp=1720920599~hmac=d8a2806277e04bc4c916f77520e6c8369ee55ab8b14e50b7b9f70ef6f957969e&w=1800',
				technologies: ['JavaScript', 'React', 'Node.js'],
				userId: createdUsers[0].id,
			},
			{
				title: 'E-commerce Platform',
				description: 'A scalable e-commerce platform with multiple features',
				tags: ['e-commerce', 'sales', 'shopping'],
				image:
					'https://img.freepik.com/foto-gratis/fotografia-lateral-editor-codigo-que-utiliza-react-js_181624-61842.jpg?t=st=1720916999~exp=1720920599~hmac=d8a2806277e04bc4c916f77520e6c8369ee55ab8b14e50b7b9f70ef6f957969e&w=1800',
				technologies: ['Python', 'Django', 'PostgreSQL'],
				userId: createdUsers[1].id,
			},
			{
				title: 'Social Networking Site',
				description: 'A site to connect with friends and family',
				tags: ['social', 'networking', 'community'],
				image:
					'https://img.freepik.com/foto-gratis/fotografia-lateral-editor-codigo-que-utiliza-react-js_181624-61842.jpg?t=st=1720916999~exp=1720920599~hmac=d8a2806277e04bc4c916f77520e6c8369ee55ab8b14e50b7b9f70ef6f957969e&w=1800',
				technologies: ['Ruby', 'Rails', 'SQLite'],
				userId: createdUsers[2].id,
			},
			{
				title: 'Fitness Tracker',
				description: 'An app to track fitness activities and goals',
				tags: ['fitness', 'health', 'tracking'],
				image:
					'https://img.freepik.com/foto-gratis/fotografia-lateral-editor-codigo-que-utiliza-react-js_181624-61842.jpg?t=st=1720916999~exp=1720920599~hmac=d8a2806277e04bc4c916f77520e6c8369ee55ab8b14e50b7b9f70ef6f957969e&w=1800',
				technologies: ['Java', 'Spring Boot', 'MySQL'],
				userId: createdUsers[3].id,
			},
			{
				title: 'Recipe Sharing Platform',
				description: 'A platform to share and discover new recipes',
				tags: ['cooking', 'recipes', 'food'],
				image:
					'https://img.freepik.com/foto-gratis/fotografia-lateral-editor-codigo-que-utiliza-react-js_181624-61842.jpg?t=st=1720916999~exp=1720920599~hmac=d8a2806277e04bc4c916f77520e6c8369ee55ab8b14e50b7b9f70ef6f957969e&w=1800',
				technologies: ['PHP', 'Laravel', 'MongoDB'],
				userId: createdUsers[4].id,
			},
			{
				title: 'Music Streaming Service',
				description: 'A service to stream and discover new music',
				tags: ['music', 'streaming', 'entertainment'],
				image:
					'https://img.freepik.com/foto-gratis/fotografia-lateral-editor-codigo-que-utiliza-react-js_181624-61842.jpg?t=st=1720916999~exp=1720920599~hmac=d8a2806277e04bc4c916f77520e6c8369ee55ab8b14e50b7b9f70ef6f957969e&w=1800',
				technologies: ['Java', 'Spring Boot', 'PostgreSQL'],
				userId: createdUsers[5].id,
			},
			{
				title: 'Weather Forecast App',
				description: 'An app to get the latest weather forecasts',
				tags: ['weather', 'forecast', 'environment'],
				image:
					'https://img.freepik.com/foto-gratis/fotografia-lateral-editor-codigo-que-utiliza-react-js_181624-61842.jpg?t=st=1720916999~exp=1720920599~hmac=d8a2806277e04bc4c916f77520e6c8369ee55ab8b14e50b7b9f70ef6f957969e&w=1800',
				technologies: ['JavaScript', 'React', 'Node.js'],
				userId: createdUsers[6].id,
			},
			{
				title: 'Travel Booking Platform',
				description: 'A platform to book travel tickets and accommodations',
				tags: ['travel', 'booking', 'tourism'],
				image:
					'https://img.freepik.com/foto-gratis/fotografia-lateral-editor-codigo-que-utiliza-react-js_181624-61842.jpg?t=st=1720916999~exp=1720920599~hmac=d8a2806277e04bc4c916f77520e6c8369ee55ab8b14e50b7b9f70ef6f957969e&w=1800',
				technologies: ['Python', 'Django', 'MySQL'],
				userId: createdUsers[7].id,
			},
			{
				title: 'Online Learning Platform',
				description: 'A platform to offer and take online courses',
				tags: ['education', 'learning', 'courses'],
				image:
					'https://img.freepik.com/foto-gratis/fotografia-lateral-editor-codigo-que-utiliza-react-js_181624-61842.jpg?t=st=1720916999~exp=1720920599~hmac=d8a2806277e04bc4c916f77520e6c8369ee55ab8b14e50b7b9f70ef6f957969e&w=1800',
				technologies: ['Ruby', 'Rails', 'PostgreSQL'],
				userId: createdUsers[8].id,
			},
			{
				title: 'Job Search Website',
				description: 'A website to search and apply for jobs',
				tags: ['jobs', 'career', 'employment'],
				image:
					'https://img.freepik.com/foto-gratis/fotografia-lateral-editor-codigo-que-utiliza-react-js_181624-61842.jpg?t=st=1720916999~exp=1720920599~hmac=d8a2806277e04bc4c916f77520e6c8369ee55ab8b14e50b7b9f70ef6f957969e&w=1800',
				technologies: ['PHP', 'Laravel', 'SQLite'],
				userId: createdUsers[9].id,
			},
			{
				title: 'Online Marketplace',
				description: 'A platform to buy and sell products online',
				tags: ['marketplace', 'shopping', 'sales'],
				image:
					'https://img.freepik.com/foto-gratis/fotografia-lateral-editor-codigo-que-utiliza-react-js_181624-61842.jpg?t=st=1720916999~exp=1720920599~hmac=d8a2806277e04bc4c916f77520e6c8369ee55ab8b14e50b7b9f70ef6f957969e&w=1800',
				technologies: ['JavaScript', 'React', 'Node.js'],
				userId: createdUsers[10].id,
			},
			{
				title: 'Photo Sharing App',
				description: 'An app to share and discover photos',
				tags: ['photos', 'sharing', 'social'],
				image:
					'https://img.freepik.com/foto-gratis/fotografia-lateral-editor-codigo-que-utiliza-react-js_181624-61842.jpg?t=st=1720916999~exp=1720920599~hmac=d8a2806277e04bc4c916f77520e6c8369ee55ab8b14e50b7b9f70ef6f957969e&w=1800',
				technologies: ['Python', 'Django', 'PostgreSQL'],
				userId: createdUsers[11].id,
			},
			{
				title: 'Task Management Tool',
				description: 'A tool to manage and organize tasks',
				tags: ['tasks', 'management', 'productivity'],
				image:
					'https://img.freepik.com/foto-gratis/fotografia-lateral-editor-codigo-que-utiliza-react-js_181624-61842.jpg?t=st=1720916999~exp=1720920599~hmac=d8a2806277e04bc4c916f77520e6c8369ee55ab8b14e50b7b9f70ef6f957969e&w=1800',
				technologies: ['Ruby', 'Rails', 'MySQL'],
				userId: createdUsers[12].id,
			},
			{
				title: 'Real Estate Platform',
				description: 'A platform to buy, sell, and rent properties',
				tags: ['real estate', 'properties', 'sales'],
				image:
					'https://img.freepik.com/foto-gratis/fotografia-lateral-editor-codigo-que-utiliza-react-js_181624-61842.jpg?t=st=1720916999~exp=1720920599~hmac=d8a2806277e04bc4c916f77520e6c8369ee55ab8b14e50b7b9f70ef6f957969e&w=1800',
				technologies: ['PHP', 'Laravel', 'PostgreSQL'],
				userId: createdUsers[13].id,
			},
			{
				title: 'Fitness App',
				description: 'An app to track fitness activities and workouts',
				tags: ['fitness', 'health', 'tracking'],
				image:
					'https://img.freepik.com/foto-gratis/fotografia-lateral-editor-codigo-que-utiliza-react-js_181624-61842.jpg?t=st=1720916999~exp=1720920599~hmac=d8a2806277e04bc4c916f77520e6c8369ee55ab8b14e50b7b9f70ef6f957969e&w=1800',
				technologies: ['Java', 'Spring Boot', 'MongoDB'],
				userId: createdUsers[14].id,
			},
			{
				title: 'Event Management System',
				description: 'A system to manage and organize events',
				tags: ['events', 'management', 'organization'],
				image:
					'https://img.freepik.com/foto-gratis/fotografia-lateral-editor-codigo-que-utiliza-react-js_181624-61842.jpg?t=st=1720916999~exp=1720920599~hmac=d8a2806277e04bc4c916f77520e6c8369ee55ab8b14e50b7b9f70ef6f957969e&w=1800',
				technologies: ['JavaScript', 'React', 'Node.js'],
				userId: createdUsers[15].id,
			},
			{
				title: 'Online Survey Tool',
				description: 'A tool to create and conduct online surveys',
				tags: ['surveys', 'feedback', 'research'],
				image:
					'https://img.freepik.com/foto-gratis/fotografia-lateral-editor-codigo-que-utiliza-react-js_181624-61842.jpg?t=st=1720916999~exp=1720920599~hmac=d8a2806277e04bc4c916f77520e6c8369ee55ab8b14e50b7b9f70ef6f957969e&w=1800',
				technologies: ['Python', 'Django', 'MySQL'],
				userId: createdUsers[16].id,
			},
			{
				title: 'Budget Management App',
				description: 'An app to manage and track budgets',
				tags: ['budget', 'finance', 'tracking'],
				image:
					'https://img.freepik.com/foto-gratis/fotografia-lateral-editor-codigo-que-utiliza-react-js_181624-61842.jpg?t=st=1720916999~exp=1720920599~hmac=d8a2806277e04bc4c916f77520e6c8369ee55ab8b14e50b7b9f70ef6f957969e&w=1800',
				technologies: ['Ruby', 'Rails', 'PostgreSQL'],
				userId: createdUsers[17].id,
			},
			{
				title: 'Blog Platform',
				description: 'A platform to create and share blog posts',
				tags: ['blog', 'writing', 'sharing'],
				image:
					'https://img.freepik.com/foto-gratis/fotografia-lateral-editor-codigo-que-utiliza-react-js_181624-61842.jpg?t=st=1720916999~exp=1720920599~hmac=d8a2806277e04bc4c916f77520e6c8369ee55ab8b14e50b7b9f70ef6f957969e&w=1800',
				technologies: ['PHP', 'Laravel', 'SQLite'],
				userId: createdUsers[18].id,
			},
			{
				title: 'Video Streaming Service',
				description: 'A service to stream and watch videos',
				tags: ['video', 'streaming', 'entertainment'],
				image:
					'https://img.freepik.com/foto-gratis/fotografia-lateral-editor-codigo-que-utiliza-react-js_181624-61842.jpg?t=st=1720916999~exp=1720920599~hmac=d8a2806277e04bc4c916f77520e6c8369ee55ab8b14e50b7b9f70ef6f957969e&w=1800',
				technologies: ['JavaScript', 'React', 'Node.js'],
				userId: createdUsers[19].id,
			},
			{
				title: 'Customer Support Chatbot',
				description: 'A chatbot to provide customer support',
				tags: ['chatbot', 'support', 'AI'],
				image:
					'https://img.freepik.com/foto-gratis/fotografia-lateral-editor-codigo-que-utiliza-react-js_181624-61842.jpg?t=st=1720916999~exp=1720920599~hmac=d8a2806277e04bc4c916f77520e6c8369ee55ab8b14e50b7b9f70ef6f957969e&w=1800',
				technologies: ['Python', 'Django', 'PostgreSQL'],
				userId: createdUsers[20].id,
			},
			{
				title: 'Meditation App',
				description: 'An app to guide and track meditation sessions',
				tags: ['meditation', 'health', 'wellness'],
				image:
					'https://img.freepik.com/foto-gratis/fotografia-lateral-editor-codigo-que-utiliza-react-js_181624-61842.jpg?t=st=1720916999~exp=1720920599~hmac=d8a2806277e04bc4c916f77520e6c8369ee55ab8b14e50b7b9f70ef6f957969e&w=1800',
				technologies: ['Ruby', 'Rails', 'MySQL'],
				userId: createdUsers[1].id,
			},
			{
				title: 'Online Quiz Platform',
				description: 'A platform to create and take quizzes',
				tags: ['quiz', 'education', 'learning'],
				image:
					'https://img.freepik.com/foto-gratis/fotografia-lateral-editor-codigo-que-utiliza-react-js_181624-61842.jpg?t=st=1720916999~exp=1720920599~hmac=d8a2806277e04bc4c916f77520e6c8369ee55ab8b14e50b7b9f70ef6f957969e&w=1800',
				technologies: ['PHP', 'Laravel', 'PostgreSQL'],
				userId: createdUsers[2].id,
			},
			{
				title: 'Food Delivery App',
				description: 'An app to order food from restaurants',
				tags: ['food', 'delivery', 'ordering'],
				image:
					'https://img.freepik.com/foto-gratis/fotografia-lateral-editor-codigo-que-utiliza-react-js_181624-61842.jpg?t=st=1720916999~exp=1720920599~hmac=d8a2806277e04bc4c916f77520e6c8369ee55ab8b14e50b7b9f70ef6f957969e&w=1800',
				technologies: ['Java', 'Spring Boot', 'MongoDB'],
				userId: createdUsers[3].id,
			},
			{
				title: 'Language Learning App',
				description: 'An app to learn new languages',
				tags: ['languages', 'education', 'learning'],
				image:
					'https://img.freepik.com/foto-gratis/fotografia-lateral-editor-codigo-que-utiliza-react-js_181624-61842.jpg?t=st=1720916999~exp=1720920599~hmac=d8a2806277e04bc4c916f77520e6c8369ee55ab8b14e50b7b9f70ef6f957969e&w=1800',
				technologies: ['JavaScript', 'React', 'Node.js'],
				userId: createdUsers[4].id,
			},
			{
				title: 'Home Automation System',
				description: 'A system to automate and control home devices',
				tags: ['home', 'automation', 'IoT'],
				image:
					'https://img.freepik.com/foto-gratis/fotografia-lateral-editor-codigo-que-utiliza-react-js_181624-61842.jpg?t=st=1720916999~exp=1720920599~hmac=d8a2806277e04bc4c916f77520e6c8369ee55ab8b14e50b7b9f70ef6f957969e&w=1800',
				technologies: ['Python', 'Django', 'MySQL'],
				userId: createdUsers[5].id,
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
