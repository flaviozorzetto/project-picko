import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext.js"
import { Link, useNavigate } from "react-router-dom"

import Form from "../components/Form/Form.js";
import TextArea from "../components/TextArea/TextArea.js";
import Button from "../components/Button/Button.js";

import "./Signup.scss"
import logo from "../assets/svgs/logo.svg";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [input = {value: ""}, setInput] = useState()

  // step 1
  // error state
  const [state = { value: "" }, setStates] = useState({
    firstName: { value: 0 },
    lastName: { value: 0 },
    email: { value: 0 },
  });

  const [firstNameError = {value: ""}, setFirstNameError] = useState();

  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] = useState("");

  // input refs

  const handleChange = (event) => {
    setInput({value: event.target.value})

    // if(props.error) {
    //   setErrorMessageDisplay(false);
    // }
    
    // console.log(event.target.value)
    // setStates({
    //   ...state, 
    //   firstName: { value: event.target.value},
    // })
  }

  const firstNameRef = useRef();
  const lastNameRef = useRef();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  // step 2
  // error state
  const [companyNameError, setCompanyNameError] = useState("");
  const [jobRoleError, setJobRoleError] = useState("");

  // input refs
  const companyNameRef = useRef();
  const jobRoleRef = useRef();
  const employeeQuantityRef = useRef();

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

      if(customError.type === "email") {
        setEmailError(customError.message);
      } else if(customError.type === "password") {
        setPasswordError(customError.message);
      } else if(customError.type === "password-confirmation") {
        setPasswordConfirmationError(customError.message)
      }
    } 

    setLoading(false);
  }

  return (
    <>
      <div className="signup-page">
        <img src={logo} className="logo"/>

        <div className="container">
          <Form id="form-teste" onSubmit={handleSubmit}>

            {step == 1 ? (
              <>
                <TextArea onChange={handleChange} inputRef={firstNameRef} required={true} type="text" name="first-name" disabled={false}>Name</TextArea>
                <TextArea onChange={handleChange} inputRef={lastNameRef} required={true} type="text" name="last-name" disabled={false}>Last name</TextArea>
    
                <TextArea onChange={handleChange} inputRef={emailRef} required={true} type="email" name="email" disabled={false} error={emailError}>Email</TextArea>
    
                <TextArea inputRef={passwordRef} required={true} type="password" name="password" disabled={false} error={passwordError}>Password</TextArea>
                <TextArea inputRef={passwordConfirmRef} required={true} type="password" name="password-confirmation" disabled={false} error={passwordConfirmationError}>Repeat password</TextArea>
                <Button content="Continue" theme="primary" onClick={() => setStep(2)} size="s" disabled={loading} />
              </>
            ) : (
              <>
                <TextArea inputRef={companyNameRef} required={true} type="text" name="company-name" disabled={false} error={companyNameError}>Company name</TextArea>
                <TextArea inputRef={jobRoleRef} required={true} type="text" name="password" disabled={false} error={jobRoleError}>Job role</TextArea>
                <TextArea inputRef={employeeQuantityRef} required={true} type="checkbox" name="employeeQuantityRef" disabled={false}>How many employees?</TextArea>

                <Button content="Sign up" type="button" theme="primary" size="s" disabled={loading} />
                <Button content="Back to step 1" type="button" theme="primary" onClick={() => setStep(1)} size="s" disabled={loading} />
              </>
            )}
          </Form>

          <Button content={<Link to="/login">Sign in</Link>} type="button" theme="secondary" size="s" disabled={loading} />
        </div>
      </div>
    </>
  );
}