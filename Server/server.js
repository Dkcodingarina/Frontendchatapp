import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 5000;


const app = express();
const server = http.createServer(app);

//Socket
const io = new Server(server, {
cors: {
origin: ["https://frontendchatapp-pi.vercel.app", "http://localhost:3000"]
  methods: ["GET", "POST"],
},
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log( "send_message", data);
    socket.to(data.room).emit("receive_message", data);
  })
  

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

//Middlewares
app.use(cors());



server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
