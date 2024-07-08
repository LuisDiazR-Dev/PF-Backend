const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	sequelize.define(
		'project',
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: {
						args: [3, 30],
						msg: 'Title should be between 3 and 30 characters',
					},
				},
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: {
						args: [5],
						msg: 'Description should contain at least 5 characters',
					},
				},
			},
			tags: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: true,
				defaultValue: [],
			},
			technology: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: true,
				defaultValue: [],
			},
			image: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isUrl: true,
					// msg: 'Image must be a valid URL',
				},
			},
		},
		{ timestamps: false }
	)
}
