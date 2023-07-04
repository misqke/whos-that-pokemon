import pokemon from "../../data/pokemon.json";

export const post = async ({ request }) => {
  const { min, max, used } = await request.json();
  const randomPokemon = getRandomPokemon(min, max, used);
  if (randomPokemon == -1) {
    return {
      body: JSON.stringify({ message: "No Pokemon Remaining" }),
    };
  }
  return {
    body: JSON.stringify({ pokemon: randomPokemon }),
  };
};

const getRandomPokemon = (min, max, used) => {
  const range = Number(max) - Number(min) + 1;
  if (used.length === range) {
    return -1;
  }
  const available = pokemon.slice(Number(min) - 1, Number(max));
  let randomPokemon;
  do {
    let num = Math.floor(Math.random() * range + min);
    randomPokemon = available[num];
  } while (used.includes(randomPokemon.number));

  return randomPokemon;
};
