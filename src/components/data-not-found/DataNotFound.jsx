import React from "react";
import "./DataNotFound.css";
const DataNotFound = ({
  title = "Data Not Found",
  message = "The data you are looking for does not exist.",
}) => {
  return (
    <div className="container">
      <h1 className="title">{title}</h1>
      <p className="message">{message}</p>
    </div>
  );
};

export default DataNotFound;
