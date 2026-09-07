import { Server } from "socket.io";

let io;

export const initSocket = (server) => {

  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    // =========================
    // JOIN USER ROOM
    // =========================
    socket.on("join", (userId) => {

      socket.join(userId);

      console.log(`User ${userId} joined room`);
    });

    // =========================
    // CHAT MESSAGE
    // =========================
    socket.on("sendMessage", (data) => {

      const { receiverId, message } = data;

      io.to(receiverId).emit("receiveMessage", {
        senderId: data.senderId,
        message,
      });
    });

    // =========================
    // TYPING
    // =========================
    socket.on("typing", (data) => {

      io.to(data.receiverId).emit("typing", {
        senderId: data.senderId,
      });
    });

    // =========================
    // STOP TYPING
    // =========================
    socket.on("stopTyping", (data) => {

      io.to(data.receiverId).emit("stopTyping", {
        senderId: data.senderId,
      });
    });

    // =========================
    // DISCONNECT
    // =========================
    socket.on("disconnect", () => {

      console.log("User disconnected:", socket.id);
    });
  });
};

export const getIO = () => io;