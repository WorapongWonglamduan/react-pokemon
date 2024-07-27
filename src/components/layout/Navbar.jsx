import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Img } from "../../assets/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ user }) => {
  const [mobileMode, setMobileMode] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setMobileMode(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  console.log("====================================");
  console.log("mobileMode", mobileMode);
  console.log("====================================");
  return (
    <header className="header">
      {mobileMode ? (
        <div className="d-flex justify-content-between align-items-center">
          <div>Pokemon market</div>
          <img src={Img.iconCart} alt="Cart" className="icon-cart" />
        </div>
      ) : (
        <div>Pokemon market</div>
      )}

      <div className="header___action">
        <nav className="navbar">
          <div className="search-wrapper">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
            <input className="search-box" type="text" placeholder="Search..." />
          </div>
        </nav>
        <div className="header__cart">
          <img src={Img.iconCart} alt="Cart" className="icon-cart" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
