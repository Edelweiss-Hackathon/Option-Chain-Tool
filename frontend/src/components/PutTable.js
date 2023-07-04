import React from "react";
import "../App.css";
const PutTable = ({ selectedData }) => {
  let previousDifferencePut = Number.MAX_SAFE_INTEGER;
  let currentDifferencePut = 0;

  let underlyingIndex =
    selectedData?.call[selectedData?.call.length - 1]?.underlyingIndexLTP;

  if (!underlyingIndex) {
    underlyingIndex =
      selectedData?.put[selectedData?.put.length - 1]?.underlyingIndexLTP;
  }

  let moneyFlowPut = true;

  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
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
              <th>BID QTY</th>
              <th>BID</th>
              <th>ASK</th>
              <th>ASK QTY</th>
              <th>CHNG</th>
              <th>LTP</th>
              <th>IV</th>
              <th>VOLUME</th>
              <th>CHNG IN OI</th>
              <th>OI</th>
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
                  <td>{numberWithCommas(item?.strikePrice)}</td>
                  <td>{numberWithCommas(item?.bidQty)}</td>
                  <td>{numberWithCommas(item?.bidPrice)}</td>
                  <td>{numberWithCommas(item?.askPrice)}</td>
                  <td>{numberWithCommas(item?.askQty)}</td>
                  <td style={{ color: chng < 0 ? "red" : "green" }}>
                    {chng ? chng : 0}
                  </td>
                  <td>{numberWithCommas(item?.lastTradedPrice)}</td>
                  <td>{numberWithCommas(item?.iv ? item.iv : 0)}</td>
                  <td>{numberWithCommas(item.volume)}</td>
                  <td>{numberWithCommas(chngInOI)}</td>
                  <td>{numberWithCommas(item?.openInterest)}</td>
                </tr>
              );
            })}
          </table>
        </section>
      </main>
    </div>
  );
};

export default PutTable;
