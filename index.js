const { User, Project } = require('./src/db.js')
const server = require('./src/app.js')
const { conn } = require('./src/db.js')
const PORT = 3001

const createAllUser = async () => {
	try {
		await User.bulkCreate([
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
		])

		await Project.bulkCreate([
			{
				title: 'Project Management App',
				description: 'An app to manage programming projects effectively',
				tags: ['management', 'productivity', 'collaboration'],
				languages: ['JavaScript', 'React', 'Node.js'],
				image: 'https://example.com/images/project-management-app.jpg',
			},
			{
				title: 'E-commerce Platform',
				description: 'A platform to buy and sell products online',
				tags: ['e-commerce', 'sales', 'online shopping'],
				languages: ['Python', 'Django', 'JavaScript'],
				image: 'https://example.com/images/e-commerce-platform.jpg',
			},
			{
				title: 'Social Media Network',
				description: 'A social network to connect with friends and family',
				tags: ['social', 'networking', 'friends'],
				languages: ['Ruby', 'Rails', 'JavaScript'],
				image: 'https://example.com/images/social-media-network.jpg',
			},
			{
				title: 'Fitness Tracker',
				description: 'An app to track your fitness and workouts',
				tags: ['fitness', 'health', 'workout'],
				languages: ['Java', 'Android', 'Kotlin'],
				image: 'https://example.com/images/fitness-tracker.jpg',
			},
			{
				title: 'Online Learning Platform',
				description: 'A platform to take online courses and earn certificates',
				tags: ['education', 'learning', 'courses'],
				languages: ['PHP', 'Laravel', 'JavaScript'],
				image: 'https://example.com/images/online-learning-platform.jpg',
			},
			{
				title: 'Recipe Sharing App',
				description: 'An app to share and discover new recipes',
				tags: ['cooking', 'recipes', 'food'],
				languages: ['Swift', 'iOS', 'Objective-C'],
				image: 'https://example.com/images/recipe-sharing-app.jpg',
			},
			{
				title: 'Travel Booking App',
				description: 'An app to book flights and hotels',
				tags: ['travel', 'booking', 'flights'],
				languages: ['JavaScript', 'Angular', 'Node.js'],
				image: 'https://example.com/images/travel-booking-app.jpg',
			},
			{
				title: 'Financial Tracker',
				description: 'An app to track your personal finances',
				tags: ['finance', 'budgeting', 'tracking'],
				languages: ['Java', 'Spring Boot', 'JavaScript'],
				image: 'https://example.com/images/financial-tracker.jpg',
			},
			{
				title: 'Job Search Platform',
				description: 'A platform to find and apply for jobs',
				tags: ['jobs', 'career', 'employment'],
				languages: ['JavaScript', 'Vue.js', 'Node.js'],
				image: 'https://example.com/images/job-search-platform.jpg',
			},
			{
				title: 'Event Management App',
				description: 'An app to manage and schedule events',
				tags: ['events', 'scheduling', 'management'],
				languages: ['Python', 'Flask', 'JavaScript'],
				image: 'https://example.com/images/event-management-app.jpg',
			},
			{
				title: 'Music Streaming Service',
				description: 'A service to stream and discover new music',
				tags: ['music', 'streaming', 'audio'],
				languages: ['Go', 'React', 'JavaScript'],
				image: 'https://example.com/images/music-streaming-service.jpg',
			},
			{
				title: 'News Aggregator',
				description: 'An app to aggregate news from various sources',
				tags: ['news', 'aggregator', 'media'],
				languages: ['Ruby', 'Rails', 'JavaScript'],
				image: 'https://example.com/images/news-aggregator.jpg',
			},
			{
				title: 'Virtual Reality Game',
				description: 'A virtual reality game for immersive experiences',
				tags: ['gaming', 'VR', 'entertainment'],
				languages: ['C#', 'Unity', 'JavaScript'],
				image: 'https://example.com/images/virtual-reality-game.jpg',
			},
			{
				title: 'Online Marketplace',
				description: 'A marketplace to buy and sell various products',
				tags: ['marketplace', 'buying', 'selling'],
				languages: ['Node.js', 'Express', 'React'],
				image: 'https://example.com/images/online-marketplace.jpg',
			},
			{
				title: 'Photo Editing App',
				description: 'An app to edit and enhance photos',
				tags: ['photo', 'editing', 'images'],
				languages: ['Swift', 'iOS', 'JavaScript'],
				image: 'https://example.com/images/photo-editing-app.jpg',
			},
		])
	} catch (error) {
		console.log(error)
	}
}

conn
	.sync({ force: true })
	.then(() => {
		server.listen(PORT, () => {
			console.log(`Server listening on port ${PORT}`)
			createAllUser()
		})
	})
	.catch((error) => console.error(error))
