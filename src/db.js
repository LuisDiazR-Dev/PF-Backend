require('dotenv').config()
const { Sequelize } = require('sequelize')

const fs = require('fs')
const path = require('path')
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
	logging: false,
	native: false,
})

//const sequelize = new Sequelize(DB_DEPLOY, {
//	logging: false,
//	native: false,
//})

// const sequelize = new Sequelize(DB_DEPLOY, {
// 	logging: false,
// 	native: false,
// })

const basename = path.basename(__filename)
const modelDefiners = []

fs.readdirSync(path.join(__dirname, '/models'))
	.filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, '/models', file)))
	})

modelDefiners.forEach((model) => model(sequelize))

let entries = Object.entries(sequelize.models)
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]])
sequelize.models = Object.fromEntries(capsEntries)

const { User, Project, Technology, Plan, Tag, Like, Contract, Review, Link } = sequelize.models

User.hasMany(Project, { foreignKey: 'userId', as: 'projects', onDelete: 'cascade' })
Project.belongsTo(User, { foreignKey: 'userId', as: 'user' })

Project.belongsToMany(Technology, { through: 'project_tech', as: 'technologies' })
Technology.belongsToMany(Project, { through: 'project_tech', as: 'projects' })

Project.belongsToMany(Tag, { through: 'project_tag', as: 'tags' })
Tag.belongsToMany(Project, { through: 'project_tag', as: 'projects' })

User.belongsTo(Plan, { foreignKey: 'planName', as: 'plan' })
Plan.hasMany(User, { foreignKey: 'planName', as: 'users' })

User.hasMany(Like, { foreignKey: 'userId', as: 'likes' })
Like.belongsTo(User, { foreignKey: 'userId', as: 'user' })

Project.hasMany(Like, { foreignKey: 'projectId', as: 'likes' })
Like.belongsTo(Project, { foreignKey: 'projectId', as: 'project' })

User.hasMany(Contract, { foreignKey: 'senderId', as: 'sentContracts' })
Contract.belongsTo(User, { foreignKey: 'senderId', as: 'sender' })

User.hasMany(Contract, { foreignKey: 'receiverId', as: 'receivedContracts' })
Contract.belongsTo(User, { foreignKey: 'receiverId', as: 'receiver' })

User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' })
Review.belongsTo(User, { foreignKey: 'userId', as: 'user' })

User.hasMany(Link, { foreignKey: 'userId', as: 'links' });
Link.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
	...sequelize.models,
	conn: sequelize,
}
