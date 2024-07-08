const getAllUsersController = '../controllers/users/allUsersController'

const getAllUsers = async (req, res) => {
	try {
		const response = await getAllUsersController()
		res.status(200).json(response)
	} catch (error) {
		next(error)
	}
}

module.exports = getAllUsers
