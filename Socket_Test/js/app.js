const socket = io("http://localhost:3000");

// // Function to render orders in a container
// function renderOrders(containerId, orders) {
//   const container = document.getElementById(containerId);
//   container.innerHTML = ""; // Clear the container
//   orders.forEach((order) => {
//     const orderDiv = document.createElement("div");
//     orderDiv.classList.add("order-card");
//     orderDiv.innerHTML = `
//             <p><strong>Order ID:</strong> ${order.order_id}</p>
//             <p><strong>Details:</strong> ${JSON.stringify(
//               order.order_items.map((item) => item.order_details)
//             )}</p>
//             <p><strong>Status:</strong> ${order.order_items[0].order_status}</p>
//             <button onclick="updateOrderStatus(${
//               order.order_items[0].order_no
//             }, 1)">Move to Preparing</button>
//             <button onclick="updateOrderStatus(${
//               order.order_items[0].order_no
//             }, 2)">Move to Finished</button>
//         `;
//     container.appendChild(orderDiv);
//   });
// }

function renderOrders(containerId, orders, req_status) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear the container

  orders.forEach((order) => {
    // Filter order items based on the requested status
    const filteredItems = order.order_items.filter(
      (item) => item.order_status === req_status
    );

    // Skip rendering this order if no items match the requested status
    if (filteredItems.length === 0) return;

    const orderDiv = document.createElement("div");
    orderDiv.classList.add("order-card");

    // Create an HTML string for all filtered order items
    const orderItemsHTML = filteredItems
      .map((item) => {
        const safeDetails = JSON.stringify(item.order_details).replace(
          /"/g,
          "&quot;"
        );

        return `
          <div class="order-item">
            <p><strong>Item No:</strong> ${item.order_no}</p>
            <p><strong>Details:</strong> ${safeDetails}</p>
            <p><strong>Status:</strong> ${item.order_status}</p>
            <button onclick="updateOrderStatus(${item.order_no}, 1, ${item.order_id}, ${safeDetails})">
              Move to Preparing
            </button>
            <button onclick="updateOrderStatus(${item.order_no}, 2, ${item.order_id}, ${safeDetails})">
              Move to Finished
            </button>
          </div>
        `;
      })
      .join("");

    orderDiv.innerHTML = `
        <p><strong>Order ID:</strong> ${order.order_id}</p>
        <div class="order-items">
          ${orderItemsHTML}
        </div>
    `;

    container.appendChild(orderDiv);
  });
}


// Listen for order updates
socket.on("orderUpdate", (data) => {
  renderOrders("newOrdersContainer", data.newOrders,0);
  renderOrders("preparingOrdersContainer", data.preparingOrders,1);
  renderOrders("finishedOrdersContainer", data.finishedOrders,2);
});

// Emit status update to server
function updateOrderStatus(order_no, status, order_id, order_details) {
  socket.emit("updateOrderStatus", {
    order_no,
    status,
    order_id,
    order_details,
  });
}
