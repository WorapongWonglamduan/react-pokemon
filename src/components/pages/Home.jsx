import React, { useEffect, useMemo, useState } from "react";
import "./Home.css";
import FilterComponent from "../filter/FilterComponent";
import CardItems from "../card/CardItems";
import { getPokemon } from "../api/baseApi";

import Header from "../layout/Header";
import Paginate from "../paginate/Paginate";
import DataNotFound from "../data-not-found/DataNotFound";
import Loading from "../loading/Loading";
import { useSelector } from "react-redux";

const Content = ({ pokemon, setPokemon }) => {
  return (
    <div className="row">
      {pokemon.map((item, index) => (
        <div key={index} className="col-xl-2 col-md-3">
          <CardItems item={item} setPokemon={setPokemon} />
        </div>
      ))}
    </div>
  );
};
const Home = ({ setSideBarOpen }) => {
  const cart = useSelector((state) => state.cart);

  const memoizedCart = useMemo(() => cart, [cart]);
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
  const cartStorage = memoizedCart;
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
        const resPokemon = res.data.data.map((pokemon) => {
          const isCommon =
            cartStorage && cartStorage.length > 0
              ? cartStorage.some((cart) => pokemon.id === cart.id)
              : false;

          if (isCommon) {
            return { ...pokemon, in_cart: true };
          }
          return { ...pokemon, in_cart: false };
        });
        setPokemon(resPokemon);
        setCountItem(res.data.totalCount);
      }
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    setPokemon((prev) => {
      return prev.map((pokemon) => {
        const isCommon =
          cartStorage && cartStorage.length > 0
            ? cartStorage.some((cart) => pokemon.id === cart.id)
            : false;

        if (isCommon) {
          return { ...pokemon, in_cart: true };
        }
        return { ...pokemon, in_cart: false };
      });
    });
  }, [memoizedCart]);

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
              <Content pokemon={pokemon} setPokemon={setPokemon} />
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
