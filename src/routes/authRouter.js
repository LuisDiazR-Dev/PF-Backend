const { Router } = require('express')
const { loginUser, registerUser } = require('../handlers/auth-handler')
const authRouter = Router()

authRouter.post("/login", loginUser)
authRouter.post("/signup", registerUser)

module.exports = authRouter