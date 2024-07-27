import React from "react";
import "./CardItems.css";

const CardItems = ({ item }) => {
  const { name } = item;
  return (
    <div className="card-item">
      <img
        src="https://w7.pngwing.com/pngs/262/723/png-transparent-pokemon-charizard-illustration-pokemon-trading-card-game-pokemon-tcg-online-pokemon-box-ruby-sapphire-charizard-pokemon-mammal-dragon-orange.png"
        alt={name}
        className="card-item__img-pokemon"
      />

      <div className="card-item__details">
        <div> Details : {name}</div>
        <div> Details : {name}</div>
        <div> Details : {name}</div>
        <div> Details : {name}</div>
      </div>
    </div>
  );
};

export default CardItems;
