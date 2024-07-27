import React from "react";
import "./Home.css";
import FilterComponent from "../filter/FilterComponent";
import CardItems from "../card/CardItems";
const Content = () => {
  const array = Array.from({ length: 15 }, (_, index) => ({ name: index + 1 }));
  return (
    <div className="row">
      {array.map((item) => (
        <div key={item} className="col-lg-2">
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
