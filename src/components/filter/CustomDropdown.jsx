import React, { useState } from "react";
import "./CustomDropdown.css";

const CustomDropdown = ({
  options,
  value,
  onChange,
  placeholder,
  filterSet = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown">
      <div
        className="custom-dropdown__header"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || placeholder}
        <i className={`fas fa-chevron-down ${isOpen ? "open" : ""}`}></i>
      </div>
      <div className={`custom-dropdown__list-wrapper ${isOpen ? "open" : ""}`}>
        <div className="custom-dropdown__list">
          {filterSet
            ? options.map((option, index) => (
                <div
                  key={index}
                  className="custom-dropdown__option"
                  onClick={() => handleSelect(option)}
                >
                  {option.name}
                </div>
              ))
            : options.map((option, index) => (
                <div
                  key={index}
                  className="custom-dropdown__option"
                  onClick={() => handleSelect(option.id)}
                >
                  {option.name}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default CustomDropdown;
