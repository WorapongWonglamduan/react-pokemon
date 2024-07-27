import React from "react";
import "./FilterComponent.css";
const FilterComponent = () => {
  const filterOption = [];
  return (
    <div className="wrap-filter">
      <div>Choose Card</div>
      <div className="wrap-filter__options">
        <div>
          <select name="" id="">
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
          </select>
        </div>
        <div>
          <select name="" id="">
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
          </select>
        </div>
        <div>
          <select name="" id="">
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
