import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RestaurantForm from "./components/RestaurantForm";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";

function App() {
  const [token, setToken] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm setToken={setToken} />} />
        <Route path="/register" element={<RestaurantForm />} />
        <Route path="/profile" element={<Profile token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
