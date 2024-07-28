import React, { useState, useEffect, useMemo } from "react";
import "./SideBar.css";
import CartItems from "../card/CartItems";
import { Img } from "../../assets/image";
import { useSelector } from "react-redux";

const SideBar = ({ sideBarOpen, setSideBarOpen }) => {
  const cart = useSelector((state) => state.cart);
  const memoizedCart = useMemo(() => cart, [cart]);

  const [cartState, setCartState] = useState([]);

  const getData = () => {
    setCartState(memoizedCart);
  };

  useEffect(() => {
    if (sideBarOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [sideBarOpen]);

  const toggleSidebar = () => {
    setSideBarOpen((prev) => !prev);
  };
  useEffect(() => {
    getData();
  }, [cart]);
  return (
    <>
      <div
        className={`overlay ${sideBarOpen ? "active" : ""}`}
        onClick={toggleSidebar}
      >
        <div
          className={`sidebar ${sideBarOpen ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="sidebar_head-content">
            <div>
              <div className="sidebar_head-title">Cart</div>
              <div>clear all</div>
            </div>
            <img
              src={Img.iconCartClose}
              className="icon-cart-close"
              onClick={toggleSidebar}
              alt=""
            />
          </div>
          <div className="sidebar__list">
            <div className="sidebar__list-head">
              <div className="sidebar__list-col1">Item</div>
              <div className="sidebar__list-col2">Qty</div>
              <div className="sidebar__list-col3">Price</div>
            </div>
            <div className="sidebar__list-cart">
              {cartState &&
                cartState.map((item, index) => (
                  <div key={index}>
                    <CartItems
                      item={item}
                      setCartState={setCartState}
                      cart={cart}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="sidebar__action">
            <button className="btn-checkout">Continue Payment</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
