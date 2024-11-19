import React, { useEffect, useState } from "react";
import { getProfile } from "../services/api";

const RestaurantDashboard = ({ token }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile(token);
        setProfile(response.data.restaurant);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    if (token) fetchProfile();
  }, [token]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2>{profile.name} Dashboard</h2>
      <p>Email: {profile.email}</p>
      {/* Display more data or controls as needed */}
    </div>
  );
};

export default RestaurantDashboard;
