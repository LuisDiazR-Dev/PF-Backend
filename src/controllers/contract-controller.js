const { Contract, User } = require('../db')

const createContractController = async (contractData) => {
    const { senderId, receiverId, projectDescription, budget, availableTime, status } = contractData
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
                projectDescription,
                budget,
                availableTime,
                status: status || 'pending'
            }
        })
        if (!created) throw new Error("You've already sent the form")
        return contract
    } catch (error) {
        console.error("Error sending contract message:", error)
        throw new Error('Error sending')
    }
}

module.exports = {
	createContractController,
}
