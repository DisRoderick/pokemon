const { Pokemon, Type } = require('../db');
const axios = require('axios');
const { response } = require('express');
const { Op } = require('sequelize');



const cleanArray = (jsonArray) => {
    let pokemonProperties = [];
    jsonArray.forEach(pokemon => {
        let pokemonProperty = {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.other.home.front_default,
            type: pokemon.types.map(types => types.type.name),
            life: pokemon.stats[0].base_stat,
            attack: pokemon.stats[1].base_stat,
            defense: pokemon.stats[2].base_stat,
            speed: pokemon.stats[5].base_stat,
            height: pokemon.height,
            weight: pokemon.weight

        };
        pokemonProperties.push(pokemonProperty);
    });
    return pokemonProperties
}

//*******************CLEAN ARRAY PARA DEJAR ESE ARRAY HERMOSO */

const verifyId = (id) => {
    if (isNaN(id)) return 'string'
    else return 'number'

}



//*******************verifica el tipo de ID */

const createPokemonDb = async (
    { name,
        image,
        life,
        attack,
        defense,
        speed,
        height,
        weight,
        types }
) => {

    const newPokemon = await Pokemon.create({
        name,
        image,
        life,
        attack,
        defense,
        speed,
        height,
        weight,
        types
    });


    const objtypes = []

    for (const tipos of types) {

        const typeObjects = await Type.findOrCreate({

            where: {
                name: tipos
            },
            default: {
                name: tipos
            }
        })
        const [created] = typeObjects
        objtypes.push(created)
    }
    await newPokemon.addTypes(objtypes);
    return newPokemon;
};


// const getSearchByName = async (name) => {
//     const responseDb = await Pokemon.findAll({
//         where: {
//             name: name
//         }
//     })


//     const responseApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
//         .then(response => {
//             return response.data
//         })



// }

const getSearchByNameDb = async (name) => {
    const responseDb = await Pokemon.findOne({
        where: {
            name: {
                [Op.startsWith]: name
            }
        }
    })
    return responseDb
}

// BUSCA POR NAME EN LA API
const getSearchByNameApi = async (name) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const arrayApiName = [response.data];
    return cleanArray(arrayApiName)

}

const getAllPokemonDb = async () => {
    const allPokemonDb = await Pokemon.findAll()
    return allPokemonDb
}


const getAllPokemonApi = async () => {
    const arrayApi = []
    let limit = 20
    for (let i = 1; i < limit; i++) {
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then(response => {
                arrayApi.push(response.data)


            })

    }
    return cleanArray(arrayApi)
}


const searchByIdDb = async (id) => {
    const responseDb = await Pokemon.findByPk(id, {
        include: [
            {
                model: Type,
                as: 'types'
            }
        ]
    })
    console.log(responseDb);
    return responseDb
}

const searchByIdApi = async (id) => {
    const arrayId = []
    //const resultApi = 
    await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => {
            arrayId.push(response.data)
        })
    if (arrayId.length < 1) return `el pokemon con ID: ${id} no existe`
    else {

        return cleanArray(arrayId)
    }
}







module.exports = {
    createPokemonDb,
    getSearchByNameApi,
    getSearchByNameDb,
    getAllPokemonDb,
    getAllPokemonApi,
    searchByIdDb,
    verifyId,
    searchByIdApi
}