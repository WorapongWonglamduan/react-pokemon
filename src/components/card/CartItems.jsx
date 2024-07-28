import React from "react";
import "./CartItems.css";
import { useDispatch } from "react-redux";

const Details3Colums = ({ col1, col2, col3 }) => {
  return (
    <div className="cart-item__details">
      <div className="cart-item__details-image">{col1}</div>
      <div className="cart-item__details-qty">{col2}</div>
      <div className="cart-item__details-price">{col3}</div>
    </div>
  );
};

const CartItems = ({ item, cart }) => {
  const dispatch = useDispatch();
  const {
    id,
    name,
    cardmarket: { prices: { averageSellPrice } = {} } = {},
    images: { small, large } = {},
    count,
  } = item;

  const price = averageSellPrice * count;
  const addQty = () => {
    const add = cart.map((cart) => {
      if (cart.id === id) {
        return { ...cart, count: cart.count + 1 };
      }
      return { ...cart };
    });
  };
  const minusQty = () => {
    const cartStorage =
      localStorage.getItem("cart") && JSON.parse(localStorage.getItem("cart"));
    console.log("====================================");
    console.log("minus");
    console.log("====================================");
  };
  return (
    <div className="wrap-cart-item">
      <Details3Colums
        col1={<img src={small} className="image-cart" alt="" />}
        col2={
          <>
            <div>{name}</div>
            <div>${averageSellPrice}</div>
          </>
        }
        col3={<div>$ {price}</div>}
      />
      <div className="cart-item__adjust">
        <div className="cart-item-btn-minus" onClick={minusQty}>
          -
        </div>
        <div className="cart-item-btn-qty">{count}</div>
        <div className="cart-item-btn-plus" onClick={addQty}>
          +
        </div>
      </div>
    </div>
  );
};

export default CartItems;
