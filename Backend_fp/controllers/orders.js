const {
  emitOrderUpdates,
  createOrMergeOrder,
  updateOrderStatus,
} = require("../services/orderService");

async function handleSocketEvents(io, socket) {
  // Emit initial order updates
  await emitOrderUpdates(io);

  // Handle "newOrder" event
  socket.on("newOrder", async (orderData) => {
    try {
      await createOrMergeOrder(orderData);
      await emitOrderUpdates(io);
    } catch (error) {
      console.error("Error handling new order:", error);
    }
  });

  // Handle "updateOrderStatus" event
  socket.on("updateOrderStatus", async ({ orderId, status }) => {
    try {
      await updateOrderStatus(orderId, status);
      await emitOrderUpdates(io);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  });
}

module.exports = { handleSocketEvents };
