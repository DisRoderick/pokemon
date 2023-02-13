const { createPokemonDb } = require('../controller/pokemoncontroller')

const getPokemonHandler = async (req, res) => {
    const { name } = req.query;
    try {
        if(name) {
            const response = getSearchByName(name)
            res.status(200).json(response)
        }
        
    } catch (error) {
        res.status(400).send(`No existe el pokemon de nombre: ${name}`)
    }
}

const getPokemonByIdHandler = (req, res) => {
    res.send('probando handler by id')
}


const getNameHandler = (req, res) => {
    res.send('probando handler name')
}

const postNewPokemonHandler = async (req, res) => {
    const { name, image, vida, ataque, defensa, velocidad, altura, peso, tipo } = req.body
    try {
        const response = await createPokemonDb({ name, image, vida, ataque, defensa, velocidad, altura, peso, tipo })
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }


}




module.exports = {
    getPokemonHandler,
    getPokemonByIdHandler,
    getNameHandler,
    postNewPokemonHandler
}