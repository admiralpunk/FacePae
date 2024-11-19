import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Restaurant Management App</h1>
      <Link to="/register">Register a Restaurant</Link>
      <br />
      <Link to="/">Login</Link>
    </div>
  );
};

export default HomePage;
