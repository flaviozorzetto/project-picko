import React, { useRef, useState } from "react";
import "../styles/signup.css"
import { useAuth } from "../contexts/AuthContext.js"
import { Link, useNavigate } from "react-router-dom"

import Form from "../components/Form/Form.js";
import TextArea from "../components/TextArea/TextArea.js";
import Button from "../components/Button/Button.js";

export default function Signup() {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { login, getCustomErrorMessage } = useAuth();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setPasswordConfirmationError("");

    if(passwordRef.current.value.length < 6) {
      return setPasswordError("Password must have at least 6 characters")
    }

    if(passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setPasswordConfirmationError("Passwords do not match")
    }
    
    setLoading(true);
    const res = await signup(emailRef.current.value, passwordRef.current.value);

    if (res && res.error) {
      let customError = res.error

      if(customError.type == "email") {
        setEmailError(customError.message);
      } else if(customError.type == "password") {
        setPasswordError(customError.message);
      } else if(customError.type == "password-confirmation") {
        setPasswordConfirmationError(customError.message)
      }
    } else {
      navigate("/");
    }

    setLoading(false);
  }

  return (
    <>
      <div className="container">
        <span>Sign up</span>

        <Form onSubmit={handleSubmit}>
          <TextArea inputRef={emailRef} required={true} type="email" name="email" placeholder="Enter email" disabled={false} error={emailError}></TextArea>
          <TextArea inputRef={passwordRef} required={true} type="password" name="password" placeholder="Enter password" disabled={false} error={passwordError}></TextArea>
          <TextArea inputRef={passwordConfirmRef} required={true} type="password" name="password-confirmation" placeholder="Confirm Password" disabled={false} error={passwordConfirmationError}></TextArea>
          
          <Button type="primary" size="s" disabled={loading}>
            Sign up
          </Button>
        </Form>

        <Button type="secondary" size="s" disabled={loading}>
          <Link to="/login">Sign in</Link>
        </Button>

      </div>
    </>
  );
}
