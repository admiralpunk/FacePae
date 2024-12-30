const {
  emitOrderUpdates,
  mergeOrder,
  updateOrderStatus,
  createOrder,
} = require("../services/orderService");
// const { io } = require("../config/socket");
async function handleSocketEvents(io, socket) {
  // Emit initial order updates
  await emitOrderUpdates(io);

  // Handle "newOrder" event
  socket.on("newOrder", async (orderData) => {
    try {
      await createOrder(orderData);
      await emitOrderUpdates(io);
    } catch (error) {
      console.error("Error handling new order:", error);
    }
  });
  socket.on("requestInitialData", async () => {
    await emitOrderUpdates(io);
  });

  // Handle "updateOrderStatus" event
  socket.on(
    "updateOrderStatus",
    async ({ order_no, status, order_id, order_details }) => {
      console.log("Payload received:", {
        order_no,
        status,
        order_id,
        order_details,
      });
      if (!order_no) {
        console.error("order_no is missing!");
      }
      try {
        ok = await mergeOrder(order_no, status, order_id, order_details);
        if(!ok)
         await updateOrderStatus(order_no, status);
        await emitOrderUpdates(io);
      } catch (error) {
        console.error("Error updating order status:", error);
      }
    }
  );
}

module.exports = { handleSocketEvents };
