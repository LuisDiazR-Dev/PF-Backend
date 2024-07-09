const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	sequelize.define(
		'user',
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			userName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: {
						args: [3, 30],
						msg: 'Username should be between 3 and 30 characters',
					},
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: {
						msg: 'Email must be a valid email address',
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: {
						args: [6, 30],
						msg: 'Password should be between 6 and 30 characters',
					},
				},
			},
			bio: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: 'No hay descripcion',
				validate: {
					len: {
						args: [5],
						msg: 'Description should contain at least 5 characters',
					},
				},
			},
			image: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isUrl: {
						msg: 'Image must be a valid URL',
					},
				},
			},
			isPremium: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
		},
		{ timestamps: false }
	)
}