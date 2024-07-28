import React, { useEffect, useState } from "react";
import "./Home.css";
import FilterComponent from "../filter/FilterComponent";
import CardItems from "../card/CardItems";
import { getPokemon } from "../api/baseApi";
const Content = ({ pokemon }) => {
  // const array = Array.from({ length: 20 }, (_, index) => ({ name: index + 1 }));
  console.log("====================================");
  console.log("pokemon->", pokemon);
  console.log("====================================");
  return (
    <div className="row">
      {pokemon.map((item, index) => (
        <div key={index} className="col-xl-2 col-md-3">
          <CardItems item={item} />
        </div>
      ))}
    </div>
  );
};
const Home = () => {
  const [filterOptions, setFilterOptions] = useState({ page: 1, pageSize: 20 });
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const getData = async () => {
    setLoading(true);

    const res = await getPokemon(filterOptions);

    setTimeout(() => {
      if (res) setPokemon(res.data.data);
      setLoading(false);
    }, 1500);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="home">
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <>
          <FilterComponent />
          <Content pokemon={pokemon} />
        </>
      )}
    </div>
  );
};

export default Home;
