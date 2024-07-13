const server = require('./src/app.js')
const { conn } = require('./src/db.js')
const PORT = 3001

const createSeeders = require('./src/seeders.js')

conn
	.sync({ force: true })
	.then(() => {
		server.listen(PORT, () => {
			console.log(`Server listening on port ${PORT}`)
			createSeeders()
		})
	})
	.catch((error) => console.error(error))
