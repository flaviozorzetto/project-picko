import React, { useRef, useState } from "react";
import "../styles/signup.css";
import { useAuth } from "../contexts/AuthContext.js";
import { Link, useNavigate } from "react-router-dom";
import Form from "./Form/Form.js";
import TextArea from "./TextArea/TextArea.js";
import Button from "./Button/Button.js";
import Card from "./Card/Card.js";

export default function Login() {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, getCustomErrorMessage } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    setLoading(true);
    const res = await login(emailRef.current.value, passwordRef.current.value);

    if (res && res.error) {
      let customError = getCustomErrorMessage(res.error);

      if(customError.type == "email") {
        setEmailError(customError.message);
      } else if(customError.type == "password") {
        setPasswordError(customError.message);
      }
    } else {
      navigate("/");
    }
    setLoading(false);
  }

  return (
    <>
      <div className="container">
        <span>Sign in</span>

        <Form onSubmit={handleSubmit}>
          <TextArea inputRef={emailRef} required={true} type="email" name="email" placeholder="Enter email" disabled={false} error={emailError}></TextArea>
          <TextArea inputRef={passwordRef} required={true} type="password" name="password" placeholder="Enter password" disabled={false} error={passwordError}></TextArea>
          
          <Button type="primary" size="s" disabled={loading}>
            Login
          </Button>

        </Form>

        <Button type="secondary" size="s" disabled={loading}>
          <Link to="/forgot-password">Forgot Password?</Link>
        </Button>

        <Button type="secondary" size="s" disabled={loading}>
          <Link to="/signup">Sign up</Link>
        </Button>

      </div>
    </>
  );
}
