const { Router } = require("express")
const { getAllTechnologies } = require("../handlers/technology-handler")

const technologyRouter = Router()

technologyRouter.get("/", getAllTechnologies)

module.exports = technologyRouter;