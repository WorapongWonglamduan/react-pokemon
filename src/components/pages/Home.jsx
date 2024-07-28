import React, { useEffect, useState } from "react";
import "./Home.css";
import FilterComponent from "../filter/FilterComponent";
import CardItems from "../card/CardItems";
import { getPokemon } from "../api/baseApi";

import Header from "../layout/Header";
import Paginate from "../paginate/Paginate";
import DataNotFound from "../data-not-found/DataNotFound";
import Loading from "../loading/Loading";

const Content = ({ pokemon }) => {
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
const Home = ({ setSideBarOpen }) => {
  const [filterOptions, setFilterOptions] = useState({
    page: 1,
    pageSize: 20,
    name: "",
    types: "",
    set: "",
    rarity: "",
  });

  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [countItem, setCountItem] = useState(0);

  const getData = async () => {
    setLoading(true);
    const { page, pageSize, name, types, rarity, set } = filterOptions;
    let query = [];
    if (name) query.push(`name:${name}`);
    if (types) query.push(`types:${types}`);
    if (rarity) query.push(`rarity:"${rarity}"`);
    if (set) query.push(`set.id:${set}`);

    const params = {
      page,
      pageSize,
      q: query.join(" "),
    };

    const res = await getPokemon(params);

    setTimeout(() => {
      if (res) {
        setPokemon(res.data.data);
        setCountItem(res.data.totalCount);
      }
      setLoading(false);
    }, 1500);
  };
  useEffect(() => {
    getData();
  }, [filterOptions]);

  return (
    <div className="home">
      <Header
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        setSideBarOpen={setSideBarOpen}
      />
      <FilterComponent
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
      />
      {loading ? (
        <Loading />
      ) : (
        <>
          {pokemon.length > 0 ? (
            <>
              <Content pokemon={pokemon} />
              <Paginate
                filterOptions={filterOptions}
                setFilterOptions={setFilterOptions}
                countItem={countItem}
              />
            </>
          ) : (
            <DataNotFound />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
