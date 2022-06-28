import React, { useEffect, useRef, useState } from "react";
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
  // input refs

  const handleChange = (event) => {
    let stateName = event.target.name;
    setInput({value: event.target.value})

    // if(props.error) {
    //   setErrorMessageDisplay(false);
    // }
    
    // console.log(event.target.value)
    setStates({
      ...state,
      [stateName]: { value: event.target.value },
    })
  }

  useEffect(() => {
    console.log("!!!", state)
  }, [state])

  const firstNameRef = useRef();
  const lastNameRef = useRef();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  // step 2
  // error state
  // input refs
  const companyNameRef = useRef();
  const jobRoleRef = useRef();
  const employeeQuantityRef = useRef();

  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    // if(passwordRef.current.value.length < 6) {
    //   return setPasswordError("Password must have at least 6 characters")
    // }

    // if(passwordRef.current.value !== passwordConfirmRef.current.value) {
    //   return setPasswordConfirmationError("Passwords do not match")
    // }
    
    setLoading(true);
    const res = await signup(state.email.value, state.password.value);

    if (res && res.error) {
      let customError = res.error;
      setError(customError);
    } else {

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
              <Form id="signup-form" onSubmit={handleSubmit}>

                {step == 1 ? (
                  <>
                    <TextArea onChange={handleChange} value={state["first-name"].value} required={true} id="1" type="text" name="first-name" disabled={false}>Name</TextArea>
                    <TextArea onChange={handleChange} value={state["last-name"].value} required={true} type="text" name="last-name" disabled={false}>Last name</TextArea>
        
                    <TextArea onChange={handleChange} value={state["email" ].value} required={true} type="email" name="email" disabled={false} error={error}>Email</TextArea>
        
                    <TextArea onChange={handleChange} value={state["password"].value} required={true} type="password" name="password" disabled={false} error={error}>Password</TextArea>
                    <TextArea onChange={handleChange} value={state["password-confirmation"].value} required={true} type="password" name="password-confirmation" disabled={false} error={error}>Repeat password</TextArea>
                    <Button content="Continue" type="button" theme="primary" onClick={() => setStep(2)} size="s" disabled={loading} />
                  </>
                ) : (
                  <>
                    <TextArea onChange={handleChange} value={state["company-name"].value} required={true} id="2" type="text" name="company-name" disabled={false} error={error}>Company name</TextArea>
                    <TextArea onChange={handleChange} value={state["job-role"].value} required={true} type="text" name="job-role" disabled={false} error={error}>Job role</TextArea>
                    <TextArea onChange={handleChange} value={state["employee-quantity"].value} required={true} type="checkbox" name="employee-quantity" disabled={false}>How many employees?</TextArea>

                    <Button content="Sign up" type="submit" form="signup-form" theme="primary" size="s" disabled={loading} />
                    <Button content="Back to step 1" type="button" theme="primary" onClick={() => setStep(1)} size="s" disabled={loading} />
                  </>
                )}
              </Form>
            </>
          )}

          <Button content={<Link to="/login">Sign in</Link>} type="button" theme="secondary" size="s" disabled={loading} />
        </div>
      </div>
    </>
  );
}