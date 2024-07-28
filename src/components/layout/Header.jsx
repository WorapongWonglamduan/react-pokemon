import React, { useEffect, useState } from "react";
import "./Header.css";
import { Img } from "../../assets/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Header = ({ setFilterOptions, setSideBarOpen }) => {
  const [mobileMode, setMobileMode] = useState(window.innerWidth <= 768);
  const [state, setState] = useState({ search: "" });
  const handleResize = () => {
    setMobileMode(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    const delay = setTimeout(() => {
      if (state.search) {
        setFilterOptions((prev) => ({ ...prev, name: state.search, page: 1 }));
      } else {
        setFilterOptions((prev) => ({ ...prev, name: "", page: 1 }));
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [state.search]);
  return (
    <header className="header">
      {mobileMode ? (
        <div className="d-flex justify-content-between align-items-center">
          <div>Pokemon market</div>
          <img
            src={Img.iconCart}
            alt="Cart"
            className="icon-cart"
            onClick={() => setSideBarOpen((prev) => !prev)}
          />
        </div>
      ) : (
        <div>Pokemon market</div>
      )}

      <div className="header___action">
        <nav className="navbar">
          <div className="search-wrapper">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
            <input
              className="search-box"
              name="search"
              type="text"
              placeholder="Search..."
              value={state.search}
              onChange={handleChange}
            />
          </div>
        </nav>
        <div
          className="header__cart"
          onClick={() => setSideBarOpen((prev) => !prev)}
        >
          <img src={Img.iconCart} alt="Cart" className="icon-cart" />
        </div>
      </div>
    </header>
  );
};

export default Header;
