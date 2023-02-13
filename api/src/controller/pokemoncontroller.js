const { Pokemon, Tipo } = require('../db');
const axios = require('axios');

const createPokemonDb = async (
    name,
    image,
    vida,
    ataque,
    defensa,
    velocidad,
    altura,
    peso,
    tipo
) => {
    const newPokemon = await Pokemon.create(
        name,
        image,
        vida,
        ataque,
        defensa,
        velocidad,
        altura,
        peso
    )


    return newPokemon
}

module.exports = {
    createPokemonDb
}