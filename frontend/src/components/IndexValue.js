import React from "react";
import "../App.css";

const IndexValue = ({ underlyingIndex, selectedValue }) => {
  return (
    <>
      {underlyingIndex && (
        <div
          style={{
            display: "flex",
            padding: "0 2rem 1rem 2.8rem",
            gap: "0.5rem",
            fontSize: "1.5rem",
          }}>
          <p>Underlying Index:</p>
          <p style={{ fontWeight: "bold" }}>{selectedValue}</p>
          <p style={{ fontWeight: "bold" }}>{underlyingIndex}</p>
        </div>
      )}
    </>
  );
};

export default IndexValue;
