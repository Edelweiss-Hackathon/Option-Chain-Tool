import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import DataTable from "./DataTable";
import Navbar from "./components/Navbar";
//import Selects from "./components/Selects";

const ENDPOINT = "http://localhost:5000/";
var socket;

function App() {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    // Starting socket connection
    socket = io(ENDPOINT);
    socket.emit("getData");
    socket.on("receivedData", (data) => {
      let stringifiedData = JSON.parse(data);

      console.log(stringifiedData);

      setStockData((prevStockData) => {
        const symbolIndex = prevStockData.findIndex(
          (item) => item.symbolName === stringifiedData.symbolName
        );

        if (symbolIndex !== -1) {
          let updatedStockData = [...prevStockData];
          let updatedSymbolData = { ...updatedStockData[symbolIndex] }; // Create a new copy

          if (stringifiedData.type === "PE") {
            if (updatedSymbolData.put) {
              updatedSymbolData.put = [
                ...updatedSymbolData.put,
                { ...stringifiedData },
              ]; // Create a new copy
              updatedSymbolData.put.sort(
                (a, b) => a.strikePrice - b.strikePrice
              );
            } else {
              updatedSymbolData.put = [{ ...stringifiedData }]; // Create a new copy
            }
          } else {
            if (updatedSymbolData.call) {
              updatedSymbolData.call = [
                ...updatedSymbolData.call,
                { ...stringifiedData },
              ]; // Create a new copy
              updatedSymbolData.call.sort(
                (a, b) => a.strikePrice - b.strikePrice
              );
            } else {
              updatedSymbolData.call = [{ ...stringifiedData }]; // Create a new copy
            }
          }

          updatedStockData[symbolIndex] = updatedSymbolData; // Assign the updated copy to the array

          return updatedStockData;
        } else {
          // Symbol doesn't exist, create a new entry
          const newSymbolData = {
            symbolName: stringifiedData.symbolName,
            call: stringifiedData.type === "CE" ? [{ ...stringifiedData }] : [], // Create a new copy
            put: stringifiedData.type === "PE" ? [{ ...stringifiedData }] : [], // Create a new copy
          };

          return [...prevStockData, newSymbolData];
        }
      });
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <Navbar />
      <DataTable optionData={stockData} />
    </div>
  );
}

export default App;
