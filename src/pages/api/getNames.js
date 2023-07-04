import pokemon from "../../data/pokemon.json";

export const post = async ({ request }) => {
  const { min, max } = await request.json();
  const names = pokemon.slice(Number(min) - 1, Number(max)).map((p) => p.name);
  return {
    body: JSON.stringify(names),
  };
};
