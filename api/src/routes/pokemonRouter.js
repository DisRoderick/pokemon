const { Router } = require('express')

const pokemonRouter = Router()
const { getPokemonHandler, getPokemonByIdHandler, getNameHandler, postNewPokemonHandler } = require('../handlers/pokemonHandlers.js')


pokemonRouter.get('/', getPokemonHandler)

pokemonRouter.get('/:id', getPokemonByIdHandler)

pokemonRouter.get('/', getNameHandler)

pokemonRouter.post('/', postNewPokemonHandler)


module.exports = pokemonRouter