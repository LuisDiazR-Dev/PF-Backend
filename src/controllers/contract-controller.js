const { Contract, User } = require('../db')
const { Op } = require('sequelize')
const AppError = require('../utils/error-util')

const createContractController = async (contractData) => {
	const {
		senderId,
		receiverId,
		subject,
		projectDescription,
		budget,
		currency,
		availableTime,
		status,
	} = contractData
	try {
		const sender = await User.findByPk(senderId)
		const receiver = await User.findByPk(receiverId)

		if (!sender || !receiver) {
			throw new AppError('Sender or receiver not found', 404)
		}

		const [contract, created] = await Contract.findOrCreate({
			where: {
				senderId,
				receiverId,
				subject,
				projectDescription,
				budget,
				currency,
				availableTime,
				status: status || 'pending',
			},
		})

		if (!created) {
			throw new AppError("You've already sent the contract", 409)
		}

		return contract
	} catch (error) {
		console.error('Error creating contract:', error)
		throw new AppError('Error creating contract', 500)
	}
}

const getAllContractsController = async () => {
	try {
		const allContracts = await Contract.findAll({
			include: [
				{ model: User, as: 'sender', attributes: ['id', 'userName', 'email'] },
				{ model: User, as: 'receiver', attributes: ['id', 'userName', 'email'] },
			],
		})
		return allContracts
	} catch (error) {
		console.error('Error fetching all contracts:', error)
		throw new AppError('Error fetching all contracts', 500)
	}
}

const getContractByIdController = async (id, userId) => {
	try {
		const contract = await Contract.findByPk(id, {
			include: [
				{ model: User, as: 'sender', attributes: ['id', 'userName', 'email'] },
				{ model: User, as: 'receiver', attributes: ['id', 'userName', 'email'] },
			],
		})

		if (!contract || (contract.senderId !== userId && contract.receiverId !== userId)) {
			throw new AppError('Contract not found or access denied', 403)
		}

		return contract
	} catch (error) {
		console.error('Error fetching the contract:', error)
		throw new AppError('Error fetching contract', 500)
	}
}

const getUserContractsController = async (userId) => {
	try {
		const contracts = await Contract.findAll({
			where: {
				receiverId: userId,
			},
			include: [
				{ model: User, as: 'sender', attributes: ['id', 'userName', 'email'] },
				{ model: User, as: 'receiver', attributes: ['id', 'userName', 'email'] },
			],
		})
		return contracts
	} catch (error) {
		console.error('Error fetching user contracts:', error)
		throw new AppError('Error fetching user contracts', 500)
	}
}

const deleteContractByIdController = async (contractId, user) => {
	try {
		const contractToDelete = await Contract.findByPk(contractId)
		if (!contractToDelete) throw new AppError('Contract not found', 404)

		// Verificar si el usuario tiene permisos para eliminar el contrato
		if (
			user.role === 'admin' ||
			(user.role === 'user' && contractToDelete.receiverId === user.id)
		) {
			await Contract.destroy({ where: { id: contractId } })
			return { message: 'Contract deleted successfully' }
		} else {
			throw new AppError('You are not authorized to delete this contract', 403)
		}
	} catch (error) {
		console.error(`Error deleting contract: ${error.message}`)
		throw new AppError(error.message || 'Error deleting contract', error.statusCode || 500)
	}
}

const getDeletedContractController = async () => {
	try {
		const deletedContracts = await Contract.findAll({
			paranoid: false,
			where: { deletedAt: { [Op.ne]: null } },
		})
		return deletedContracts
	} catch (error) {
		console.error('Error fetching deleted contracts:', error)
		throw new AppError('Error fetching deleted contracts', 500)
	}
}

const updateContractStatusController = async (contractId, status) => {
	try {
		const contract = await Contract.findByPk(contractId)
		if (!contract) {
			throw new AppError('Contract not found', 404)
		}
		console.log("Este es el contrato:", contract, contract.status)

		contract.status = status
		await contract.save()

		return contract
	} catch (error) {
		console.error('Error updating contract status:', error)
		throw new AppError('Error updating contract status', 500)
	}
}

module.exports = {
	createContractController,
	getAllContractsController,
	getContractByIdController,
	getUserContractsController,
	deleteContractByIdController,
	getDeletedContractController,
	updateContractStatusController,
}
