
const getTypesPokemons = require('../controller/typeControllers.js')


const allTypePokemon = async (req, res) => {
    try {
        const typesPokemons = await getTypesPokemons();
        return res.status(201).send(typesPokemons);
    } catch (error) {
        return res.status(400).send(error.message)
    }
}



module.exports = allTypePokemon