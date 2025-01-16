import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./styles.css";

// Create socket connection outside component to prevent multiple connections
const socket = io("http://localhost:3000");

const Orders = () => {
  const [newOrders, setNewOrders] = useState([]);
  const [preparingOrders, setPreparingOrders] = useState([]);
  const [finishedOrders, setFinishedOrders] = useState([]);

  const updateOrderStatus = (orderNo, status, orderId, orderDetails) => {
    socket.emit("updateOrderStatus", {
      order_no: orderNo,
      status,
      order_id: orderId,
      order_details: orderDetails,
    });
  };

  useEffect(() => {
    // Listen for order updates
    const handleOrderUpdate = (data) => {
      setNewOrders(data.newOrders);
      setPreparingOrders(data.preparingOrders);
      setFinishedOrders(data.finishedOrders);
    };

    socket.on("orderUpdate", handleOrderUpdate);

    // Set up polling interval
    const intervalId = setInterval(() => {
      socket.emit("requestInitialData");
    }, 5000); // 5000ms = 5 seconds

    // Initial data request
    socket.emit("requestInitialData");

    // Cleanup socket listeners and interval when component unmounts
    return () => {
      socket.off("orderUpdate", handleOrderUpdate);
      clearInterval(intervalId);
    };
  }, []); // Remove socket from dependencies array

  return (
    <div>
      <h1>Order Panel</h1>
      <OrderSection
        title="New Orders"
        orders={newOrders}
        reqStatus={0}
        onUpdateStatus={updateOrderStatus}
      />
      <OrderSection
        title="Preparing Orders"
        orders={preparingOrders}
        reqStatus={1}
        onUpdateStatus={updateOrderStatus}
      />
      <OrderSection
        title="Finished Orders"
        orders={finishedOrders}
        reqStatus={2}
        onUpdateStatus={updateOrderStatus}
      />
    </div>
  );
};

const OrderSection = ({ title, orders, reqStatus, onUpdateStatus }) => {
  return (
    <div className={`order-section ${title.replace(" ", "").toLowerCase()}`}>
      <h2>{title}</h2>
      <div className="order-container">
        {orders.map((order) => (
          <OrderCard
            key={order.order_id}
            order={order}
            reqStatus={reqStatus}
            onUpdateStatus={onUpdateStatus}
          />
        ))}
      </div>
    </div>
  );
};

const OrderCard = ({ order, reqStatus, onUpdateStatus }) => {
  // Filter order items based on the requested status
  const filteredItems = order.order_items.filter(
    (item) => item.order_status === reqStatus
  );

  if (filteredItems.length === 0) {
    return null;
  }

  return (
    <div className="order-card">
      <p>
        <strong>Order ID:</strong> {order.order_id}
      </p>
      <div className="order-items">
        {filteredItems.map((item) => (
          <div className="order-item" key={item.order_no}>
            <p>
              <strong>Item No:</strong> {item.order_no}
            </p>
            <p>
              <strong>Details:</strong> {JSON.stringify(item.order_details)}
            </p>
            <p>
              <strong>Status:</strong> {item.order_status}
            </p>
            <button
              onClick={() =>
                onUpdateStatus(
                  item.order_no,
                  1,
                  order.order_id,
                  item.order_details
                )
              }
            >
              Move to Preparing
            </button>
            <button
              onClick={() =>
                onUpdateStatus(
                  item.order_no,
                  2,
                  order.order_id,
                  item.order_details
                )
              }
            >
              Move to Finished
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
