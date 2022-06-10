import React, { useRef, useState } from "react";
import "../styles/signup.css"
import { useAuth } from "../contexts/AuthContext.js"
import { Link } from "react-router-dom"

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }
    setLoading(false);
  }

  return (
    <>
      <div className="container">
        <span>Password reset</span>
        {error && <b>{error}</b>}
        {message && <b>{message}</b>}
        <form onSubmit={handleSubmit} className="signup-container">
          <label htmlFor="email">email</label>
          <input type="email" ref={emailRef} placeholder="Enter email" name="email" required></input>

          <button type="submit" disabled={loading}>Reset password</button>
        </form>

        <div>
        <Link to="/login">Log in</Link>
        </div>

        <div>
          <Link to="/signup">Sign up</Link>
        </div>

      </div>
    </>
  );
}
