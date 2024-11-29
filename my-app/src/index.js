import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const App = () => {
  const [dishName, setDishName] = useState("");
  const [dishDescription, setDishDescription] = useState("");
  const [dishCost, setDishCost] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);

  const [imageId, setImageId] = useState(""); // Input for fetching image by ID
  const [imageUrl, setImageUrl] = useState(""); // URL of the fetched image
  const [error, setError] = useState(null); // Error handling

  // Hardcoded JWT Token
  const jwtToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN0YXVyYW50SWQiOjE3LCJlbWFpbCI6InJAZy5pbiIsImlhdCI6MTczMjcyNTA5MSwiZXhwIjoxNzMyNzQzMDkxfQ.7u0Pw9NvxxVbkjEVrQ-W7NnsX_M-gB-huMF5DhJoigI";

  // Upload a new dish
  const handleAddDish = async () => {
    if (!dishName || !dishCost) {
      alert("Dish name and cost are required!");
      return;
    }

    const formData = new FormData();
    formData.append("dish_name", dishName);
    formData.append("dish_description", dishDescription);
    formData.append("dish_cost", dishCost);
    formData.append("category_id", categoryId);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/add-dish",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      alert("Dish added successfully!");
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error adding dish:",
        error.response?.data || error.message
      );
      alert("Failed to add the dish.");
    }
  };

  // Fetch an image by ID
  const fetchImage = async () => {
    setError(null); // Reset error
    if (!imageId) {
      setError("Please provide an image ID.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/api/image/${imageId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          responseType: "blob", // Expect binary data
        }
      );

      // Create a temporary URL for the image
      const imageBlob = new Blob([response.data], { type: "image/jpeg" });
      const url = URL.createObjectURL(imageBlob);
      setImageUrl(url);
    } catch (err) {
      setError("Failed to fetch the image. Please try again.");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Dish Management</h1>

      {/* Upload Section */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Add New Dish</h2>
        <label>
          Dish Name:
          <input
            type="text"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={dishDescription}
            onChange={(e) => setDishDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Cost:
          <input
            type="number"
            value={dishCost}
            onChange={(e) => setDishCost(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Category ID:
          <input
            type="text"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          />
        </label>
        <br />
        <label>
          Dish Image:
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </label>
        <br />
        <button onClick={handleAddDish} style={{ padding: "5px 10px" }}>
          Add Dish
        </button>
      </div>

      {/* Fetch Image Section */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Fetch Dish Image</h2>
        <label>
          Enter Image ID:
          <input
            type="text"
            value={imageId}
            onChange={(e) => setImageId(e.target.value)}
            style={{ marginRight: "10px", padding: "5px" }}
          />
        </label>
        <button onClick={fetchImage} style={{ padding: "5px 10px" }}>
          Fetch Image
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {imageUrl ? (
          <div>
            <h3>Fetched Image:</h3>
            <img
              src={imageUrl}
              alt="Fetched"
              style={{
                maxWidth: "100%",
                height: "auto",
                border: "1px solid #ccc",
              }}
            />
          </div>
        ) : (
          <p>No image fetched yet.</p>
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
