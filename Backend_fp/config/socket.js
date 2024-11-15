const { Server } = require("socket.io");
const { handleSocketEvents } = require("../controllers/orders");

function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A client connected:", socket.id);

    // Handle all socket events
    handleSocketEvents(io, socket);

    socket.on("disconnect", () => {
      console.log("A client disconnected:", socket.id);
    });
  });
}

module.exports = { setupSocket };
