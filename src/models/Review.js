const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	sequelize.define(
		'review',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			rating: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					min: 1,
					max: 5,
				},
			},
			comment: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{ timestamps: true }
	)
}
