const { Contract, User } = require('../db')
const { Op } = require('sequelize')
const AppError = require('../utils')

const createContractController = async (contractData) => {
	const { senderId, receiverId, subject, projectDescription, budget, currency, availableTime, status } =
		contractData
	try {
		const sender = await User.findByPk(senderId)

		const receiver = await User.findByPk(receiverId)

		if (!sender || !receiver) {
			throw new Error('Sender or receiver not found')
		}

		const [contract, created] = await Contract.findOrCreate({
			where: {
				senderId: sender?.id,
				receiverId: receiver?.id,
				subject,
				projectDescription,
				budget,
				currency,
				availableTime,
				status: status || 'pending',
			},
		})
		if (!created) throw new Error("You've already sent the form")
		return contract
	} catch (error) {
		console.error('Error sending contract message:', error)
		throw new Error('Error sending')
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
		throw new Error('Error fetching all contracts')
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
			throw new Error('Contract not found or access denied')
		}

		return contract
	} catch (error) {
		console.error('Error fetching the contract', error)
		throw new Error('Error fetching contract')
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
		throw new Error('Error fetching user contracts')
	}
}

const deleteContractByIdController = async (contractId, user) => {
	try {
		const contractToDelete = await Contract.findByPk(contractId)
		if (!contractToDelete) throw new AppError('Contract not found', 404)

		// Verificar si el usuario tiene permisos para eliminar el contrato
		if (user.role === 'user' && contractToDelete.receiverId === user.id) {
			await Contract.destroy({ where: { id: contractId } })
			return { message: 'Contract deleted successfully' }
		} else {
			throw new AppError('You are not authorized to delete this contract', 401)
		}
	} catch (error) {
		console.error(`Error deleting contract: ${error.message}`)
		throw new AppError(error.message || `Error deleting contract`, error.statusCode || 500)
	}
}


module.exports = {
    createContractController,
    getAllContractsController,
    getUserContractsController,
	getContractByIdController,
	deleteContractByIdController
}
