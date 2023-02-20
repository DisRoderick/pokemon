const { Type } = require('../db.js')
const axios = require('axios');

const getTypesPokemons = async () => {
    
        const reqTypesPokemons = await axios.get("https://pokeapi.co/api/v2/type")
            .then(res => res.data.results);
        reqTypesPokemons.forEach((element) => {
            Type.findOrCreate({
                where: {
                    name: element.name,
                },
            });
        });
        return await Type.findAll();
};




module.exports = getTypesPokemons