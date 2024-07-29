import React, { useEffect, useState } from "react";
import "./FilterComponent.css";
import { getRarities, getSets, getTypes } from "../api/baseApi";
import CustomDropdown from "./CustomDropdown";

const FilterComponent = ({ filterOptions, setFilterOptions }) => {
  const [filterAction, setFilterAction] = useState({
    types: [],
    rarity: [],
    set: [],
  });

  const getData = async () => {
    const resTypes = await getTypes();
    const resRarities = await getRarities();
    const resSets = await getSets();

    if ((resTypes, resRarities, resSets))
      setFilterAction((prev) => ({
        ...prev,
        types: [{ id: "", name: "Type" }].concat(
          resTypes.map((item) => ({ id: item, name: item }))
        ),
        rarity: [{ id: "", name: "Rarity" }].concat(
          resRarities.map((item) => ({ id: item, name: item }))
        ),
        set: [{ id: "", name: "Set" }].concat(
          resSets.map((item) => ({ id: item.id, name: item.name }))
        ),
      }));
  };

  const handleSelect = (name, value) => {
    setFilterOptions((prev) => {
      if (name === "types" && value === "Type") {
        return { ...prev, [name]: "", page: 1 };
      }
      if (name === "rarity" && value === "Rarity") {
        return { ...prev, [name]: "", page: 1 };
      }

      if (name === "set") {
        if (name === "set" && value === "Set") {
          return { ...prev, set: { id: "", name: "Set" }, page: 1 };
        }

        return { ...prev, set: { id: value.id, name: value.name }, page: 1 };
      }

      return { ...prev, [name]: value, page: 1 };
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="wrap-filter">
      <div className="wrap-filter__title">Choose Card</div>
      <div className="wrap-filter__options">
        <div className="row">
          <div className="col">
            <CustomDropdown
              options={filterAction.types}
              value={filterOptions.types}
              onChange={(value) => handleSelect("types", value)}
              placeholder="Type"
            />
          </div>
          <div className="col">
            <CustomDropdown
              options={filterAction.rarity}
              value={filterOptions.rarity}
              onChange={(value) => handleSelect("rarity", value)}
              placeholder="Rarity"
            />
          </div>
          <div className="col">
            <CustomDropdown
              filterSet
              options={filterAction.set}
              value={filterOptions.set.name}
              onChange={(value) => handleSelect("set", value)}
              placeholder="Set"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
