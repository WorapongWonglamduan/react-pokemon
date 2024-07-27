import axios from "axios";

const headers = {
  Authorization: `Bearer ${process.env.API_POKEMON_KEY}`,
  "Content-Type": "application/json",
};
const path = "https://api.pokemontcg.io/v2/cards";
export const getPokemon = async (params) => {
  return await axios.get(path, {
    params: params,
    headers: headers,
  });
};
