import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext.js";
import { useValidation } from "../contexts/ValidationContext.js";
import { Link } from "react-router-dom";

import Form from "../components/Form/Form.js";
import TextArea from "../components/TextArea/TextArea.js";
import Button from "../components/Elements/Button/Button.js";
import loadIcon from "../components/Elements/IconLoader/icon-loader.js";

import "./Signup.scss";
import logo from "../assets/svgs/logo.svg";

export default function Signup() {
  const { inputs, validate, addNewInput } = useValidation();
  const [step, setStep] = useState(1);

  const backToPreviousStep = () => setStep(step - 1);

  const validateForNextStep = () => {
    if (validate(step)) {
      setStep(step + 1);
      return true;
    } else {
      return false;
    }
  };

  const [state, setStates] = useState({
    "first-name": { value: "", message: "", type: "", step: 1 },
    "last-name": { value: "", message: "", type: "", step: 1 },
    email: { value: "", message: "", type: "", step: 1 },
    password: { value: "", message: "", type: "", step: 1 },
    "password-confirmation": { value: "", message: "", type: "", step: 1 },
    "company-name": { value: "", message: "", type: "", step: 2 },
    "job-role": { value: "", message: "", type: "", step: 2 },
    // 'employee-quantity': { value: '', message: '', type: '', step: 2 },
  });

  const [error, setError] = useState("");
  const handleChange = (event) => {
    let stateName = event.target.name;

    setStates((prev) => ({
      ...prev,
      [stateName]: {
        value: event.target.value,
        message: inputs[stateName].message,
        type: event.target.type,
        step: state[stateName].step,
      },
    }));
  };

  useEffect(() => {
    addNewInput(state);
  }, [state]);

  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    if (!validateForNextStep()) return;
    setStep(step + 1);

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
          <Form id="signup-form" onSubmit={handleSubmit} error={error}>
            {step == 3 ? (
              <>
                <div className="account-created">
                  <div className="ellipse">
                    <i>{loadIcon("check", { width: 32, height: 32 })}</i>
                  </div>
                  <h3>Account created successfully</h3>
                  <span>We sent a confirmation email for you.</span>
                  <Button
                    content="Go to login screen"
                    type="button"
                    theme="primary"
                    size="b"
                    full={true}
                    disabled={loading}
                    // onClick={navigate("/login")}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form-header">
                  <img src={logo} className="logo" />
                  <h3>Create new Account</h3>
                  <span>Please tell us some personal information.</span>
                  <span>Step {step} of 2</span>
                </div>
                {step == 1 ? (
                  <>
                    <TextArea
                      onChange={handleChange}
                      value={state["first-name"].value}
                      required={true}
                      type="text"
                      name="first-name"
                      disabled={false}
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
                    >
                      Repeat password
                    </TextArea>
                    <Button
                      content="Continue"
                      type="button"
                      theme="primary"
                      onClick={() => validateForNextStep()}
                      size="b"
                      full={true}
                      disabled={loading}
                    />
                  </>
                ) : (
                  <>
                    <TextArea
                      onChange={handleChange}
                      value={state["company-name"].value}
                      required={true}
                      type="text"
                      name="company-name"
                      disabled={false}
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
                    >
                      Job role
                    </TextArea>
                    {/* <TextArea
                        onChange={handleChange}
                        value={state['employee-quantity'].value}
                        required={true}
                        type="checkbox"
                        name="employee-quantity"
                        disabled={false}
                      >
                        How many employees?
                      </TextArea> */}

                    <Button
                      content="Sign up"
                      type="submit"
                      form="signup-form"
                      theme="primary"
                      size="b"
                      full={true}
                      disabled={loading}
                    />
                    <Button
                      content="Back to step 1"
                      type="button"
                      theme="primary"
                      onClick={() => backToPreviousStep()}
                      size="b"
                      full={true}
                      disabled={loading}
                    />
                  </>
                )}
              </>
            )}
          </Form>

          {/* <Button content={<Link to="/login">Sign in</Link>} type="button" theme="secondary" size="s" disabled={loading} /> */}
        </div>
      </div>
    </>
  );
}
