import React, { useState } from "react";
import axios from "axios";

const QRCodeUpload = () => {
  const [image, setImage] = useState(null);
  const [uploadedQRCodeUrl, setUploadedQRCodeUrl] = useState(null); // To store the QR code URL
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setMessage("");
    setError("");
    setUploadedQRCodeUrl(null); // Clear the displayed QR code when a new file is selected
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

      // Set the uploaded QR code URL (assuming the API returns it)
      if (response.data.qrCodeUrl) {
        setUploadedQRCodeUrl(response.data.qrCodeUrl);
      }
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

      {/* Display the uploaded QR code */}
      {uploadedQRCodeUrl && (
        <div style={{ marginTop: "20px" }}>
          <h2>Uploaded QR Code:</h2>
          <img
            src={uploadedQRCodeUrl}
            alt="Uploaded QR Code"
            style={{ width: "200px", height: "200px" }}
          />
        </div>
      )}
    </div>
  );
};

export default QRCodeUpload;
