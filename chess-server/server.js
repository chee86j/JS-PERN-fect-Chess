const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Adjust for your frontend
  },
});

app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  console.log("New player connected");

  socket.on("move", (move) => {
    socket.broadcast.emit("move", move);
  });

  socket.on("disconnect", () => {
    console.log("Player disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
