(() => {
  const Utils = {
    settings: {
      backendBaseUrl: "https://pokeapi.co/api/v2",
    },
    getFormattedBackendUrl: ({ query, searchType }) => {
      return `${Utils.settings.backendBaseUrl}/${searchType}/${query}`;
    },
    getPokemon: ({ query, searchType = "pokemon" }) => {
      return Utils.fetch({
        url: Utils.getFormattedBackendUrl({ query, searchType }),
        searchType
      });
    },
    getEvolutionChain: async (species)=>{
      let response = [];
      try {

        const [pokemon] = await Promise.all([
          Utils.fetch({ url: species.url, searchType: "pokemon" })
              .catch((e) => {
              return {};
          })
        ]);

        const [chain] = await Promise.all([
          Utils.fetch({ url: pokemon.evolution_chain.url, searchType: "evolution-chain" })
              .catch((e) => {
              return {};
          })
        ]);

        if (chain.chain) {
          response = Utils.getEvolutionChainOrder({pokemon: chain.chain});
        }

      } catch (err) {
        console.log(err);
      }

      return response;
    
    },
    getEvolutionChainOrder: ({pokemon})=>{
      
      if (!pokemon.evolves_to.length) {
        return { name: pokemon.species.name, isBaby: pokemon.is_baby };
      }
      
      return [{ name: pokemon.species.name, isBaby: pokemon.is_baby },
              ...pokemon.evolves_to.map((currentPokemon) => {
                  let pokemons = Utils.getEvolutionChainOrder({ pokemon: currentPokemon });
                  if (pokemons.length){
                      return pokemons.flat();
                  }
                  return pokemons;
              })
            ].flat();

    },
    fetch: async ({ url, searchType }) => {
      try {
        const rawResponse = await fetch(url);
        if (rawResponse.status !== 200) {
          throw new Error(`${searchType} not found`);
        }
        return rawResponse.json();
      } catch (error) {
        throw error;
      }
    },

  };
  document.Utils = Utils;
})();
