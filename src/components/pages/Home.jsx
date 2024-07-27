import React, { useEffect, useState } from "react";
import "./Home.css";
import FilterComponent from "../filter/FilterComponent";
import CardItems from "../card/CardItems";
import { getPokemon } from "../api/baseApi";
const Content = () => {
  const array = Array.from({ length: 20 }, (_, index) => ({ name: index + 1 }));
  return (
    <div className="row">
      {array.map((item) => (
        <div key={item} className="col-xl-2 col-md-3">
          <CardItems item={item} />
        </div>
      ))}
    </div>
  );
};
const Home = () => {
  const [filterOptions, setFilterOptions] = useState({ page: 1, pageSize: 20 });
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);

    const res = await getPokemon(filterOptions);
    console.log("====================================");
    console.log("res->", res);
    console.log("====================================");

    setTimeout(() => {
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
          <Content />
        </>
      )}
    </div>
  );
};

export default Home;
