import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("play-video", (videoUrl) => {
    io.emit("play-on-mac", videoUrl); // Broadcast play-video event
  });

  socket.on("stop-video", (videoUrl) => {
    io.emit("stop-on-mac", videoUrl); // Broadcast stop-video event
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
