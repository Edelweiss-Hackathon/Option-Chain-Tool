import React from "react";
import "./style.css";

const Table = () => {
  React.useEffect(() => {
    const table1 = document.getElementById("optionsTable1");
    const rows1 = Array.from(table1.getElementsByTagName("tr"));
    rows1.shift(); // Remove the header row from the sorting

    rows1.sort((a, b) => {
      const aValue = parseFloat(a.cells[10].textContent.replace(/,/g, ""));
      const bValue = parseFloat(b.cells[10].textContent.replace(/,/g, ""));
      return aValue - bValue;
    });

    rows1.forEach((row) => table1.appendChild(row));

    const table2 = document.getElementById("optionsTable2");
    const rows2 = Array.from(table2.getElementsByTagName("tr"));
    rows2.shift(); // Remove the header row from the sorting

    rows2.sort((a, b) => {
      const aValue = parseFloat(a.cells[10].textContent.replace(/,/g, ""));
      const bValue = parseFloat(b.cells[10].textContent.replace(/,/g, ""));
      return aValue - bValue;
    });

    rows2.forEach((row) => table2.appendChild(row));
  }, []);

  return (
    <div>
      <div id="container">
        {/* <div id="upper">
          <section class="table__header">
            <h1>Option Chain</h1>
            <div class="input-group">
              <input type="search" placeholder="Search Data..." />
              <img src="#" alt="" />
            </div>
            <div class="export__file">
              <label
                for="export-file"
                class="export__file-btn"
                title="Export File"
              ></label>
              <input type="checkbox" id="export-file" />
              <div class="export__file-options">
                <label>Export As &nbsp; &#10140;</label>
                <label for="export-file" id="toPDF">
                  PDF <img src="#" alt="" />
                </label>
                <label for="export-file" id="toJSON">
                  JSON <img src="#" alt="" />
                </label>
                <label for="export-file" id="toCSV">
                  CSV <img src="#" alt="" />
                </label>
                <label for="export-file" id="toEXCEL">
                  EXCEL <img src="#" alt="" />
                </label>
              </div>
            </div>
          </section>
        </div> */}
        <div id="lower">
          <div class="left-div">
            <main class="table">
              <section class="table__body">
                <table id="optionsTable2">
                  <tr>
                    <th colspan="11" class="th" style={{ textAlign: "center" }}>
                      CALLS
                    </th>
                  </tr>
                  <tr class="th">
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
                    <th class="th">STRIKE PRICE</th>
                  </tr>
                  <tr>
                    <td>30</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>1,945.00</td>
                    <td>-</td>
                    <td>500</td>
                    <td>2,102.35</td>
                    <td>2,167.95</td>
                    <td>500</td>
                    <td>17,050.00</td>
                  </tr>
                  <tr>
                    <td>124</td>
                    <td>-</td>
                    <td>3</td>
                    <td>-</td>
                    <td>2,127.05</td>
                    <td>128.60</td>
                    <td>250</td>
                    <td>2,185.70</td>
                    <td>2,227.25</td>
                    <td>5,150</td>
                    <td>17,000.00</td>
                  </tr>
                  <tr>
                    <td>39</td>
                    <td style={{ color: "red" }}>-6</td>
                    <td style={{ color: "green" }}>6</td>
                    <td style={{ color: "gray" }}>-</td>
                    <td>2,056.00</td>
                    <td>136.00</td>
                    <td>1,500</td>
                    <td>2,020.55</td>
                    <td>2,121.80</td>
                    <td style={{ color: "blue" }}>100</td>
                    <td>17,100.00</td>
                  </tr>
                </table>
              </section>
            </main>
          </div>
          <div class="right-div">
            <main class="table">
              <section class="table__body">
                <table id="optionsTable1">
                  <tr>
                    <th colspan="11" class="th" style={{ textAlign: "center" }}>
                      PUTS
                    </th>
                  </tr>
                  <tr class="th">
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
                    <th class="th">STRIKE PRICE</th>
                  </tr>
                  <tr>
                    <td>30</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>1,945.00</td>
                    <td>-</td>
                    <td>500</td>
                    <td>2,102.35</td>
                    <td>2,167.95</td>
                    <td>500</td>
                    <td>17,050.00</td>
                  </tr>
                  <tr>
                    <td>124</td>
                    <td>-</td>
                    <td>3</td>
                    <td>-</td>
                    <td>2,127.05</td>
                    <td>128.60</td>
                    <td>250</td>
                    <td>2,185.70</td>
                    <td>2,227.25</td>
                    <td>5,150</td>
                    <td>17,000.00</td>
                  </tr>
                  <tr>
                    <td>39</td>
                    <td style={{ color: "red" }}>-6</td>
                    <td style={{ color: "green" }}>6</td>
                    <td style={{ color: "gray" }}>-</td>
                    <td>2,056.00</td>
                    <td>136.00</td>
                    <td>1,500</td>
                    <td>2,020.55</td>
                    <td>2,121.80</td>
                    <td style={{ color: "blue" }}>100</td>
                    <td>17,100.00</td>
                  </tr>
                </table>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
