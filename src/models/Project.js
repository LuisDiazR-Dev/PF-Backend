const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	sequelize.define(
		'project',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
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
				defaultValue: '',
			},
			tags: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: true,
				defaultValue: [],
			},
			image: {
				type: DataTypes.STRING(512),
				allowNull: false,
				isUrl: true,
				defaultValue: 'image_notfound.jpg',
			},
		},
		{ timestamps: true, paranoid: true }
	)
}
