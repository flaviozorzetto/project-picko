import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.js";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button/Button.js";
import Card from "../components/Card/Card.js";
import Form from "../components/Form/Form.js";
import TextArea from "../components/TextArea/TextArea.js";
import Checkbox from "../components/Checkbox/Checkbox.js";

import "../styles/index.scss";

export default function Dashboard() {
  const [authError, setAuthError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setAuthError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setAuthError("Failed to log out");
    }
  }

  return (
    <>
      <div style={{ width: "1000px", margin: "1rem" }}>
        <Card />
        <Button type="primary" size="s">
          Primary
        </Button>

        <Form >
          <TextArea required={true} type="email" name="email" placeholder="Enter email" disabled={false}>Label</TextArea>
          <TextArea required={true} type="password" name="password" placeholder="Enter password" disabled={false}>Password</TextArea>

          <Checkbox type="checkbox" name="checkbox" placeholder="Enter password" disabled={false} />
          
          <Button type="primary" size="s">
            Login
          </Button>

        </Form>

        <Form disabled={false} type="checkbox" name="check1" error={false}>
          
        </Form>
      </div>

      <div>
        <h2>Profile</h2>
        <span>Email:</span> {currentUser.email}
      </div>

      <div>
        <button onClick={handleLogout}>Log out</button>
      </div>
      <div>Dashboard</div>
    </>
  );
}
