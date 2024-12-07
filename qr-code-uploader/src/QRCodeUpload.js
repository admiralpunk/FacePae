import React, { useState } from "react";
import axios from "axios";

const QRCodeUpload = () => {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setMessage("");
    setError("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError("Please select an image.");
      return;
    }

    // Read JWT token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token not found. Please log in.");
      return;
    }

    // Create FormData to send the image file
    const formData = new FormData();
    formData.append("image", image);

    try {
      // Send the POST request to the API
      const response = await axios.post(
        "http://localhost:3000/api/qr",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Token fetched from localStorage
          },
        }
      );
      setMessage(response.data.message || "QR Code uploaded successfully!");
    } catch (err) {
      setError(
        err.response?.data?.error || "An error occurred while uploading."
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Upload QR Code</h1>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image">Select QR Code Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "block", margin: "10px 0" }}
          />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default QRCodeUpload;
