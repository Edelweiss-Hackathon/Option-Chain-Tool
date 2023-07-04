const express = require("express");
const net = require("net");
const { calculateImpliedVolatility } = require("./utils/iv");
const { getStockDetails, checkUnderlying } = require("./utils/helperFunctions");
const { LocalStorage } = require("node-localstorage");
const { TTM_Calc } = require("./utils/ttm");
const localStorage = new LocalStorage("./localStorage");

const app = express();
const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`App is running of port ${port}...`);
});

// Requiring socket.io which returns a function which needs to be called with the server parameter
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket");

  socket.on("getData", () => {
    var client = net.connect(3300, "localhost", () => {
      console.log("Connected to server");
    });

    client.on("data", async (data) => {
      let buff = Buffer.from(data);
      let symbolName = buff
        .subarray(4, 30)
        .toString()
        .replaceAll("\x00", "")
        .trim();

      let stockData = {};

      if (
        !symbolName.includes("�") ||
        !symbolName.includes("%") ||
        !symbolName.includes("~") ||
        !symbolName.endsWith("X") ||
        !symbolName.endsWith(".")
      ) {
        //check if underlying hai ya PE CE
        let isUnderlying = checkUnderlying(symbolName);
        //if underlying
        if (isUnderlying) {
          // stored data
          let ltp = buff.readBigInt64LE(50) / BigInt(100);
          //get to check if exits
          const underlyingIndex = localStorage.getItem(symbolName);

          if (!underlyingIndex) {
            //if not then create
            let obj = {
              lastTradedPrice: ltp,
              updatedAt: new Date(),
            };
            localStorage.setItem(
              symbolName,
              JSON.stringify(
                obj,
                (key, value) =>
                  typeof value === "bigint" ? value.toString() : value // return everything else unchanged
              )
            );
          } else {
            //
            try {
            } catch (err) {
              if (!symbolName.includes(".")) {
                let obj = {
                  lastTradedPrice: ltp,
                  updatedAt: new Date(),
                };
                localStorage.setItem(
                  symbolName,
                  JSON.stringify(
                    obj,
                    (key, value) =>
                      typeof value === "bigint" ? value.toString() : value // return everything else unchanged
                  )
                );
              }
            }
          }
        } else {
          //PE CE
          const [option_name, day, month, year, value, type] =
            getStockDetails(symbolName);

          const underlyingIndex = JSON.parse(localStorage.getItem(option_name));
          let underlyingIndexLTP = underlyingIndex?.lastTradedPrice;
          console.log(option_name, underlyingIndexLTP);

          var monthAbbreviations = {
            JAN: 0,
            FEB: 1,
            MAR: 2,
            APR: 3,
            MAY: 4,
            JUN: 5,
            JUL: 6,
            AUG: 7,
            SEP: 8,
            OCT: 9,
            NOV: 10,
            DEC: 11,
          };
          var expiryDate = new Date();

          console.log(day, month, year);

          expiryDate.setFullYear(Number(`${20}${year}`));
          expiryDate.setMonth(monthAbbreviations[month]);
          expiryDate.setDate(Number(day));

          // calculate iv
          let iv = calculateImpliedVolatility(
            buff.readBigInt64LE(50) / BigInt(100),
            underlyingIndexLTP,
            value,
            0.05,
            (TTM_Calc(expiryDate) / 365).toFixed(2),
            type
          );

          console.log("IV", (iv * 100).toFixed(2));

          stockData = {
            packetLength: buff.readInt32LE(0),
            symbolName: option_name,
            strikePrice: value,
            type,
            iv: (iv * 100).toFixed(2),
            expiryDate: expiryDate,
            SequenceNumber: buff.readBigInt64LE(34),
            Timestamp: new Date(
              parseInt(buff.readBigInt64LE(42))
            ).toISOString(),
            lastTradedPrice: buff.readBigInt64LE(50) / BigInt(100),
            lastTradedQunatity: buff.readBigInt64LE(58),
            volume: buff.readBigInt64LE(66),
            bidPrice: buff.readBigInt64LE(74) / BigInt(100),
            bidQty: buff.readBigInt64LE(82),
            askPrice: buff.readBigInt64LE(90) / BigInt(100),
            askQty: buff.readBigInt64LE(98),
            openInterest: buff.readBigInt64LE(106),
            previousClosePrice: buff.readBigInt64LE(114) / BigInt(100),
            previousOpenInterest: buff.readBigInt64LE(122),
            underlyingIndexLTP: +underlyingIndexLTP,
          };
        }

        console.log(stockData);

        // iv
        // strick price round off
        if (Object.keys(stockData).length > 0) {
          socket.emit(
            "receivedData",
            JSON.stringify(
              stockData,
              (key, value) =>
                typeof value === "bigint" ? value.toString() : value // return everything else unchanged
            )
          );
        }
      }
    });

    client.on("error", (error) => {
      console.error("Socket error:", error);
    });

    // Handle socket closure
    client.on("close", () => {
      console.log("Socket connection closed");
    });

    var ret = client.write("Hello from node.js\n");
    console.log("Wrote", ret);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});
