import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext.js";
import { Link, useNavigate } from "react-router-dom";
import Form from "../components/Form/Form.js";
import TextArea from "../components/TextArea/TextArea.js";
import Button from "../components/Button/Button.js";

import "./Login.scss";
import logo from "../assets/svgs/logo.svg";

export default function Login() {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    setLoading(true);
    const res = await login(emailRef.current.value, passwordRef.current.value);

    if (res && res.error) {
      let customError = res.error;

      if(customError.type === "email") {
        setEmailError(customError.message);
      } else if(customError.type === "password") {
        setPasswordError(customError.message);
      }
    } else {
      navigate("/");
    }
    setLoading(false);
  }

  // useEffect(() => {
        
  // }, [emailError])

  return (
    <>
      <div className="login-page">
        <div className="container">
          <img src={logo} className="logo"/>

          <Form onSubmit={handleSubmit}>
            <TextArea inputRef={emailRef} required={true} type="email" name="email" disabled={false} error={emailError}>Email</TextArea>
            <TextArea inputRef={passwordRef} required={true} type="password" name="password" disabled={false} error={passwordError}>Password</TextArea>
            
            <Button type="primary" size="b" disabled={loading}>
              Continue
            </Button>

          </Form>
          <Button type="secondary" size="s" disabled={loading}>
            No accounting? Sign up <Link to="/signup">here</Link>
          </Button>

          <Button type="secondary" size="s" disabled={loading}>
            <Link to="/forgot-password">Forgot your password?</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
