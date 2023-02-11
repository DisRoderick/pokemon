const { Router } = require('express')

const pokemonRouter = Router()

pokemonRouter.get('/', (req, res) => {
    res.send('Esto va a obtener todos los pokemones')
})

pokemonRouter.get('/:id', (req, res) => {
    res.send('esto me traera un pokemon de la api o de la base de datos por ID')
})

pokemonRouter.get('/name', (req, res) => {
    res.send('esto me traera todos los pokemones por nombre desde query')
})

pokemonRouter.post('/', (req, res) => {
    res.send('esta ruta creara un nuevo pokemon')
})


module.exports = pokemonRouter