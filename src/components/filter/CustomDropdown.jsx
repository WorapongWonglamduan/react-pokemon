import React, { useState } from "react";
import "./CustomDropdown.css";

const CustomDropdown = ({ options, value, onChange, placeholder }) => {
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
      </div>
      {isOpen && (
        <div className="custom-dropdown__list">
          {options.map((option, index) => (
            <div
              key={index}
              className="custom-dropdown__option"
              onClick={() => handleSelect(option.id)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
