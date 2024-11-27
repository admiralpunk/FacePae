import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Optional for styling

const App = () => {
  const [restaurantId, setRestaurantId] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form submit to fetch menu items based on restaurantId
  const handleFetchMenu = async (e) => {
    e.preventDefault(); // Prevent form submission refresh

    if (!restaurantId) {
      setError("Please provide a valid Restaurant ID");
      return;
    }

    setLoading(true);
    setError(null); // Reset any previous errors

    try {
      const response = await fetch(
        `http://localhost:3000/api/menu?restaurantId=${restaurantId}`
      ); // Adjust your API URL if needed
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setMenuItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Restaurant Menu</h1>

      {/* Restaurant ID input */}
      <form onSubmit={handleFetchMenu} style={{ marginBottom: "20px" }}>
        <input
          type="number"
          placeholder="Enter Restaurant ID"
          value={restaurantId}
          onChange={(e) => setRestaurantId(e.target.value)}
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <button
          type="submit"
          style={{ padding: "10px", marginLeft: "10px", fontSize: "16px" }}
        >
          Fetch Menu
        </button>
      </form>

      {/* Loading and error handling */}
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>Error: {error}</div>}

      {/* Display menu items */}
      {menuItems.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {menuItems.map((item) => (
            <li
              key={item.dish_id}
              style={{
                border: "1px solid #ccc",
                margin: "10px 0",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2>{item.dish_name}</h2>
              <p>{item.dish_description}</p>
              <p>
                <strong>Price:</strong> ${item.dish_cost}
              </p>

              {item.dish_images.length > 0 && (
                <div>
                  {item.dish_images.map((img) => (
                    <img
                      key={img.image_id}
                      src={`data:image/png;base64,${img.dish_image}`}
                      alt={item.dish_name}
                      style={{
                        width: "200px",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "5px",
                        marginRight: "10px",
                      }}
                    />
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div>No menu items found.</div>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
