const socket = io("http://localhost:3000");

// Function to render orders in a container
function renderOrders(containerId, orders) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear the container
  orders.forEach((order) => {
    const orderDiv = document.createElement("div");
    orderDiv.classList.add("order-card");
    orderDiv.innerHTML = `
            <p><strong>Order ID:</strong> ${order.order_id}</p>
            <p><strong>Details:</strong> ${JSON.stringify(
              order.order_items.map((item) => item.order_details)
            )}</p>
            <p><strong>Status:</strong> ${order.order_items[0].order_status}</p>
            <button onclick="updateOrderStatus(${
              order.order_id
            }, 1)">Move to Preparing</button>
            <button onclick="updateOrderStatus(${
              order.order_id
            }, 2)">Move to Finished</button>
        `;
    container.appendChild(orderDiv);
  });
}

// Listen for order updates
socket.on("orderUpdate", (data) => {
  renderOrders("newOrdersContainer", data.newOrders);
  renderOrders("preparingOrdersContainer", data.preparingOrders);
  renderOrders("finishedOrdersContainer", data.finishedOrders);
});

// Emit status update to server
function updateOrderStatus(orderId, status) {
  socket.emit("updateOrderStatus", { orderId, status });
}
