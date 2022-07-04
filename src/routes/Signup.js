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
  const { validation, setInputs, setCurrentInputs, removeInput, inputs } = useValidation();
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

  const handleSubmit = async (e) => {
    setStep(step + 1);
	setCurrentInputs([])

    e.preventDefault();
    setLoading(true);
    const res = await signup(state);

    if (res && res.error) {
      let customError = res.error;
      setError(customError);
    }
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
              <Form id="signup-form" onSubmit={handleSubmit} error={error}>
                {step == 1 ? (
                  <>
					<Button
                      content="REMOVE INPUTS"
                      type="button"
                      theme="primary"
                      onClick={() => {
						console.log("removido pelo button")
						setCurrentInputs([]);

						let stateName = "email"
						setStates({
							...state,
							[stateName]: { value: "" }
						});

						// for(let i in state) {
						// 	setStates({
						// 		...state,
						// 		[i]: { value: "" }
						// 	})
						// }
						// console.log("STATES CLEANED?", state)

						console.log("teste 2", state["email"])
					  }}
                      size="s"
                      disabled={loading}
                    />

                    <TextArea
                      onChange={handleChange}
                      value={state["first-name"].value}
                      required={true}
                      id="1"
                      type="text"
                      name="first-name"
                      disabled={false}
					  error={inputs["first-name"] ? inputs["first-name"].message : ""}
                    >
                      Name
                    </TextArea>
                    <TextArea
                      onChange={handleChange}
                      value={state["last-name"].value}
                      required={true}
                      type="text"
                      name="last-name"
                      disabled={false}
					  error={inputs["last-name"] ? inputs["last-name"].message : ""}
                    >
                      Last name
                    </TextArea>

                    <TextArea
                      onChange={handleChange}
                      value={state["email"].value}
                      required={true}
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
                      type="password"
                      name="password"
                      disabled={false}
                      error={inputs["password"] ? inputs["password"].message : error}
                    >
                      Password
                    </TextArea>
                    <TextArea
                      onChange={handleChange}
                      value={state["password-confirmation"].value}
                      required={true}
                      type="password"
                      name="password-confirmation"
                      disabled={false}
					  error={inputs["password-confirmation"] ? inputs["password-confirmation"].message : ""}
                    >
                      Repeat password
                    </TextArea>
                    <Button
                      content="Continue"
                      type="button"
                      theme="primary"
                      onClick={() => {
						  if(validation()) {
							setStep(step + 1)
							setCurrentInputs([])
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
                      id="2"
                      type="text"
                      name="company-name"
                      disabled={false}
					  error={inputs["company-name"] ? inputs["company-name"].message : ""}
                    >
                      Company name
                    </TextArea>
                    <TextArea
                      onChange={handleChange}
                      value={state["job-role"].value}
                      required={true}
                      type="text"
                      name="job-role"
                      disabled={false}
					  error={inputs["job-role"] ? inputs["job-role"].message : ""}
                    >
                      Job role
                    </TextArea>
                    {/* <TextArea
                      onChange={handleChange}
                      value={state["employee-quantity"].value}
                      required={true}
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
						let inputsToRemove = removeInput();

						inputsToRemove.forEach((input) => {
							setStates((prev) => ({
								...prev,
								[input]: { value: "" }
							}))
						})
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
