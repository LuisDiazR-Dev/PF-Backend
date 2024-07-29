const { User } = require('../db')
const { Op } = require('sequelize')
const AppError = require('../utils/error-util')
const { findOrCreateLinks } = require('../controllers/link-controller')
const bcrypt = require('bcrypt');
const {
	getUserIncludes,
	getUserOrder,
	getWhereCondition,
	getPagination,
} = require('../utils/user-utils')

const getAllUsersController = async (queries) => {
	try {
		const order = getUserOrder(queries)
		const where = getWhereCondition(queries)
		const include = getUserIncludes(queries)
		const { offset, limit } = getPagination(queries)
		const users = await User.findAndCountAll({
			limit,
			offset,
			order,
			where,
			include,
		})

		return users.rows.map((project) => project.dataValues)
	} catch (error) {
		console.error('Error fetching users:', error)
		throw new Error(`Error fetching users: ${error.message}`)
	}
}

const getUserByIdController = async (id) => {
	try {
		const user = await User.findByPk(id, { include: getUserIncludes() })
		if (!user) throw new AppError('User not found', 404)
		return user
	} catch (error) {
		console.error(`Error fetching project with id ${id}`, error)
		throw new AppError(`Error fetching project with id ${id}`, 500)
	}
}

const updateUserProfileController = async ({ userData }, { id }) => {
	try {
		const updatingUser = await User.findByPk(id);
		if (!updatingUser || updatingUser.role !== 'user') {
			throw new AppError('You are not authorized to update this user', 401);
		}

		if (userData.password) {
			userData.password = await bcrypt.hash(userData.password, 10);
		}

		await updatingUser.update(userData);
		const updatedUser = await User.findByPk(id);

		return updatedUser;
	} catch (error) {
		console.error('Error updating project:', error);
		throw new AppError('Error updating project', 500);
	}
};
const updateUserByIdController = async (userData, id) => {
	try {
		const user = await User.findByPk(id)
		if (!user) {
			throw new AppError('User not found', 404)
		}
		await user.update({
			userName: userData.userName ?? user.userName,
			password: userData.password ?? user.password,
			bio: userData.bio ?? user.bio,
			aboutMe: userData.aboutMe ?? user.aboutMe,
			image: userData.image ?? user.image,
		})

		if (userData.links) {
			const linkInstances = await findOrCreateLinks(userData.links)
			await user.setLinks(linkInstances)
		}

		const updatedUser = await User.findByPk(userData.id)

		return updatedUser
	} catch (error) {
		console.error('Error updating project:', error)
		throw new AppError('Error updating project', 500)
	}
}

const deleteUserController = async (id) => {
	try {
		const userToDelete = await User.findByPk(id)
		if (!userToDelete) throw new AppError('User not found', 404)
		await userToDelete.destroy()
		return { message: 'User deleted successfully' }
	} catch (error) {
		console.error(`Error deleting user by Id: ${error.message}`)
		throw new AppError(`Error deleting user`, 500)
	}
}

const getDeletedUsersController = async () => {
	try {
		let where = { deletedAt: { [Op.not]: null } }

		const users = await User.findAll({
			where,
			paranoid: false,
			include: getUserIncludes(),
		})

		return users
	} catch (error) {
		console.error('Error getting deleted user:', error)
		throw new AppError('Error fetching deleted user', 500)
	}
}

const getDeletedUserByIdController = async (id) => {
	try {
		const user = await User.findOne({
			where: { id },
			paranoid: false,
			include: getUserIncludes(),
		})

		if (!user) throw new AppError('No user found with the given id', 404)

		return user
	} catch (error) {
		console.error('Error fetching deleted project by Id', error)
		throw new AppError('Error fetching deleted user', 500)
	}
}

const restoreUserController = async (id) => {
	try {
		const user = await User.findOne({
			where: { id },
			paranoid: false,
			include: getUserIncludes(),
		})

		if (!user) throw new AppError('No user found with the given id', 404)

		await user.restore()

		return { message: 'User restored successfully' }
	} catch (error) {
		console.error('Error restoring user', error)
		throw new AppError('Error restoring user', 500)
	}
}

module.exports = {
	getAllUsersController,
	getUserByIdController,
	updateUserProfileController,
	updateUserByIdController,
	deleteUserController,
	getDeletedUsersController,
	getDeletedUserByIdController,
	restoreUserController,
}
