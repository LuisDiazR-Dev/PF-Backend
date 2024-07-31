const { Contract, User, Commission } = require('../db')
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

		const contract = await Contract.findOrCreate({
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

		contract.status = status
		await contract.save()

		return contract
	} catch (error) {
		console.error('Error updating contract status:', error)
		throw new AppError('Error updating contract status', 500)
	}
}

const calculateCommission = (planName, budget) => {
	let rate = 0
	switch (
		planName // Convertir a minúsculas para comparación insensible a mayúsculas
	) {
		case 'Premium':
			rate = 0.05 // 5% para Premium
			break
		case 'Free':
			rate = 0.25 // 25% para Free
			break
		default:
			throw new Error(`Unknown plan: ${planName}`)
	}
	const amount = budget * rate
	return { rate, amount }
}

const createCommissionController = async (commissionData) => {
	const { contractId } = commissionData
	try {
		// Buscar el contrato
		const contract = await Contract.findByPk(contractId)
		if (!contract) {
			throw new AppError('Contract not found', 404)
		}

		// Verificar que tanto el remitente como el receptor sean usuarios
		const sender = await User.findByPk(contract.senderId)
		const receiver = await User.findByPk(contract.receiverId)
		console.log(receiver)

		if (!sender || !receiver) {
			throw new AppError('Sender or receiver not found', 404)
		}

		if (sender.role !== 'user' || receiver.role !== 'user') {
			throw new AppError('Sender and receiver must both be common users', 400)
		}

		// Calcular la comisión basada en el plan del receptor
		const commissionData = calculateCommission(receiver.planName, contract.budget)

		// Crear la comisión
		const commission = await Commission.create({
			rate: commissionData.rate,
			amount: commissionData.amount,
			contractId,
		})

		return commission
	} catch (error) {
		console.error('Error creating commission:', error)
		throw new AppError('Error creating commission', 500)
	}
}

const getCommissionByContractIdController = async (contractId) => {
	try {
		const commission = await Commission.findOne({ where: { contractId } })
		if (!commission) {
			throw new AppError('Commission not found', 404)
		}
		return commission
	} catch (error) {
		console.error('Error fetching commission:', error)
		throw new AppError('Error fetching commission', 500)
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
	createCommissionController,
	getCommissionByContractIdController,
}
