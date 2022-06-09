import React, { useRef, useState } from "react";
import "../styles/signup.css"
import { useAuth } from "../contexts/AuthContext.js"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      console.log(navigate)
      navigate("/");
    } catch {
      setError("Failed to log in")
    }
    setLoading(false);
  }

  return (
    <>
      <div className="container">
        <span>Sign in</span>
        {error && <b>{error}</b>}
        <form onSubmit={handleSubmit} className="signup-container">
          <label htmlFor="email">email</label>
          <input type="email" ref={emailRef} placeholder="Enter email" name="email" required></input>

          <label htmlFor="password">Password</label>
          <input type="password" ref={passwordRef} placeholder="Enter Password" name="password" required></input>

          <button type="submit" disabled={loading}>Log in</button>
        </form>

        <div>
          <Link to="/signup">Sign up</Link>
        </div>

      </div>
    </>
  );
}
