import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.js"
import { useNavigate } from "react-router-dom";

import Button from './Button/Button.js';
import Card from './Card/Card.js';
import '../styles/index.scss'

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
      <div style={{ width: '1000px', margin: '1rem' }}>
         <Card />
         <Button type="secondary" size="s">
            Primary
         </Button>
      </div>

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
