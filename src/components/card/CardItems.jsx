import React from "react";

const CardItems = ({ item }) => {
  console.log("====================================");
  console.log("item->", item);
  console.log("====================================");
  const { name } = item;
  return <div>CardItems {name} </div>;
};

export default CardItems;
