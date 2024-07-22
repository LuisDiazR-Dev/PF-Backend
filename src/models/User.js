const { DataTypes } = require('sequelize')
const { Plan } = require('./Plan')

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
				defaultValue:
					'https://img.freepik.com/foto-gratis/fotografia-lateral-editor-codigo-que-utiliza-react-js_181624-61842.jpg?t=st=1720916999~exp=1720920599~hmac=d8a2806277e04bc4c916f77520e6c8369ee55ab8b14e50b7b9f70ef6f957969e&w=1800',
				isUrl: true,
			},
			role: {
				type: DataTypes.ENUM('user', 'admin'),
				allowNull: false,
				defaultValue: 'user',
			},
			planName: {
				type: DataTypes.STRING,
				references: {
					model: Plan,
					key: 'planName',
				},
			},
		},
		{
			tableName: 'users',
		},
		{ timestamps: true, paranoid: true }
	)
}
