const express = require("express");
const http = require("http");
const { setupSocket } = require("./config/socket");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const restaurantRoutes = require("./routes/restaurantRoutes");
// Initialize Socket.IO
setupSocket(server);
app.use(express.json());
app.use(cors({ origin: true }));
// Start the server
const PORT = process.env.PORT || 3000;
app.use("/api", restaurantRoutes);
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});