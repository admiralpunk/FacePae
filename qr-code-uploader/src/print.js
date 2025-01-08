import React, { Component } from "react";

class PrintReceipt extends Component {
  triggerPrint = async () => {
    const receiptElement = document.getElementById("receipt");
    if (!receiptElement) {
      alert("Receipt content is missing.");
      return;
    }

    const receiptContent = receiptElement.innerText;
    try {
      await fetch("http://localhost:5000/print", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: receiptContent }),
      });
      alert("Receipt sent to printer!");
    } catch (error) {
      console.error("Error sending receipt to printer:", error);
      alert("Failed to send receipt to printer.");
    }
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f9f9f9",
        }}
      >
        <div
          id="receipt"
          style={{
            border: "1px dashed #000",
            padding: "20px",
            width: "300px",
            background: "#fff",
          }}
        >
          <h2>KOT Receipt</h2>
          <h3>Restaurant Name</h3>
          <p>Address Line</p>
          <hr />
          <div className="details">
            <p>Date/Time: 07:45 PM, 12-Dec-2024</p>
            <p>Order ID: 1023</p>
            <p>Table No: 5</p>
          </div>
          <hr />
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Paneer Butter Masala</td>
                <td>1</td>
                <td>₹250</td>
              </tr>
              <tr>
                <td>Butter Naan</td>
                <td>3</td>
                <td>₹120</td>
              </tr>
              <tr>
                <td>Cold Coffee (No sugar)</td>
                <td>2</td>
                <td>₹300</td>
              </tr>
            </tbody>
          </table>
          <div className="totals">
            <p>Subtotal: ₹670</p>
            <p>SGST (2.5%): ₹33.5</p>
            <p>CGST (2.5%): ₹33.5</p>
            <p>
              <strong>Grand Total: ₹703.5</strong>
            </p>
          </div>
          <hr />
          <div className="footer">
            <p>Thank you for dining with us!</p>
            <p>Visit again soon!</p>
            <p>Powered by Eat'O'Pae</p>
          </div>
        </div>
        <button
          onClick={this.triggerPrint}
          style={{
            position: "fixed",
            bottom: "20px",
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
