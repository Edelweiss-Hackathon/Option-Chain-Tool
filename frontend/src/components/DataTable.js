import React, { useEffect, useState } from "react";
import "../App.css";
import SearchSection from "./SearchSection";

const DataTable = ({ optionData }) => {
  const [selectedValue, setSelectedValue] = useState("MAINIDX");
  const [selectedData, setSelectedData] = useState({ call: [], put: [] });

  let previousDifferenceCall = Number.MAX_SAFE_INTEGER;
  let currentDifferenceCall = 0;
  let previousDifferencePut = Number.MAX_SAFE_INTEGER;
  let currentDifferencePut = 0;

  let underlyingIndex =
    selectedData?.call[selectedData?.call.length - 1]?.underlyingIndexLTP;

  if (!underlyingIndex) {
    underlyingIndex =
      selectedData?.put[selectedData?.put.length - 1]?.underlyingIndexLTP;
  }

  let moneyFlowCall = true;
  let moneyFlowPut = true;

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
      <div id='container'>
        <div id='lower'>
          <div class='left-div'>
            <main class='table'>
              <section class='table__body'>
                <table id='optionsTable2'>
                  <tr>
                    <th colspan='11' class='th' style={{ textAlign: "center" }}>
                      CALLS
                    </th>
                  </tr>
                  <tr class='th'>
                    <th>OI</th>
                    <th>CHNG IN OI</th>
                    <th>VOLUME</th>
                    <th>IV</th>
                    <th>LTP</th>
                    <th>CHNG</th>
                    <th>BID QTY</th>
                    <th>BID</th>
                    <th>ASK</th>
                    <th>ASK QTY</th>
                    <th class='th'>STRIKE PRICE</th>
                  </tr>

                  {selectedData.call.map((item, index) => {
                    let atm = null;
                    let chng = (
                      (item?.lastTradedPrice - item.previousClosePrice) /
                      item.previousClosePrice
                    ).toFixed(2);
                    let chngInOI = (
                      (item?.openInterest - item?.previousOpenInterest) /
                      item?.previousOpenInterest
                    ).toFixed(2);

                    if (!isFinite(chng)) chng = 0;
                    if (isNaN(chng)) chng = 0;
                    if (!isFinite(chngInOI)) chngInOI = 0;
                    if (isNaN(chngInOI)) chngInOI = 0;

                    if (index === 0) {
                      previousDifferenceCall = Number.MAX_SAFE_INTEGER;
                      currentDifferenceCall = Math.abs(
                        underlyingIndex - item.strikePrice
                      );
                    } else {
                      previousDifferenceCall = currentDifferenceCall;
                      currentDifferenceCall = Math.abs(
                        underlyingIndex - item.strikePrice
                      );
                    }

                    if (moneyFlowCall) {
                      atm = previousDifferenceCall >= currentDifferenceCall;
                      if (!atm) {
                        moneyFlowCall = false;
                      }
                    }

                    return (
                      <tr
                        key={index}
                        style={{
                          backgroundColor:
                            moneyFlowCall && selectedData.call.length > 1
                              ? "#f1eed9"
                              : "white",
                        }}>
                        <td>{item?.openInterest}</td>
                        <td>{chngInOI}</td>
                        <td>{item.volume}</td>
                        <td>{item?.iv ? item.iv : 0}</td>
                        <td>{item?.lastTradedPrice}</td>
                        <td style={{ color: chng < 0 ? "red" : "green" }}>
                          {chng ? chng : 0}
                        </td>
                        <td>{item?.bidQty}</td>
                        <td>{item?.bidPrice}</td>
                        <td>{item?.askPrice}</td>
                        <td>{item?.askQty}</td>
                        <td>{item?.strikePrice}</td>
                      </tr>
                    );
                  })}
                </table>
              </section>
            </main>
          </div>
          <div class='right-div'>
            <main class='table'>
              <section class='table__body'>
                <table id='optionsTable1'>
                  <th colspan='11' class='th' style={{ textAlign: "center" }}>
                    PUTS
                  </th>
                  <tr></tr>
                  <tr class='th'>
                    <th class='th'>STRIKE PRICE</th>
                    <th>OI</th>
                    <th>CHNG IN OI</th>
                    <th>VOLUME</th>
                    <th>IV</th>
                    <th>LTP</th>
                    <th>CHNG</th>
                    <th>BID QTY</th>
                    <th>BID</th>
                    <th>ASK</th>
                    <th>ASK QTY</th>
                  </tr>

                  {selectedData.put.map((item, index) => {
                    let atm = null;
                    let chng = (
                      (item?.lastTradedPrice - item.previousClosePrice) /
                      item.previousClosePrice
                    ).toFixed(2);

                    let chngInOI = (
                      (item?.openInterest - item?.previousOpenInterest) /
                      item?.previousOpenInterest
                    ).toFixed(2);

                    if (!isFinite(chng)) chng = 0;
                    if (isNaN(chng)) chng = 0;
                    if (!isFinite(chngInOI)) chngInOI = 0;
                    if (isNaN(chngInOI)) chngInOI = 0;

                    if (index === 0) {
                      previousDifferencePut = Number.MAX_SAFE_INTEGER;
                      currentDifferencePut = Math.abs(
                        underlyingIndex - item.strikePrice
                      );
                    } else {
                      previousDifferencePut = currentDifferencePut;
                      currentDifferencePut = Math.abs(
                        underlyingIndex - item.strikePrice
                      );
                    }

                    if (moneyFlowPut) {
                      atm = previousDifferencePut >= currentDifferencePut;
                      if (!atm) {
                        moneyFlowPut = false;
                      }
                    }

                    if (!isFinite(chng)) chng = 0;

                    return (
                      <tr
                        key={index}
                        style={{
                          backgroundColor:
                            moneyFlowPut && selectedData.put.length > 2
                              ? "white"
                              : "#f1eed9",
                        }}>
                        <td>{item?.strikePrice}</td>
                        <td>{item?.openInterest}</td>
                        <td>{chngInOI}</td>
                        <td>{item.volume}</td>
                        <td>{item?.iv ? item.iv : 0}</td>
                        <td>{item?.lastTradedPrice}</td>
                        <td style={{ color: chng < 0 ? "red" : "green" }}>
                          {chng ? chng : 0}
                        </td>
                        <td>{item?.bidQty}</td>
                        <td>{item?.bidPrice}</td>
                        <td>{item?.askPrice}</td>
                        <td>{item?.askQty}</td>
                      </tr>
                    );
                  })}
                </table>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
