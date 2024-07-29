const {
	createContractController,
	getAllContractsController,
	getUserContractsController,
	getContractByIdController,
	deleteContractByIdController,
} = require('../controllers/contract-controller')
const { User } = require('../db')
const sendContractNotification = require('../mailer/contract-notification')

const createContract = async (req, res) => {
	try {
		const contractData = req.body
		const contract = await createContractController(contractData)

		const sender = await User.findByPk(contract.senderId)

		const receiver = await User.findByPk(contract.receiverId)

		if (sender && receiver) {
			await sendContractNotification(sender?.email, receiver?.email, contractData)
		}

		res.status(201).json(contract)
	} catch (error) {
		console.error('Error creating contract form:', error)
		return res.status(400).json({ error: error.message })
	}
}

const getAllContracts = async (req, res) => {
	try {
		const { role, id: userId } = req.user
		if (role === 'admin') {
			const contracts = await getAllContractsController()
			res.status(200).json(contracts)
		} else if (role === 'user') {
			const contracts = await getUserContractsController(userId)
			res.status(200).json(contracts)
		} else {
			throw new Error('Unauthorized')
		}
	} catch (error) {
		console.error('Error fetching contracts:', error)
		res.status(500).json({ error: error.message })
	}
}

const getContractById = async (req, res) => {
	try {
		const { id } = req.params
		const userId = req.user.id
		console.log('id del contrato:', req.params)
		const contracts = await getContractByIdController(id, userId)
		res.status(200).json(contracts)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const deleteContractById = async (req, res) => {
	try {
		const { id } = req.params
		const user = req.user
		const response = await deleteContractByIdController(id, user)
		res.status(200).json(response)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

module.exports = {
	createContract,
	getAllContracts,
	getContractById,
	deleteContractById,
}
