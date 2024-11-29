import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

// Socket.IO connection
const socket = io('http://localhost:3000');

// Order List Component
const OrderList = ({ onSelectOrder }) => {
    const [orders, setOrders] = useState({
        newOrders: [],
        inProgressOrders: [],
        completedOrders: [],
    });

    useEffect(() => {
        socket.on('orderUpdate', (data) => {
            setOrders({
                newOrders: data.newOrders,
                inProgressOrders: data.preparingOrders,
                completedOrders: data.finishedOrders,
            });
        });

        return () => {
            socket.off('orderUpdate');
        };
    }, []);

    const handleOrderClick = (order) => {
        // Fetch order details when an order is clicked
        axios.get(`/order/${order.order_id}`) // API call to fetch order details
            .then((response) => {
                const orderDetails = response.data; // Data from the backend
                onSelectOrder({ ...order, order_items: orderDetails }); // Pass the order with details
            })
            .catch((error) => {
                console.error("Error fetching order details:", error);
            });
    };

    return (
        <div className="orders">
            <h2 className="order-list-title">Order List</h2>
            <div className="order-section">
                <h3>New Orders</h3>
                <div className="new-order-list-container">
                    {orders.newOrders.map((order) => (
                        <div key={order.order_id} className='user' onClick={() => handleOrderClick(order)}>
                            <span>{order.order_id}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="order-section">
                <h3>In Progress Orders</h3>
                <div className="new-order-list-container">
                    {orders.inProgressOrders.map((order) => (
                        <div key={order.order_id} className='user' onClick={() => handleOrderClick(order)}>
                            <span>{order.order_id}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="order-section">
                <h3>Completed Orders</h3>
                <div className="new-order-list-container">
                    {orders.completedOrders.map((order) => (
                        <div key={order.order_id} className='user' onClick={() => handleOrderClick(order)}>
                            <span>{order.order_id}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderList;
