import React, { useState, useEffect } from "react";
import "./SideBar.css";
import CartItems from "../card/CartItems";
import { Img } from "../../assets/image";

const SideBar = ({ sideBarOpen, setSideBarOpen }) => {
  const data = Array.from({ length: 30 }).map((item, index) => index + 1);

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
            <div className="sidebar_head-title">Cart</div>
            <img
              src={Img.iconCartClose}
              className="icon-cart-close"
              onClick={toggleSidebar}
            />
          </div>
          <div className="sidebar__list">
            <div className="sidebar__list-head">
              <div className="sidebar__list-col1">Item</div>
              <div className="sidebar__list-col2">Qty</div>
              <div className="sidebar__list-col3">Price</div>
            </div>
            <div className="sidebar__list-cart">
              {data.map((item, index) => (
                <div key={index}>
                  <CartItems item={item} />
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
