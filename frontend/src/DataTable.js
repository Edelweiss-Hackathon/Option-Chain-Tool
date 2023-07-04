import React, { useEffect, useState } from "react";
import "./App.css";

const DataTable = ({ optionData }) => {
  const [selectedValue, setSelectedValue] = useState("MAINIDX");
  const [selectedData, setSelectedData] = useState({ call: [], put: [] });

  let previousDifference = Number.MAX_SAFE_INTEGER;
  let currentDifference = 0;
  let underlyingIndex =
    selectedData?.call[selectedData?.call.length - 1]?.underlyingIndexLTP;
  let moneyFlow = true;

  // console.log("hello");

  // Function to handle select option change
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
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
      <select value={selectedValue} onChange={handleSelectChange}>
        <option key={"MAINIDX"} value={"MAINIDX"}>
          MAINIDX
        </option>
        <option key={"ALLBANKS"} value={"ALLBANKS"}>
          ALLBANKS
        </option>
        <option key={"MIDCAP"} value={"MIDCAP"}>
          MIDCAP
        </option>
        <option key={"FINANCIALS"} value={"FINANCIALS"}>
          FINANCIALS
        </option>
      </select>

      <h2>
        {selectedData?.call[selectedData?.call.length - 1]?.underlyingIndexLTP}
      </h2>
      <h2>
        {selectedData?.put[[selectedData?.put.length - 1]]?.underlyingIndexLTP}
      </h2>

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
                    if (index === 0) {
                      previousDifference = Number.MAX_SAFE_INTEGER;
                      currentDifference = Math.abs(
                        underlyingIndex - item.strikePrice
                      );
                    } else {
                      previousDifference = currentDifference;
                      currentDifference = Math.abs(
                        underlyingIndex - item.strikePrice
                      );
                    }

                    if (moneyFlow) {
                      atm = previousDifference >= currentDifference;
                      if (!atm) {
                        moneyFlow = false;
                      }
                    }

                    return (
                      <tr
                        key={index}
                        style={{
                          backgroundColor:
                            moneyFlow && selectedData.call.length > 1
                              ? "grey"
                              : "white",
                        }}>
                        <td>{item?.openInterest}</td>
                        <td>-</td>
                        <td>{item.volume}</td>
                        <td>{item?.iv ? item.iv : 0}</td>
                        <td>{item?.lastTradedPrice}</td>
                        <td>-</td>
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
                  <tr>
                    <th colspan='11' class='th' style={{ textAlign: "center" }}>
                      PUTS
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

                  {selectedData.put.map((item, index) => (
                    <tr key={index}>
                      <td>{item?.openInterest}</td>
                      <td>-</td>
                      <td>{item.volume}</td>
                      <td>{item?.iv ? item.iv : 0}</td>
                      <td>{item?.lastTradedPrice}</td>
                      <td>-</td>
                      <td>{item?.bidQty}</td>
                      <td>{item?.bidPrice}</td>
                      <td>{item?.askPrice}</td>
                      <td>{item?.askQty}</td>
                      <td>{item?.strikePrice}</td>
                    </tr>
                  ))}
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
