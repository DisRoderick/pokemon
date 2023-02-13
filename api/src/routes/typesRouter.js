const { Router } = require('express')

const allTypePokemon = require('../handlers/typeHandler.js')

const typesRouter = Router()

typesRouter.get('/', allTypePokemon)

module.exports = typesRouter