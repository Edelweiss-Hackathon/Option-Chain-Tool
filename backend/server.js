// const express = require("express");
// const { execSync, spawn } = require("child_process");

// const app = express();
// const port = process.env.PORT || 5000;

// function executeJarFile() {
//   try {
//     const options = {
//       encoding: "utf-8",
//       maxBuffer: 1024 * 1024, // 1MB buffer size, adjust as needed
//     };
//     const output = execSync(
//       `java -Ddebug=true -Dspeed=2.0 -classpath utils/feed-play.jar hackathon.player.Main utils/dataset.csv 3300`,
//       options
//     ).toString();
//     // Process the output as per your requirements

//     output.stdout.on("data", (data) => {
//       // const res = encoding.convert(data, 'ASCII', 'UTF-8');
//       const res = JSON.parse(JSON.stringify(data));
//       // const res = utf8.decode(byteString)
//       // const outputData = res.toJSON();
//       console.log(res);
//       //socket.emit("output", res);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// const server = app.listen(port, () => {
//   console.log(`App is running of port ${port}...`);
// });

// // Requiring socket.io which returns a function which needs to be called with the server parameter
// const io = require("socket.io")(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

// io.on("connection", (socket) => {
//   console.log("connected to socket");

//   // Spawing a JAR file process
//   // const jar_process = spawn("java", [
//   //   "./utils/feed-play.jar",
//   //   "./utils/dataset.csv",
//   //   "3300",
//   // ]);
//   executeJarFile();

//   const jar_process = spawn("java", ["-jar", "./utils/feed-play.jar"]);

//   jar_process.stdout.on("data", (data) => {
//     // const res = encoding.convert(data, 'ASCII', 'UTF-8');
//     const res = JSON.parse(JSON.stringify(data));
//     // const res = utf8.decode(byteString)
//     // const outputData = res.toJSON();
//     console.log(res);
//     soc.emit("output", res);
//   });

//   socket.on("disconnect", () => {
//     jar_process.kill();
//     console.log("Disconnected");
//   });

//   // socket.on("setup", (userData) => {
//   //   console.log("setupp");
//   //   let output = executeJarFile();
//   //   console.log(JSON.parse(output));
//   // });

//   // socket.on("join room", (user) => {
//   //   socket.join(user.id);
//   // });

//   // socket.on("send notification", (obj) => {
//   //   socket.in(obj.jobHunterId).emit("recieve", {
//   //     ...obj,
//   //     content: `A recruiter viewed your ${obj.action}`,
//   //   });
//   // });
// });

var net = require("net");

var client = net.connect(3300, "localhost", () => {
  console.log("Connected to server");
});

client.on("data", (data) => {
  // Handle incoming data
  console.log("Received data:", data.toString("utf-8"));
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
