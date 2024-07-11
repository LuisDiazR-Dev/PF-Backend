const { Router } = require("express")
const { getAllTechs } = require("../handlers/technology-handler")

const techRouter = Router()

techRouter.get("/", getAllTechs)

module.exports = techRouter;