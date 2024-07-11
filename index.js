const server = require('./src/app.js')
const { conn } = require('./src/db.js')
const PORT = 3001

const createAllUser = require("./src/seeders.js")

conn
	.sync({ alter: true })
	.then(() => {
		server.listen(PORT, () => {
			console.log(`Server listening on port ${PORT}`)
			createAllUser()
		})
	})
	.catch((error) => console.error(error))
