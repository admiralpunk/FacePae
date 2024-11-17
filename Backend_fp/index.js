const express = require("express");
const http = require("http");
const { setupSocket } = require("./config/socket");

const app = express();
const server = http.createServer(app);
const restaurantRoutes = require("./routes/restaurantRoutes");
// Initialize Socket.IO
setupSocket(server);
app.use(express.json());
// Start the server
const PORT = process.env.PORT || 3000;
app.use("/api", restaurantRoutes);
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
