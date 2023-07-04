import React from "react";
import CallTable from "./CallTable";
import "../App.css";
import PutTable from "./PutTable";

const TableContainer = ({ selectedData }) => {
  return (
    <div id='container'>
      <div id='lower'>
        <CallTable selectedData={selectedData} />
        <PutTable selectedData={selectedData} />
      </div>
    </div>
  );
};

export default TableContainer;
