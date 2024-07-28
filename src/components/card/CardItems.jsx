import React from "react";
import "./CardItems.css";

const CardItems = ({ item }) => {
  const {
    name,
    cardmarket: {
      prices: { averageSellPrice },
    },
    set: { total },
    images: { small, large },
  } = item;

  const bulletPoint = (
    <span style={{ margin: "0 5px", color: "#312f3c", fontSize: "20px" }}>
      •
    </span>
  );
  const totalCard = total > 0 ? `${total} cards` : "Out of stock";
  return (
    <div className="card-item">
      <div className="card-item__wrap-img-pokemon">
        <img src={small} alt={name} className="card-item__img-pokemon" />
      </div>

      <div className="card-item__details">
        <span className="card-item__details-name">{name}</span>
        <p className="card-item__details-price">
          ${averageSellPrice}
          {bulletPoint}
          {totalCard}
        </p>
        <div className="card-item_btn-cart">Add to cart</div>
      </div>
    </div>
  );
};

export default CardItems;
