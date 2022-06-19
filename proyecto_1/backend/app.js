require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios").default;

const { PORT = 3000 } = process.env;
const CACHE = {};
const ERROR = {};

app.use(cors());

app.get("/cache", function (req, res) {
  res.json({ data: CACHE });
});

app.post("/pokemon/:name", async function (req, res) {
  const { name } = req.params;

  if (CACHE[name]) {
    if (JSON.parse(CACHE[name]).time > new Date()) {
      delete CACHE[name];
    } else {
      return res.json({
        name,
        data: JSON.parse(CACHE[name]),
        isCached: true
      });
    }
  }

  if (ERROR[name]) {
    return res.json({ name, data: JSON.parse(ERROR[name]), isCached: true });
  }

  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  let response;
  try {
    const { data } = await axios.get(url);
    // console.log(data);
    response = data;
    data.time = new Date(Date.now() + 1000);
    CACHE[name] = JSON.stringify(data);
  } catch {
    response = data;
    ERROR[name] = JSON.stringify({ name, error: "Invalid pokemon." });
  }
  res.json({ name, data: response, isCached: false });
});

app.get("/pokemon/:name", async function (req, res) {
  console.log(req.params);

  const { id } = req.params;

  const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;

  const encountersUrl = `https://pokeapi.co/api/v2/pokemon/${id}/encounters`;

  const speciesPokemon = await axios(speciesUrl);

  const evolutions = await axios(speciesPokemon.data.evolution_chain.url);

  let allEvolutions = getEvolutionPokemon(evolutions.data.chain);
  let pokemonLocation = await axios(encountersUrl);
  let locationArray = [];

  pokemonLocation.data.forEach((data) =>
    locationArray.push(data.location_area.name)
  );

  const evolutionList = allEvolutions.map(({ species }) => `${species.name}`);

  res.json({ locations: locationArray, evolutions: evolutionList });
});

const getEvolutionPokemon = (evolutions) => {
  let evolutionChainArray = [evolutions];
  while (evolutions.evolves_to.length > 0) {
    for (let i = 0; i < evolutions.evolves_to.length; i++) {
      evolutionChainArray.push(evolutions.evolves_to[i]);
    }
    evolutions = evolutions.evolves_to[0];
    evolutions.evolves_to.length + 1;
  }
  return evolutionChainArray;
};

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}...`);
});
