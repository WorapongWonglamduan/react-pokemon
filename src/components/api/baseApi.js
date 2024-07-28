import axios from "axios";

const headers = {
  Authorization: `X-Api-Key ${process.env.API_POKEMON_KEY}`,
  "Content-Type": "application/json",
};
const path = {
  cards: "https://api.pokemontcg.io/v2/cards",
  types: "https://api.pokemontcg.io/v2/types",
  rarities: "https://api.pokemontcg.io/v2/rarities",
  sets: "https://api.pokemontcg.io/v2/sets",
};

export const getPokemon = async (params) => {
  return await axios.get(path.cards, {
    params: params,
    headers: headers,
  });
};
export const getTypes = async () => {
  const res = await axios.get(path.types, {
    headers: headers,
  });
  if (res.status === 200) return res.data.data;
  return [];
};
export const getRarities = async () => {
  const res = await axios.get(path.rarities, {
    headers: headers,
  });

  if (res.status === 200) return res.data.data;
  return [];
};
export const getSets = async () => {
  const res = await axios.get(path.sets, {
    headers: headers,
  });

  if (res.status === 200) return res.data.data;
  return [];
};
