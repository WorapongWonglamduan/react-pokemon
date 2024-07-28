import React from "react";
import "./CardItems.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const CardItems = ({ item, setPokemon }) => {
  const dispatch = useDispatch();
  const {
    name,
    cardmarket: { prices: { averageSellPrice } = {} } = {},
    set: { total } = {},
    images: { small, large } = {},
    in_cart,
  } = item;

  const bulletPoint = (
    <span style={{ margin: "0 5px", color: "#312f3c", fontSize: "20px" }}>
      •
    </span>
  );
  const totalCard = total > 0 ? `${total} cards` : "Out of stock";

  const handleAddToCart = () => {
    if (!in_cart) {
      setPokemon((prev) =>
        prev.map((pokemon) => {
          if (pokemon.id === item.id) {
            return { ...pokemon, in_cart: true };
          }
          return { ...pokemon };
        })
      );
      dispatch({ type: "ADD_CART", payload: { ...item, count: 1 } });
      toast.success("added");
    }
  };

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
        <div
          className={
            in_cart ? "card-item_btn-cart-disable" : "card-item_btn-cart"
          }
          onClick={handleAddToCart}
        >
          Add to cart
        </div>
      </div>
    </div>
  );
};

export default CardItems;
