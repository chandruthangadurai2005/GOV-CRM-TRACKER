const { io } = require("socket.io-client");

const socket = io("http://localhost:5011");

socket.on("connect", () => {
  console.log("Connected:", socket.id);
});

socket.on("gpsUpdate", (data) => {
  console.log("Live GPS Update:", data);
});
