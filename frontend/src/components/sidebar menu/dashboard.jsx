import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Sidebar from '../sidebar';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const data = {
        labels: ['10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm'],
        datasets: [
            {
                label: 'Sales (₹)',
                data: [300, 400, 450, 600, 300, 150, 100, 700, 200],
                backgroundColor: '#ffc107',
            },
        ],
    };

    const topSellingDishes = [
        { name: 'Paneer Tikka Masala', pricePerPlate: 720, totalSales: 28800, platesSold: 20 },
        { name: 'Veg Biryani', pricePerPlate: 650, totalSales: 29250, platesSold: 45 },
        { name: 'Malai Kofta', pricePerPlate: 850, totalSales: 25500, platesSold: 30 },
        { name: 'Spinach and Corn', pricePerPlate: 950, totalSales: 19000, platesSold: 20 },
        { name: 'Aloo Paratha & Curd', pricePerPlate: 250, totalSales: 18750, platesSold: 75 }
    ];

    const data2 = {
        labels: topSellingDishes.map(dish => dish.name),
        datasets: [
            {
                label: 'Sales (₹)',
                data: topSellingDishes.map(dish => dish.totalSales),
                backgroundColor: '#ffc107',
                borderColor: '#ffc107',
                borderWidth: 1,
            },
        ],
    };

    // Chart options
    const options2 = {
        indexAxis: 'y',  // This makes it a horizontal bar chart
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => `₹${value.toLocaleString()}`  // Format x-axis as currency
                },
                grid: {
                    display: false,  // Removes vertical grid lines
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: false,  // Removes horizontal grid lines
                }
            },
        },
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,  // Removes vertical grid lines
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: false,  // Removes horizontal grid lines
                }
            },
        },
    };

    return (
        <>
            <Sidebar />

            <div className="admin-panel-dashboard-container">
                <header className="admin-panel-dashboard-header">
                    <div className="header-left">
                        <h1>Dashboard</h1>
                        <p>The Spring</p>
                    </div>
                    <div className="admin-panel-dashboard-header-actions">
                        <div className="admin-panel-dashboard-icons">
                            <img src="/notification.svg" alt="" style={{ height: '2.5rem', marginRight: '30px' }} />
                            <img src="/pfp1.svg" alt="User Avatar" className="admin-panel-dashboard-avatar" /> <span style={{ fontSize: '1.4rem', marginLeft: '10px', fontWeight: 'bold' }}>User Name</span>
                        </div>
                    </div>
                </header>

                <section className="admin-panel-dashboard-overview">
                    <div className="admin-panel-dashboard-stat">
                        <h3>Total Order</h3>
                        <p>120</p>
                        <small>+2% more than yesterday</small>
                    </div>
                    <div className="admin-panel-dashboard-stat">
                        <h3>Total Sales</h3>
                        <p>₹50,000</p>
                    </div>
                    <div className="admin-panel-dashboard-stat">
                        <h3>Average Order</h3>
                        <p>₹420</p>
                    </div>
                    <div className="admin-panel-dashboard-stat">
                        <h3>Processing Orders</h3>
                        <p>5</p>
                    </div>
                </section>

                <section className="admin-panel-dashboard-graphs">
                    <section className="admin-panel-dashboard-sales-performance">
                        <h3>Sales Performance</h3>
                        <Bar data={data} options={options} />
                    </section>
                    <section className="admin-panel-dashboard-top-selling">
                        <h3>Top Selling Dishes</h3>
                        <Bar data={data2} options={options2} />
                    </section>
                </section>
            </div>
        </>
    );
};

export default Dashboard;