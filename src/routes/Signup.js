import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext.js";
import { Link } from "react-router-dom";
import { useValidation } from "../contexts/ValidationContext.js";

import Form from "../components/Form/Form.js";
import TextArea from "../components/TextArea/TextArea.js";
import Button from "../components/Elements/Button/Button.js";

import "./Signup.scss";
import logo from "../assets/svgs/logo.svg";

export default function Signup() {
  const { validation, setInputs, setCurrentInputs, removeInput, inputs } =
    useValidation();
  const [step, setStep] = useState(1);

  const [state, setStates] = useState({
    "first-name": { value: "" },
    "last-name": { value: "" },
    email: { value: "" },
    password: { value: "" },
    "password-confirmation": { value: "" },
    "company-name": { value: "" },
    "job-role": { value: "" },
    "employee-quantity": { value: "" },
  });

  const [error, setError] = useState("");
  const handleChange = (event) => {
    let stateName = event.target.name;

    setStates({
      ...state,
      [stateName]: { value: event.target.value },
    });
  };

  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);

  const inputReset = (inputNameList) => {
    inputNameList.forEach((i) => {
      // will set the value displayed for the user to ""
      setStates((prev) => ({
        ...prev,
        [i]: { value: "" },
      }));

      /* this if exists to avoid the possibility of inputList have step 2 inputs. 
      Using the state object as parameter would cause a error because the inputs 
      object only loads the current inputs) */
      if (inputs[i]) { 
        // will set the input value to ""
        setInputs((prev) => ({
          ...prev,
          [i]: {
            ...prev[i],
            value: "",
          },
        }));
      }
    });
  }

  const handleSubmit = async (e) => {
    setStep(step + 1);
    setCurrentInputs([]);

    e.preventDefault();
    setLoading(true);
    const res = await signup(state);

    if (res && res.error) {
      let customError = res.error;
      setError(customError);
    }

    // removeInput() // will delete step 2 inputs, avoiding validation errors for when the form is reloaded
    // inputReset(Object.keys(state));
    setLoading(false);
  };

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
              <img src={logo} className="logo" />
              <Form id="signup-form" onSubmit={handleSubmit} error={error} reset={inputReset} state={state}>
                {step == 1 ? (
                  <>
                    <Button
                      content="REMOVE INPUTS"
                      type="button"
                      theme="primary"
                      onClick={() => {
                        setCurrentInputs([]);
                        inputReset(Object.keys(state));
                      }}
                      size="s"
                      disabled={loading}
                    />

                    <TextArea
                      onChange={handleChange}
                      value={state["first-name"].value}
                      required={true}
                      parent="signup-form"
                      type="text"
                      name="first-name"
                      disabled={false}
                      error={
                        inputs["first-name"] ? inputs["first-name"].message : ""
                      }
                    >
                      Name
                    </TextArea>
                    <TextArea
                      onChange={handleChange}
                      value={state["last-name"].value}
                      required={true}
                      parent="signup-form"
                      type="text"
                      name="last-name"
                      disabled={false}
                      error={
                        inputs["last-name"] ? inputs["last-name"].message : ""
                      }
                    >
                      Last name
                    </TextArea>

                    <TextArea
                      onChange={handleChange}
                      value={state["email"].value}
                      required={true}
                      parent="signup-form"
                      type="email"
                      name="email"
                      disabled={false}
                      error={inputs["email"] ? inputs["email"].message : error}
                    >
                      Email
                    </TextArea>

                    <TextArea
                      onChange={handleChange}
                      value={state["password"].value}
                      required={true}
                      parent="signup-form"
                      type="password"
                      name="password"
                      disabled={false}
                      error={
                        inputs["password"] ? inputs["password"].message : error
                      }
                    >
                      Password
                    </TextArea>
                    <TextArea
                      onChange={handleChange}
                      value={state["password-confirmation"].value}
                      required={true}
                      parent="signup-form"
                      type="password"
                      name="password-confirmation"
                      disabled={false}
                      error={
                        inputs["password-confirmation"]
                          ? inputs["password-confirmation"].message
                          : ""
                      }
                    >
                      Repeat password
                    </TextArea>
                    <Button
                      content="Continue"
                      type="button"
                      theme="primary"
                      onClick={() => {
                        if (validation()) {
                          setStep(step + 1);
                          setCurrentInputs([]);
                        }
                      }}
                      size="s"
                      disabled={loading}
                    />
                  </>
                ) : (
                  <>
                    <TextArea
                      onChange={handleChange}
                      value={state["company-name"].value}
                      required={true}
                      parent="signup-form"
                      id="2"
                      type="text"
                      name="company-name"
                      disabled={false}
                      error={
                        inputs["company-name"]
                          ? inputs["company-name"].message
                          : ""
                      }
                    >
                      Company name
                    </TextArea>
                    <TextArea
                      onChange={handleChange}
                      value={state["job-role"].value}
                      required={true}
                      parent="signup-form"
                      type="text"
                      name="job-role"
                      disabled={false}
                      error={
                        inputs["job-role"] ? inputs["job-role"].message : ""
                      }
                    >
                      Job role
                    </TextArea>
                    {/* <TextArea
                      onChange={handleChange}
                      value={state["employee-quantity"].value}
                      required={true}
                      parent="signup-form"
                      type="checkbox"
                      name="employee-quantity"
                      disabled={false}
					  error={inputs["employee-quantity"] ? inputs["employee-quantity"].message : ""}
                    >
                      How many employees?
                    </TextArea> */}

                    <Button
                      content="Sign up"
                      type="submit"
                      form="signup-form"
                      theme="primary"
                      size="s"
                      disabled={loading}
                    />
                    <Button
                      content="Back to step 1"
                      type="button"
                      theme="primary"
                      onClick={() => {
                        setStep(step - 1);
                        setCurrentInputs([]);

                        /* if inputs object have an input that is not rendered for the user, 
                        that function will delete it and return all the input names that needs to
                        get their states cleaned to "" to avoid validation errors on inputs that the
                        user does not have control over it*/
                        let inputsToRemove = removeInput();
                        inputReset(inputsToRemove);

                      }}
                      size="s"
                      disabled={loading}
                    />
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
