import React, { useRef, useState } from "react";
import "../styles/signup.css"
import { useAuth } from "../contexts/AuthContext.js"
import { Link } from "react-router-dom"

import Form from "../components/Form/Form.js";
import TextArea from "../components/TextArea/TextArea.js";
import Button from "../components/Button/Button.js";

export default function ForgotPassword() {
  const [emailError, setEmailError] = useState("");
  const emailRef = useRef();
  const { resetPassword, getCustomErrorMessage } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  async function handleSubmit(e) {
    e.preventDefault();
    setEmailError("");

    setLoading(true);
    const res = await resetPassword(emailRef.current.value);

    if (res && res.error) {
      let customError = res.error
      setEmailError(customError.message);
    } else {
      setMessage("Check your inbox for further instructions")
    }
    
    setLoading(false);
  }

  return (
    <>
      <div className="container">
        <span>Password reset</span>

        <Form onSubmit={handleSubmit}>
          <TextArea inputRef={emailRef} required={true} type="email" name="email" placeholder="Enter email" disabled={false} error={emailError}></TextArea>
          {message && <b>{message}</b>}
          <Button type="primary" size="s" disabled={loading}>
            Reset password
          </Button>
        </Form>

        <Button type="secondary" size="s" disabled={loading}>
          <Link to="/login">Log in</Link>
        </Button>

        <Button type="secondary" size="s" disabled={loading}>
          <Link to="/signup">Sign up</Link>
        </Button>

      </div>
    </>
  );
}
