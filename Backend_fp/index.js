const express = require("express");
const http = require("http");
const { setupSocket } = require("./config/socket");

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
setupSocket(server);

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
