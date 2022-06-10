import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.js"
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
      {error && <b>{error}</b>}
      <div>
        <h2>Profile</h2>
        <span>Email:</span> {currentUser.email}

      </div>

      <div>
        <button onClick={handleLogout}>
          Log out
        </button>
      </div>
      <div>Dashboard</div>
    </>
  );
}
