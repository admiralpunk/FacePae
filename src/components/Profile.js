import React, { useEffect, useState } from "react";
import { getProfile } from "../services/api";

const Profile = ({ token }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile(token);
        setProfile(response.data.restaurant);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    if (token) fetchProfile();
  }, [token]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, {profile.name}</h1>
      <p>Email: {profile.email}</p>
      {/* Add more profile details as needed */}
    </div>
  );
};

export default Profile;
