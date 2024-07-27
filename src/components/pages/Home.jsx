import React from "react";
import "./Home.css";
import FilterComponent from "../filter/FilterComponent";
import CardItems from "../card/CardItems";
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
  return (
    <div className="home">
      Home
      <FilterComponent />
      <Content />
    </div>
  );
};

export default Home;
