import React, { useRef, useState } from "react";
import "../styles/signup.css"
import { useAuth } from "../contexts/AuthContext.js"

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if(passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Failed to create an account")
    }
    setLoading(false);
  }

  return (
    <>
      <div className="container">
        {currentUser && currentUser.email}
        {error && <b>{error}</b>}
        <form onSubmit={handleSubmit} className="signup-container">
          <label htmlFor="email">email</label>
          <input type="email" ref={emailRef} placeholder="Enter email" name="email" required></input>

          <label htmlFor="password">Password</label>
          <input type="password" ref={passwordRef} placeholder="Enter Password" name="password" required></input>

          <label htmlFor="password-confirmation">Confirm Password</label>
          <input type="password" ref={passwordConfirmRef} placeholder="Confirm Password" name="password-confirmation" required></input>

          <button disabled={loading}>Sign up</button>
        </form>

      </div>
    </>
  );
}
