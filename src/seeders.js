const { User, Project, Technology, Plan, Tag } = require('./db')

const createSeeders = async () => {
	try {
		const [freePlan] = await Plan.findOrCreate({ where: { planName: 'Free', price: 0.0 } })
		const [premiumPlan] = await Plan.findOrCreate({
			where: { planName: 'Premium', price: 10.0 },
		})

		const users = [
			{
				userName: 'JaneSmith456',
				email: 'janesmith@example.com',
				password: 'securePassword!',
				bio: 'UX/UI designer',
				aboutMe:
					'I am a UX/UI designer passionate about creating exceptional digital experiences. My goal is to blend aesthetics and functionality to deliver innovative interface solutions.',
				image:
					'https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671118.jpg?ga=GA1.1.809440281.1720916925',
				planName: premiumPlan.planName,
			},
			{
				userName: 'JohnDoe789',
				email: 'johndoe@example.com',
				password: 'password123',
				bio: 'Fullstack developer',
				aboutMe:
					'Fullstack developer experienced in building complete web applications. I love tackling technical challenges and finding efficient solutions to complex problems.',
				image:
					'https://img.freepik.com/fotos-premium/personaje-dibujos-animados-fondo-azul-generado-ia_1029473-129016.jpg?ga=GA1.1.809440281.1720916925',
				planName: freePlan.planName,
			},
			{
				userName: 'AliceJohnson101',
				email: 'alicejohnson@example.com',
				password: 'alicepassword',
				bio: 'Data scientist',
				aboutMe:
					'Data scientist with a focus on advanced analytics and predictive modeling. My passion is transforming data into actionable insights for informed decision-making.',
				image:
					'https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671138.jpg?ga=GA1.1.809440281.1720916925',
				planName: freePlan.planName,
			},
			{
				userName: 'BobBrown202',
				email: 'bobbrown@example.com',
				password: 'bobbypassword',
				bio: 'Project manager',
				aboutMe:
					'Project manager with experience in leading teams and coordinating resources to deliver projects on time and within budget. I specialize in strategic planning and efficient execution.',
				image:
					'https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671116.jpg?ga=GA1.1.809440281.1720916925',
				planName: freePlan.planName,
			},
			{
				userName: 'CharlieDavis303',
				email: 'charliedavis@example.com',
				password: 'charliedpassword',
				bio: 'Backend developer',
				aboutMe:
					'Backend developer with a strong understanding of system architecture and databases. I am dedicated to building robust and scalable solutions for web applications.',
				image:
					'https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-linea_23-2151303048.jpg?ga=GA1.1.809440281.1720916925',
				planName: freePlan.planName,
			},
			{
				userName: 'DanaEvans404',
				email: 'danaevans@example.com',
				password: 'danapassword',
				bio: 'Graphic designer',
				aboutMe:
					'Creative graphic designer with an eye for detail and a passion for visual design. My goal is to create impactful graphics that effectively communicate messages.',
				image:
					'https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-linea_23-2151303063.jpg?ga=GA1.1.809440281.1720916925',
				planName: freePlan.planName,
			},
			{
				userName: 'EvanGarcia505',
				email: 'evangarcia@example.com',
				password: 'evanpassword',
				bio: 'Marketing specialist',
				aboutMe:
					'Marketing specialist with experience in digital strategies and advertising campaigns. I focus on driving brand growth through innovative marketing techniques.',
				image:
					'https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671122.jpg?ga=GA1.1.809440281.1720916925',
				planName: freePlan.planName,
			},
			{
				userName: 'FionaHarris606',
				email: 'fionaharris@example.com',
				password: 'fionapassword',
				bio: 'Sales manager',
				aboutMe:
					'Sales manager with a focus on maximizing revenue and developing long-term client relationships. My experience centers around sales team management and strategy.',
				image:
					'https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-linea_23-2151303097.jpg?ga=GA1.1.809440281.1720916925',
				planName: freePlan.planName,
			},
			{
				userName: 'GeorgeIbrahim707',
				email: 'georgeibrahim@example.com',
				password: 'georgepassword',
				bio: 'Frontend developer',
				aboutMe:
					'Frontend developer with a strong design sense and solid web technology experience. I specialize in creating intuitive and engaging user interfaces.',
				image:
					'https://img.freepik.com/psd-gratis/render-3d-personaje-avatar_23-2150611765.jpg?ga=GA1.1.809440281.1720916925',
				planName: freePlan.planName,
			},
			{
				userName: 'HannahJackson808',
				email: 'hannahjackson@example.com',
				password: 'hannahpassword',
				bio: 'SEO specialist',
				aboutMe:
					'SEO specialist focused on improving search engine visibility. My passion is helping businesses achieve their organic traffic and online performance goals.',
				image:
					'https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas_23-2149436185.jpg?ga=GA1.1.809440281.1720916925',
				planName: freePlan.planName,
			},
			{
				userName: 'IanKing909',
				email: 'ianking@example.com',
				password: 'ianpassword',
				bio: 'Content writer',
				aboutMe:
					'Content writer with a talent for crafting engaging and persuasive texts. My goal is to communicate ideas clearly and effectively, adapting style to the target audience.',
				image:
					'https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671126.jpg?ga=GA1.1.809440281.1720916925',
				planName: freePlan.planName,
			},
			{
				userName: 'JulieLopez010',
				email: 'julielopez@example.com',
				password: 'juliepassword',
				bio: 'HR manager',
				aboutMe:
					'HR manager with experience in talent management and organizational development. I focus on building effective teams and fostering a positive work environment',
				image:
					'https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671138.jpg?ga=GA1.1.809440281.1720916925',
				planName: freePlan.planName,
			},
			{
				userName: 'KyleMartin111',
				email: 'kylemartin@example.com',
				password: 'kylepassword',
				bio: 'Business analyst',
				aboutMe:
					'Business analyst with a focus on process optimization and data-driven decision making. My goal is to improve efficiency and effectiveness in business operations.',
				image:
					'https://img.freepik.com/fotos-premium/personaje-dibujos-animados-fondo-azul-generado-ia_1029473-129016.jpg?ga=GA1.1.809440281.1720916925',
				planName: freePlan.planName,
			},
			{
				userName: 'LauraNelson212',
				email: 'lauranelson@example.com',
				password: 'laurapassword',
				bio: 'Accountant',
				aboutMe:
					'Accountant with experience in financial management and reporting. I am dedicated to ensuring accuracy and integrity in business finances.',
				image:
					'https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-linea_23-2151303063.jpg?ga=GA1.1.809440281.1720916925',
				planName: freePlan.planName,
			},
			{
				userName: 'MikeOlsen313',
				email: 'mikeolsen@example.com',
				password: 'mikepassword',
				bio: 'Software engineer',
				aboutMe:
					'Software engineer with experience in developing custom software solutions. I enjoy solving complex problems through programming and system engineering.',
				image:
					'https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671159.jpg?ga=GA1.1.809440281.1720916925',
				planName: freePlan.planName,
			},
			{
				userName: 'IvanBell',
				email: 'ivan@bell.com',
				password: 'ivan123',
				bio: 'Software engineer',
				aboutMe:
					'Software engineer with a focus on creating innovative applications and technical management. As an admin, I also oversee system maintenance and integrity',
				image:
					'https://img.freepik.com/psd-premium/3d-render-avatar-dibujos-animados-aislado_570939-51.jpg?ga=GA1.1.809440281.1720916925',
				role: 'admin',
			},
			{
				userName: 'Luis Diaz',
				email: 'luis@diaz.com',
				password: 'luis123',
				bio: 'Accountant',
				aboutMe:
					'Software engineer with a focus on creating innovative applications and technical management. As an admin, I also oversee system maintenance and integrity.',
				image:
					'https://img.freepik.com/psd-gratis/ilustracion-3d-persona-calva-gafas_23-2149436184.jpg?ga=GA1.1.809440281.1720916925',
				role: 'admin',
			},
			{
				userName: 'Gaston Ibarra',
				email: 'gaston@ibarra.com',
				password: 'gaston123',
				bio: 'Business analyst',
				aboutMe:
					'Business analyst with skills in identifying opportunities for improvement and optimization. My administrative role includes overseeing data analysis and business strategy implementation.',
				image:
					'https://img.freepik.com/fotos-premium/personaje-3d-personas-cerca-retrato-sonriendo-bonito-3d-avatar-o-icono_43969-22737.jpg?ga=GA1.1.809440281.1720916925',
				role: 'admin',
			},
			{
				userName: 'Miguel Linares',
				email: 'miguel@linares.com',
				password: 'miguel123',
				bio: 'HR manager',
				aboutMe:
					'HR manager with comprehensive experience in personnel management and organizational development. In my administrative role, I focus on talent strategy and organizational well-being.',
				image:
					'https://img.freepik.com/psd-gratis/ilustracion-3d-persona-gafas-cabeza-medio-rapada_23-2149436187.jpg?ga=GA1.1.809440281.1720916925',
				role: 'admin',
			},
			{
				userName: 'Maria Sol Iha',
				email: 'mariasol@iha.com',
				password: 'marial123',
				bio: 'Content writer',
				aboutMe:
					'Content writer with a passion for creating persuasive and strategic texts. As an admin, I also manage content planning and execution to maximize impact.',
				image:
					'https://img.freepik.com/psd-gratis/render-3d-personaje-avatar_23-2150611716.jpg?ga=GA1.1.809440281.1720916925',
				role: 'admin',
			},
			{
				userName: 'Maximiliano Altamirano',
				email: 'maximiliano@altamirano.com',
				password: 'maximilianol123',
				bio: 'SEO specialist',
				aboutMe:
					'SEO specialist focused on enhancing online presence and search engine performance. In my administrative role, I oversee SEO strategies and content optimizations.',
				image:
					'https://img.freepik.com/fotos-premium/personaje-3d-personas-cerca-retrato-sonriendo-bonito-3d-avatar-o-icono_43969-20056.jpg?ga=GA1.1.809440281.1720916925',
				role: 'admin',
			},
			{
				userName: 'Aldana Delgado',
				email: 'aldana@delgado.com',
				password: 'aldana123',
				bio: 'UI/UX designer',
				aboutMe:
					'UI/UX designer with experience in creating intuitive interfaces and exceptional user experiences. As an admin, I also manage design projects and product development.',
				image:
					'https://img.freepik.com/psd-gratis/3d-ilustracion-persona-cabello-largo_23-2149436197.jpg?ga=GA1.1.809440281.1720916925',
				role: 'admin',
			},
		]

		console.log('Free and premium plans have been added to the database!')

		const createdUsers = await Promise.all(
			users.map(async (user) => {
				const [createdUser] = await User.findOrCreate({
					where: user,
				})
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
					'https://img.freepik.com/vector-gratis/analisis-datos-estadisticos-administracion-financiera-diagrama-circular-segmentos-coloridos-grafico-circular-negocios-estadistica-auditoria-consultoria_335657-2325.jpg?ga=GA1.1.809440281.1720916925&semt=sph',
				technologies: ['Python', 'Django', 'PostgreSQL'],
				userId: createdUsers[1].id,
			},
			{
				title: 'Social Networking Site',
				description: 'A site to connect with friends and family',
				tags: ['social', 'networking', 'community'],
				image:
					'https://img.freepik.com/foto-gratis/papeles-comerciales-naturaleza-muerta-varias-piezas-mecanismo_23-2149352652.jpg?ga=GA1.1.809440281.1720916925&semt=sph',
				technologies: ['Ruby', 'Rails', 'SQLite'],
				userId: createdUsers[2].id,
			},
			{
				title: 'Fitness Tracker',
				description: 'An app to track fitness activities and goals',
				tags: ['fitness', 'health', 'tracking'],
				image:
					'https://img.freepik.com/vector-gratis/ilustracion-concepto-colaboracion_114360-3960.jpg?ga=GA1.1.809440281.1720916925&semt=sph',
				technologies: ['Java', 'Spring Boot', 'MySQL'],
				userId: createdUsers[3].id,
			},
			{
				title: 'Recipe Sharing Platform',
				description: 'A platform to share and discover new recipes',
				tags: ['cooking', 'recipes', 'food'],
				image:
					'https://img.freepik.com/vector-gratis/encabezado-tipografico-desarrollador-frontend-mejora-diseno-interfaz-sitio-web-programacion-pagina-web-codificacion-prueba-profesion-ti-ilustracion-vector-plano-aislado_613284-304.jpg?ga=GA1.1.809440281.1720916925&semt=sph',
				technologies: ['PHP', 'Laravel', 'MongoDB'],
				userId: createdUsers[4].id,
			},
			{
				title: 'Music Streaming Service',
				description: 'A service to stream and discover new music',
				tags: ['music', 'streaming', 'entertainment'],
				image:
					'https://img.freepik.com/fotos-premium/innovaciones-desarrollo-software_810293-130724.jpg?ga=GA1.1.809440281.1720916925&semt=sph',
				technologies: ['Java', 'Spring Boot', 'PostgreSQL'],
				userId: createdUsers[5].id,
			},
			{
				title: 'Weather Forecast App',
				description: 'An app to get the latest weather forecasts',
				tags: ['weather', 'forecast', 'environment'],
				image:
					'https://img.freepik.com/fotos-premium/hombre-que-sostiene-telefono-inteligente-api-interfaz-programacion-aplicaciones-desarrollo-software-tecnologia_220873-5934.jpg?ga=GA1.1.809440281.1720916925&semt=sph',
				technologies: ['JavaScript', 'React', 'Node.js'],
				userId: createdUsers[6].id,
			},
			{
				title: 'Travel Booking Platform',
				description: 'A platform to book travel tickets and accommodations',
				tags: ['travel', 'booking', 'tourism'],
				image:
					'https://img.freepik.com/foto-gratis/concepto-pagina-inicio-barra-busqueda_23-2150040212.jpg?ga=GA1.1.809440281.1720916925&semt=sph',
				technologies: ['Python', 'Django', 'MySQL'],
				userId: createdUsers[7].id,
			},
			{
				title: 'Online Learning Platform',
				description: 'A platform to offer and take online courses',
				tags: ['education', 'learning', 'courses'],
				image:
					'https://img.freepik.com/fotos-premium/empresarios-estan-discutiendo-graficos-informes-analisis-marketing-marketing-digital-e-informacion-graficos-seo-optimizar-marketing-contenido-palabra-clave-investigacion-contenido_36325-4571.jpg?ga=GA1.1.809440281.1720916925&semt=sph',
				technologies: ['Ruby', 'Rails', 'PostgreSQL'],
				userId: createdUsers[8].id,
			},
			{
				title: 'Job Search Website',
				description: 'A website to search and apply for jobs',
				tags: ['jobs', 'career', 'employment'],
				image:
					'https://img.freepik.com/foto-gratis/concepto-collage-html-css-persona_23-2150062004.jpg?ga=GA1.1.809440281.1720916925&semt=ais_user',
				technologies: ['PHP', 'Laravel', 'SQLite'],
				userId: createdUsers[9].id,
			},
			{
				title: 'Online Marketplace',
				description: 'A platform to buy and sell products online',
				tags: ['marketplace', 'shopping', 'sales'],
				image:
					'https://img.freepik.com/foto-gratis/persona-frente-computadora-trabajando-html_23-2150040412.jpg?ga=GA1.1.809440281.1720916925&semt=ais_user',
				technologies: ['JavaScript', 'React', 'Node.js'],
				userId: createdUsers[10].id,
			},
			{
				title: 'Photo Sharing App',
				description: 'An app to share and discover photos',
				tags: ['photos', 'sharing', 'social'],
				image:
					'https://img.freepik.com/foto-gratis/concepto-tecnologia-desarrollador-programacion-aplicaciones-software_53876-120917.jpg?ga=GA1.1.809440281.1720916925&semt=ais_user',
				technologies: ['Python', 'Django', 'PostgreSQL'],
				userId: createdUsers[11].id,
			},
			{
				title: 'Task Management Tool',
				description: 'A tool to manage and organize tasks',
				tags: ['tasks', 'management', 'productivity'],
				image:
					'https://img.freepik.com/fotos-premium/codigo-programacion-desarrollador-software-codigo-script-computadora-abstracto-enfoque-selectivo_372999-11179.jpg?ga=GA1.1.809440281.1720916925&semt=ais_user',
				technologies: ['Ruby', 'Rails', 'MySQL'],
				userId: createdUsers[12].id,
			},
			{
				title: 'Real Estate Platform',
				description: 'A platform to buy, sell, and rent properties',
				tags: ['real estate', 'properties', 'sales'],
				image:
					'https://img.freepik.com/foto-gratis/experiencia-programacion-persona-que-trabaja-codigos-computadora_23-2150010119.jpg?ga=GA1.1.809440281.1720916925&semt=ais_user',
				technologies: ['PHP', 'Laravel', 'PostgreSQL'],
				userId: createdUsers[13].id,
			},
			{
				title: 'Fitness App',
				description: 'An app to track fitness activities and workouts',
				tags: ['fitness', 'health', 'tracking'],
				image:
					'https://img.freepik.com/fotos-premium/redactor-codigo-ide-proyecto-javascript-abierto-usando-reaccionar_673750-294.jpg?ga=GA1.1.809440281.1720916925&semt=ais_user',
				technologies: ['Java', 'Spring Boot', 'MongoDB'],
				userId: createdUsers[14].id,
			},
			{
				title: 'Event Management System',
				description: 'A system to manage and organize events',
				tags: ['events', 'management', 'organization'],
				image:
					'https://img.freepik.com/fotos-premium/primer-plano-senal-informacion_1048944-23817061.jpg?ga=GA1.1.809440281.1720916925&semt=ais_user',
				technologies: ['JavaScript', 'React', 'Node.js'],
				userId: createdUsers[15].id,
			},
			{
				title: 'Online Survey Tool',
				description: 'A tool to create and conduct online surveys',
				tags: ['surveys', 'feedback', 'research'],
				image:
					'https://img.freepik.com/foto-gratis/experiencia-programacion-persona-que-trabaja-codigos-computadora_23-2150010125.jpg?ga=GA1.1.809440281.1720916925&semt=sph',
				technologies: ['Python', 'Django', 'MySQL'],
				userId: createdUsers[16].id,
			},
			{
				title: 'Budget Management App',
				description: 'An app to manage and track budgets',
				tags: ['budget', 'finance', 'tracking'],
				image:
					'https://img.freepik.com/foto-gratis/codigo-programa-computadora_1385-635.jpg?ga=GA1.1.809440281.1720916925&semt=sph',
				technologies: ['Ruby', 'Rails', 'PostgreSQL'],
				userId: createdUsers[17].id,
			},
			{
				title: 'Blog Platform',
				description: 'A platform to create and share blog posts',
				tags: ['blog', 'writing', 'sharing'],
				image:
					'https://img.freepik.com/vector-gratis/ilustracion-concepto-modo-horizontal_114360-5119.jpg?ga=GA1.1.809440281.1720916925&semt=ais_user',
				technologies: ['PHP', 'Laravel', 'SQLite'],
				userId: createdUsers[18].id,
			},
			{
				title: 'Video Streaming Service',
				description: 'A service to stream and watch videos',
				tags: ['video', 'streaming', 'entertainment'],
				image:
					'https://img.freepik.com/fotos-premium/hombre-sostiene-pantalla-tira-video_858586-88.jpg?ga=GA1.1.809440281.1720916925&semt=ais_user',
				technologies: ['JavaScript', 'React', 'Node.js'],
				userId: createdUsers[19].id,
			},
			{
				title: 'Customer Support Chatbot',
				description: 'A chatbot to provide customer support',
				tags: ['chatbot', 'support', 'AI'],
				image:
					'https://img.freepik.com/vector-gratis/ilustracion-concepto-sistema-organizacion_114360-885.jpg?ga=GA1.1.809440281.1720916925&semt=ais_user',
				technologies: ['Python', 'Django', 'PostgreSQL'],
				userId: createdUsers[20].id,
			},
			{
				title: 'Meditation App',
				description: 'An app to guide and track meditation sessions',
				tags: ['meditation', 'health', 'wellness'],
				image:
					'https://img.freepik.com/vector-premium/desarrollador-web-responsive-design_24911-30993.jpg?ga=GA1.1.809440281.1720916925&semt=ais_user',
				technologies: ['Ruby', 'Rails', 'MySQL'],
				userId: createdUsers[1].id,
			},
			{
				title: 'Online Quiz Platform',
				description: 'A platform to create and take quizzes',
				tags: ['quiz', 'education', 'learning'],
				image:
					'https://img.freepik.com/vector-gratis/dibujado-mano-ilustracion-sql-diseno-plano_23-2149245996.jpg?ga=GA1.1.809440281.1720916925&semt=ais_user',
				technologies: ['PHP', 'Laravel', 'PostgreSQL'],
				userId: createdUsers[2].id,
			},
			{
				title: 'Food Delivery App',
				description: 'An app to order food from restaurants',
				tags: ['food', 'delivery', 'ordering'],
				image:
					'https://img.freepik.com/vector-premium/desarrollo-aplicaciones-tecnologicas_88272-5052.jpg?ga=GA1.1.809440281.1720916925&semt=ais_user',
				technologies: ['Java', 'Spring Boot', 'MongoDB'],
				userId: createdUsers[3].id,
			},
			{
				title: 'Language Learning App',
				description: 'An app to learn new languages',
				tags: ['languages', 'education', 'learning'],
				image:
					'https://img.freepik.com/vector-gratis/desarrolladores-software-trabajando-codificacion-scripts-ingeniero-programacion-caracteres-php-python-javascript-otros-lenguajes_90220-243.jpg?ga=GA1.1.809440281.1720916925&semt=ais_user',
				technologies: ['JavaScript', 'React', 'Node.js'],
				userId: createdUsers[4].id,
			},
			{
				title: 'Home Automation System',
				description: 'A system to automate and control home devices',
				tags: ['home', 'automation', 'IoT'],
				image:
					'https://img.freepik.com/vector-gratis/ilustracion-api-diseno-plano-dibujado-mano_23-2149365021.jpg?ga=GA1.1.809440281.1720916925&semt=ais_user',
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

		const tags = [
			'management',
			'productivity',
			'collaboration',
			'e-commerce',
			'sales',
			'shopping',
			'social',
			'networking',
			'community',
			'fitness',
			'health',
			'tracking',
			'cooking',
			'recipes',
			'food',
			'music',
			'streaming',
			'entertainment',
			'weather',
			'forecast',
			'environment',
			'travel',
			'booking',
			'tourism',
			'education',
			'learning',
			'courses',
			'jobs',
			'career',
			'employment',
			'marketplace',
			'photos',
			'sharing',
			'tasks',
			'real estate',
			'properties',
			'events',
			'organization',
			'surveys',
			'feedback',
			'research',
			'budget',
			'finance',
			'blog',
			'writing',
			'video',
			'chatbot',
			'support',
			'AI',
			'meditation',
			'wellness',
			'quiz',
			'delivery',
			'ordering',
			'languages',
			'home',
			'automation',
			'IoT',
		]

		await Promise.all(
			tags.map(async (tag) => {
				await Tag.findOrCreate({
					where: { tagName: tag },
				})
			})
		)
		console.log('All tags have been added to the database')

		for (const projectData of projects) {
			const user = createdUsers.find((u) => u.id === projectData.userId)

			const [newProject, created] = await Project.findOrCreate({
				where: {
					title: projectData.title,
					description: projectData.description,
					image: projectData.image,
					userId: user.id,
				},
			})

			const newTechnologies = await Promise.all(
				projectData.technologies.map(
					async (technology) => (await Technology.findAll({ where: { name: technology } }))[0]
				)
			)

			const newTags = await Promise.all(
				projectData.tags.map(async (tag) => (await Tag.findAll({ where: { tagName: tag } }))[0])
			)

			await newProject.addTechnologies(newTechnologies)
			await newProject.addTags(newTags)
		}

		console.log('Users and Projects alredy created!')
	} catch (error) {
		console.log(error)
	}
}

module.exports = createSeeders