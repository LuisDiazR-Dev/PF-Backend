const { Project } = require('../db')

const createProject = async (title, description, tags, technology, image) => {
    try {
		const [project, created] = await Project.findOrCreate({
			where: {
				title,
				description,
				tags,
				technology,
				image
			}
		})
		if (!created) throw new Error('This project already exists in DB!')
		
		return project
    } catch (error) {
        console.error("Error creating a project", error)
    }
}

module.exports = createProject;


const project1 = {
	id: '7fae8ae5-f8f5-4b7d-9cde-2db0fc924981',
	title: 'Project Management App',
	description: 'An app to manage programming projects effectively',
	tags: ['management', 'productivity', 'collaboration'],
	languages: ['JavaScript', 'React', 'Node.js'],
	image: 'https://example.com/images/project-management-app.jpg',
}

const project2 = {
	id: '2cae9ae6-a7f6-4c7e-8bdf-3eb0ec834682',
	title: 'E-commerce Platform',
	description: 'A scalable e-commerce platform with multiple features',
	tags: ['e-commerce', 'sales', 'shopping'],
	languages: ['Python', 'Django', 'PostgreSQL'],
	image: 'https://example.com/images/e-commerce-platform.jpg',
}

const project3 = {
	id: '3bae7ae7-c9d7-4d7f-8cde-4db1fc944783',
	title: 'Social Networking Site',
	description: 'A site to connect with friends and family',
	tags: ['social', 'networking', 'community'],
	languages: ['Ruby', 'Rails', 'SQLite'],
	image: 'https://example.com/images/social-networking-site.jpg',
}

const project4 = {
	id: '4dae8ae8-e8d8-4e7f-9cdf-5eb2fc954884',
	title: 'Fitness Tracker',
	description: 'An app to track fitness activities and goals',
	tags: ['fitness', 'health', 'tracking'],
	languages: ['Java', 'Spring Boot', 'MySQL'],
	image: 'https://example.com/images/fitness-tracker.jpg',
}

const project5 = {
	id: '5eae9ae9-f9e9-4f7f-8edf-6fb3fc964985',
	title: 'Recipe Sharing Platform',
	description: 'A platform to share and discover new recipes',
	tags: ['cooking', 'recipes', 'food'],
	languages: ['PHP', 'Laravel', 'MongoDB'],
	image: 'https://example.com/images/recipe-sharing-platform.jpg',
}