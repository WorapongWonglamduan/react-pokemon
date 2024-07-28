import React, { useEffect, useState } from "react";
import "./FilterComponent.css";
import { getRarities, getSets, getTypes } from "../api/baseApi";
const FilterComponent = ({ filterOptions, setFilterOptions }) => {
  const [filterAction, setFilterAction] = useState({
    types: [],
    rarities: [],
    sets: [],
  });

  const getData = async () => {
    const resTypes = await getTypes();
    const resRarities = await getRarities();
    const resSets = await getSets();

    if ((resTypes, resRarities, resSets))
      setFilterAction((prev) => ({
        ...prev,
        types: resTypes,
        rarities: resRarities,
        sets: resSets.map((item) => ({ id: item.id, name: item.name })),
      }));
  };

  const handleSelect = (e) => {
    const { name, value } = e.target;

    setFilterOptions((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="wrap-filter">
      <div>Choose Card</div>
      <div className="wrap-filter__options">
        <div className="row">
          <div className="col">
            <select
              name="types"
              id="typesSelect"
              className="wrap-filter__select"
              onChange={handleSelect}
              defaultValue={filterOptions.types}
            >
              <option value={""} selected>
                Type
              </option>
              {filterAction.types &&
                filterAction.types.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          </div>
          <div className="col">
            <select
              name="rarity"
              id="raritiesSelect"
              className="wrap-filter__select"
              onChange={handleSelect}
              defaultValue={filterOptions.rarity}
            >
              <option value={""} selected>
                Rarities
              </option>
              {filterAction.rarities &&
                filterAction.rarities.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          </div>
          <div className="col">
            <select
              name="set"
              id="setSelect"
              className="wrap-filter__select"
              onChange={handleSelect}
              defaultValue={filterOptions.set}
            >
              <option value={""} selected>
                Set
              </option>
              {filterAction.sets &&
                filterAction.sets.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
