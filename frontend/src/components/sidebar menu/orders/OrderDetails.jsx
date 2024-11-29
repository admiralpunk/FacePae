import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

// Socket.IO connection
const socket = io('http://localhost:3000');

const OrderDetails = ({ order, onStatusChange }) => {
    const [orderDetails, setOrderDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (order && order.order_id) {
                try {
                    setLoading(true);
                    // Make the API call to fetch order details by order ID
                    const response = await axios.get(`http://localhost:3000/api/orders/${order.order_id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,  // Include the token for authentication
                        },
                    });

                    // Assuming the backend returns an array of dish details
                    setOrderDetails(response.data);
                    setLoading(false);
                } catch (error) {
                    setError('Failed to fetch order details');
                    setLoading(false);
                }
            }
        };

        fetchOrderDetails();
    }, [order]); // Trigger the effect whenever the `order` changes

    const updateOrderStatus = (orderId, status) => {
        socket.emit('updateOrderStatus', { orderId, status });
        onStatusChange(orderId, status); // Update the status locally after emitting to backend
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!order) return <div>Please select an order to see the details.</div>;

    return (
        <div className="orderdetails">
            <h2>Order Details</h2>
            <p><strong>Order ID:</strong> {order.order_id}</p>
            <p><strong>Details:</strong>
                {orderDetails.length > 0 ? (
                    orderDetails.map((detail, index) => (
                        <div key={index}>
                            <p><strong>Dish Name:</strong> {detail.dish_name}</p>
                            <p><strong>Quantity:</strong> {detail.quantity}</p>
                            <p><strong>Customization:</strong> {detail.customization || 'None'}</p>
                        </div>
                    ))
                ) : (
                    <p>No details available.</p>
                )}
            </p>

            <button onClick={() => updateOrderStatus(order.order_id, 0)}>
                Move to New
            </button>
            <button onClick={() => updateOrderStatus(order.order_id, 1)}>
                Move to Preparing
            </button>
            <button onClick={() => updateOrderStatus(order.order_id, 2)}>
                Move to Finished
            </button>
        </div>
    );
};

export default OrderDetails;