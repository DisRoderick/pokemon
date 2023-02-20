//const { Pokemon, Type } = require('../db.js')

const {
    createPokemonDb,
    getSearchByNameDb,
    getSearchByNameApi,
    getAllPokemonDb,
    getAllPokemonApi,
    searchByIdDb,
    searchByIdApi,
    verifyId
} = require('../controller/pokemoncontroller')

// ****************** TRAE TODOS LOS POKEMONES ********************
const getPokemonHandler = async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const responseDb = await getSearchByNameDb(name)
            const responseApi = await getSearchByNameApi(name)
            const combined = [responseDb, ...responseApi]

            res.status(200).json(combined)
        }
        else {
            const responseDb = await getAllPokemonDb()
            const responseApi = await getAllPokemonApi()
            const combined = [...responseDb, ...responseApi]
            res.status(200).json(combined)

        }

    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}



//busca popkemon por ID ****************************************

const getPokemonByIdHandler = async (req, res) => {
    const { id } = req.params
    const verify = verifyId(id)
    try {
        if (verify === 'string') {
            const responseDb = await searchByIdDb(id)
            if (!responseDb) throw new Error(`No se encuentra el pokemon con ID: ${id}`)
            return res.status(200).json(responseDb)
        } else if (verify === 'number') {
            const responseApi = await searchByIdApi(id)
            if (!responseApi) throw new Error(`No se encuentra el pokemon con ID: ${id}`)
            return res.status(200).json(responseApi)
        }

        else throw new Error('no se encontro el pokemon que buscabas por ID')
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}




const getNameHandler = (req, res) => {

    res.send('probando handler name')
}

const postNewPokemonHandler = async (req, res) => {

    try {
        const {
            name,
            image,
            life,
            attack,
            defense,
            speed,
            height,
            weight,
            types

        } = req.body;

        if (!name || !image || !life || !attack || !defense) throw Error('faltan datos para crear un pokemon')
        const newPokemon = await createPokemonDb({
            name,
            image,
            life,
            attack,
            defense,
            speed,
            height,
            weight,
            types
        })
        return res.status(200).send(newPokemon);
    } catch (error) {
        res.status(400).send(error.message)
    }


}






module.exports = {
    getPokemonHandler,
    getPokemonByIdHandler,
    getNameHandler,
    postNewPokemonHandler
}