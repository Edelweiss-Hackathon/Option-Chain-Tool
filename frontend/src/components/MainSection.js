import React, { useEffect, useState } from "react";
import "../App.css";
import SearchSection from "./SearchSection";
import IndexValue from "./IndexValue";
import TableContainer from "./TableContainer";

const MainSection = ({ optionData }) => {
  const [selectedValue, setSelectedValue] = useState("MAINIDX");
  const [selectedData, setSelectedData] = useState({ call: [], put: [] });

  let underlyingIndex =
    selectedData?.call[selectedData?.call.length - 1]?.underlyingIndexLTP;

  if (!underlyingIndex) {
    underlyingIndex =
      selectedData?.put[selectedData?.put.length - 1]?.underlyingIndexLTP;
  }

  useEffect(() => {
    handleSelectChange(selectedValue);
  }, [optionData]);

  // console.log("hello");

  // Function to handle select option change
  const handleSelectChange = (selectedValue) => {
    setSelectedValue(selectedValue);

    // Find the selected object in the array
    const selectedObject = optionData.find(
      (obj) => obj.symbolName === selectedValue
    );

    // Set the selected data based on the object
    if (selectedObject) {
      setSelectedData(selectedObject);
    } else {
      setSelectedData({ call: [], put: [] });
    }
  };

  return (
    <div>
      <SearchSection value={selectedValue} onChange={handleSelectChange} />
      <IndexValue
        underlyingIndex={underlyingIndex}
        selectedValue={selectedValue}
      />
      <TableContainer selectedData={selectedData} />
    </div>
  );
};

export default MainSection;
