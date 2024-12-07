import React, { Component } from "react";

class PrintReceipt extends Component {
  triggerPrint = () => {
    // Create a new printable window
    const printWindow = window.open("", "_blank");
    const receiptContent = document.getElementById("receipt").outerHTML;

    // Add content to the new window
    printWindow.document.open();
    printWindow.document.write(`
      <html>
      <head>
        <title>Receipt</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
          }
          #receipt {
            border: 1px solid #ddd;
            padding: 20px;
            max-width: 400px;
            margin: auto;
          }
          h2, h3, p {
            margin: 5px 0;
          }
          .details {
            margin-bottom: 10px;
          }
          .order-list {
            margin-bottom: 10px;
          }
          .order-list ol {
            padding-left: 20px;
          }
          .order-list li {
            margin-bottom: 5px;
          }
        </style>
      </head>
      <body onload="window.print(); window.close();">
        ${receiptContent}
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  render() {
    return (
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        {/* The printable content */}
        <div
          id="receipt"
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            maxWidth: "400px",
            margin: "auto",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Restaurant Name</h2>
          <h3 style={{ textAlign: "center" }}>Order Receipt</h3>
          <div className="details">
            <p>
              <strong>Table No:</strong> 5
            </p>
            <p>
              <strong>Order No:</strong> 1023
            </p>
          </div>
          <div className="order-list">
            <ol>
              <li>
                Paneer Butter Masala x 1 <em>(Serve hot)</em>
              </li>
              <li>
                Butter Naan x 3 <em>(With curry)</em>
              </li>
              <li>
                Cold Coffee x 2 <em>(No sugar)</em>
              </li>
            </ol>
          </div>
          <div className="time">
            <p>
              <strong>Time:</strong> 07:45 PM
            </p>
          </div>
        </div>
        {/* Print button */}
        <button
          onClick={this.triggerPrint}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          PRINT RECEIPT
        </button>
      </div>
    );
  }
}

export default PrintReceipt;
