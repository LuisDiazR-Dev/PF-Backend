const { createContractController } = require('../controllers/contract-controller')
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

module.exports = {
    createContract
}