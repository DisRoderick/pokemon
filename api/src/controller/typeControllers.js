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

// {
// "count": 1279,
// "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
// "previous": null,
// "results": [
// {
// "name": "bulbasaur",
// "url": "https://pokeapi.co/api/v2/pokemon/1/"
// },
// {
// "name": "ivysaur",
// "url": "https://pokeapi.co/api/v2/pokemon/2/"
// },
// {
// "name": "venusaur",
// "url": "https://pokeapi.co/api/v2/pokemon/3/"
// },
// {
// "name": "charmander",
// "url": "https://pokeapi.co/api/v2/pokemon/4/"
// },
// {
// "name": "charmeleon",
// "url": "https://pokeapi.co/api/v2/pokemon/5/"
// },
// {
// "name": "charizard",
// "url": "https://pokeapi.co/api/v2/pokemon/6/"
// },
// {