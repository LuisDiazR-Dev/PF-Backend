const createProject = require('../controllers/postProjects')

const createProjectHandler = async (req, res) => {
	const { title, description, tags, technology, image } = req.body
	try {
		const project = await createProject(title, description, tags, technology, image)
		res.status(200).json({ project: project })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

module.exports = createProjectHandler;
