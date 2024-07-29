import React, { useEffect, useMemo, useRef, useState } from "react";
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
    set: { id: "", name: "" },
    rarity: "",
  });

  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [countItem, setCountItem] = useState(0);
  const cartStorage = memoizedCart;
  const abortControllerRef = useRef(null);

  const getData = async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setLoading(true);
    const { page, pageSize, name, types, rarity, set } = filterOptions;

    let query = [];
    if (name) query.push(`name:${name}`);
    if (types) query.push(`types:${types}`);
    if (rarity) query.push(`rarity:"${rarity}"`);
    if (set.id) query.push(`set.id:${set.id}`);

    const params = {
      page,
      pageSize,
      q: query.join(" "),
    };

    const res = await getPokemon(params, signal);

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
      setLoading(false);
    }
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
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
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
