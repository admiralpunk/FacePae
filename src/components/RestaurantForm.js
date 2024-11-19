import React, { useState } from "react";
import { createRestaurant } from "../services/api";

const RestaurantForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createRestaurant(formData);
      alert("Restaurant created successfully!");
    } catch (error) {
      console.error("Error creating restaurant:", error);
      alert("Failed to create restaurant.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit">Create Restaurant</button>
    </form>
  );
};

export default RestaurantForm;
