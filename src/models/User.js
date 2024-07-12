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
				defaultValue: '',
				validate: {
					len: {
						args: [0, 300],
						msg: 'Bio should be up to 300 characters',
					},
				},
			},
			image: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: 'avatar.jpg',
				validate: {
					isUrl: true,
					len: {
						args: [1, 50],
						msg: 'Image URL should be between 1 and 50 characters',
					},
				},
			},
			role: {
				type: DataTypes.ENUM("user", "admin"),
				allowNull: false,
				defaultValue: "user"
			},
			isPremium: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
		},
		{ timestamps: true }
	)
}
