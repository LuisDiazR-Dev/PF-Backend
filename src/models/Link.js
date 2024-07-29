const { DataTypes } = require('sequelize')
const { User } = require('./User')

module.exports = (sequelize) => {
	sequelize.define(
		'link',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					isEmail: true,
				},
			},
			url: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isURL: true,
				},
			},
			userId: {
				type: DataTypes.UUID,
				allowNull: false,
				references: {
					model: User,
					key: 'id',
				},
			},
		},
		{
			timestamps: true,
		}
	)
}
