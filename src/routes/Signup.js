import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext.js"
import { Link } from "react-router-dom"

import Form from "../components/Form/Form.js";
import TextArea from "../components/TextArea/TextArea.js";
import Button from "../components/Button/Button.js";

import "./Signup.scss"
import logo from "../assets/svgs/logo.svg";

export default function Signup() {
  const [step, setStep] = useState(1);
  
  const backToPreviousStep = () => setStep(step - 1);

  const validateForNextStep = () => {
    if(validateLocalInputs()) {
      setStep(step + 1);
    }
  }
  
  const [state, setStates] = useState({
    "first-name": { value: "" },
    "last-name": { value: "" },
    "email": { value: "" },
    "password": { value: "" },
    "password-confirmation": { value: "" },
    "company-name": { value: "" },
    "job-role": { value: "" },
    "employee-quantity": { value: "" },
  });
  
  const [error, setError] = useState("");
  const handleChange = (event) => {
    let stateName = event.target.name;

    // if(props.error) {
    //   setErrorMessageDisplay(false);
    // }
    
    setStates({
      ...state,
      [stateName]: { value: event.target.value },
    })
  }

  useEffect(() => {
    console.log("!!!", state)
  }, [state])

  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);

  const validateLocalInputs = () => {
    if(state["password"].value.length < 6) {
      return setError({
        "message": "Password must have at least 6 characters",
        "type": "password",
        "scope": "local"
      })
    } else if(state["password"].value !== state["password-confirmation"].value) {
      return setError({
        "message": "Passwords do not match",
        "type": "password-confirmation",
        "scope": "local"
      })
    } else {
      return true
    }
  }

  const handleSubmit = async(e) => {
    if(!validateLocalInputs()) return;
    setStep(step + 1);

    e.preventDefault();
    setLoading(true);
    const res = await signup(state);

    if (res && res.error) {
      let customError = res.error;
      setError(customError);
    }
    setLoading(false);
  }

  return (
    <>
      <div className="signup-page">

        <div className="container">
          {step == 3 ? (
            <>
              <h3>Account created successfully</h3>
              <span>We sent a confirmation email for you.</span>
            </>
          ) : (
            <>
              <img src={logo} className="logo"/>
              <Form id="signup-form" onSubmit={handleSubmit} error={error} >

                {step == 1 ? (
                  <>
                    <TextArea onChange={handleChange} value={state["first-name"].value} required={true} id="1" type="text" name="first-name" disabled={false}>Name</TextArea>
                    <TextArea onChange={handleChange} value={state["last-name"].value} required={true} type="text" name="last-name" disabled={false}>Last name</TextArea>
        
                    <TextArea onChange={handleChange} value={state["email" ].value} required={true} type="email" name="email" disabled={false} error={error}>Email</TextArea>
        
                    <TextArea onChange={handleChange} value={state["password"].value} required={true} type="password" name="password" disabled={false} error={error}>Password</TextArea>
                    <TextArea onChange={handleChange} value={state["password-confirmation"].value} required={true} type="password" name="password-confirmation" disabled={false} error={error}>Repeat password</TextArea>
                    <Button content="Continue" type="button" theme="primary" onClick={() => validateForNextStep()} size="s" disabled={loading} />
                  </>
                ) : (
                  <>
                    <TextArea onChange={handleChange} value={state["company-name"].value} required={true} id="2" type="text" name="company-name" disabled={false}>Company name</TextArea>
                    <TextArea onChange={handleChange} value={state["job-role"].value} required={true} type="text" name="job-role" disabled={false}>Job role</TextArea>
                    <TextArea onChange={handleChange} value={state["employee-quantity"].value} required={true} type="checkbox" name="employee-quantity" disabled={false}>How many employees?</TextArea>

                    <Button content="Sign up" type="submit" form="signup-form" theme="primary" size="s" disabled={loading} />
                    <Button content="Back to step 1" type="button" theme="primary" onClick={() => backToPreviousStep()} size="s" disabled={loading} />
                  </>
                )}
              </Form>
            </>
          )}

          {/* <Button content={<Link to="/login">Sign in</Link>} type="button" theme="secondary" size="s" disabled={loading} /> */}
        </div>
      </div>
    </>
  );
}