const { User, Project, Technology } = require('./src/db.js')
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

		const newProject =await Project.create({
			title: 'Project Management App',
			description: 'An app to manage programming projects effectively',
			tags: ['management', 'productivity', 'collaboration'],
			image: 'https://example.com/images/project-management-app.jpg',
		})

		const newProject2 =await Project.create({
			title: 'holaa',
			description: 'An app to manage programming projects effectively',
			tags: ['management', 'productivity', 'collaboration'],
			image: 'https://example.com/images/project-management-app.jpg',
		})
		const newTechnologies = await Promise.all(
			['JavaScript', 'Python', 'Java', 'React'].map(
			  async (technology) => (await Technology.findOrCreate({ where: { name: technology } }))[0]
			)
		  );
		const newTechnologies2 = await Promise.all(
			['JavaScript','Django'].map(
			  async (technology) => (await Technology.findOrCreate({ where: { name: technology } }))[0]
			)
		  );
		  await newProject.addTechnologies(newTechnologies);
		  await newProject2.addTechnologies(newTechnologies2);
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
