import React, { useRef, useState } from "react";
import "../styles/signup.css";
import { useAuth } from "../contexts/AuthContext.js";
import { Link, useNavigate } from "react-router-dom";
import Form from "./Form/Form.js";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, getCustomErrorMessage } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);
    const res = await login(emailRef.current.value, passwordRef.current.value);

    if (res.error) {
      console.log("error: ", res.error);
      console.log("custom msg:", getCustomErrorMessage(res.error));

      setError(getCustomErrorMessage(res.error));
    } else {
      navigate("/");
    }

    //
    // try {
    //   setError("");
    //   setLoading(true);
    //   console.log("LOADING1", loading)
    //   await login(emailRef.current.value, passwordRef.current.value);
    //   navigate("/");
    // } catch {
    //   setError("Failed to log in")
    // }

    setLoading(false);
  }

  return (
    <>
      <div className="container">
        <span>Sign in</span>
        {error && <b>{error}</b>}

        {/* <Form
          onSubmit={handleSubmit}
          required={true}
          pattern={"test"}
          disabled={false}
          placeholder="Placeholder"
          type="text"
          name="fname"
          error={error}
        >
          Email
        </Form> */}

        {/* <Form
         required={true}
         pattern={"test"}
         disabled={false}
         placeholder="Placeholder"
         type="text"
         name="fname"
         error={authError}>
          Password
        </Form> */}

        <form onSubmit={handleSubmit} className="signup-container">
          <label htmlFor="email">email</label>
          <input
            type="email"
            ref={emailRef}
            placeholder="Enter email"
            name="email"
            required
          ></input>

          <label htmlFor="password">Password</label>
          <input
            type="password"
            ref={passwordRef}
            placeholder="Enter Password"
            name="password"
            required
          ></input>

          <button type="submit" disabled={loading}>
            Log in
          </button>
        </form>

        <div>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <div>
          <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </>
  );
}
