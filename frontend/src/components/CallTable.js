import React from "react";
import "../App.css";

const CallTable = ({ selectedData }) => {
  let previousDifferenceCall = Number.MAX_SAFE_INTEGER;
  let currentDifferenceCall = 0;

  let underlyingIndex =
    selectedData?.call[selectedData?.call.length - 1]?.underlyingIndexLTP;

  if (!underlyingIndex) {
    underlyingIndex =
      selectedData?.put[selectedData?.put.length - 1]?.underlyingIndexLTP;
  }

  let moneyFlowCall = true;

  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
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
                  <td>{numberWithCommas(item?.openInterest)}</td>
                  <td>{numberWithCommas(chngInOI)}</td>
                  <td>{numberWithCommas(item.volume)}</td>
                  <td>{numberWithCommas(item?.iv ? item.iv : 0)}</td>
                  <td>{numberWithCommas(item?.lastTradedPrice)}</td>
                  <td style={{ color: chng < 0 ? "red" : "green" }}>
                    {chng ? chng : 0}
                  </td>
                  <td>{numberWithCommas(item?.bidQty)}</td>
                  <td>{numberWithCommas(item?.bidPrice)}</td>
                  <td>{numberWithCommas(item?.askPrice)}</td>
                  <td>{numberWithCommas(item?.askQty)}</td>
                  <td>{numberWithCommas(item?.strikePrice)}</td>
                </tr>
              );
            })}
          </table>
        </section>
      </main>
    </div>
  );
};

export default CallTable;
