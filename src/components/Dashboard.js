import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.js";
import { useNavigate } from "react-router-dom";

import Button from "./Button/Button.js";
import Card from "./Card/Card.js";
import Form from "./Form/Form.js";
import TextArea from "./TextArea/TextArea.js";

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
          <TextArea 
            required={true}
            disabled={false}
            placeholder="Placeholder"
            type="checkbox"
            name="fname"
          >
            Label
          </TextArea> 
        </Form>

        <Form disabled={false} type="checkbox" name="check1" error={false}>
          
        </Form>

          {/* <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" /> */}
        {/* <form> */}
          {/* <label htmlFor="vehicle1"> I have a bike</label>
          <input type="checkbox" id="vehicle2" name="vehicle2" value="Car"></input>
          <label htmlFor="vehicle2"> I have a car</label>
          <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat"></input>
          <label htmlFor="vehicle3"> I have a boat</label> */}
        {/* </form> */}

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
