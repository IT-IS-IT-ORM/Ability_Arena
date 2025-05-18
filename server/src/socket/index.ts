import { type Server } from "socket.io";

export const ioLogic = (io: Server) => {
  console.log("rooms: ", io.sockets.adapter.rooms);

  io.on("connection", (socket) => {
    console.log(
      "a user connected, all user count: ",
      io.engine.clientsCount,
      socket.id
    );

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
