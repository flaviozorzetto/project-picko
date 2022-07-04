import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.js";
import { Link, useNavigate } from "react-router-dom";
import { useValidation } from "../contexts/ValidationContext.js";
import Form from "../components/Form/Form.js";
import TextArea from "../components/TextArea/TextArea.js";
import Button from "../components/Elements/Button/Button.js";
import "./Login.scss";
import logo from "../assets/svgs/logo.svg";

export default function Login() {
  const { inputs, setInputs } = useValidation();

  const [state, setStates] = useState({
    email: { value: "" },
    password: { value: "" },
  });

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
      if (inputs["login-form"][i]) { 
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

  const [error, setError] = useState("");
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    let stateName = event.target.name;

    setStates({
      ...state,
      [stateName]: { value: event.target.value },
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await login(state.email.value, state.password.value);

    if (res && res.error) {
      let customError = res.error;
      setError(customError);
    } else {
      navigate("/dashboard");
    }
    setLoading(false);
  }

  return (
    <>
      <div className="login-page">
        <div className="login-container">
          <img src={logo} className="logo" alt="logo" />

          <Form id="login-form" onSubmit={handleSubmit} error={error} reset={inputReset} state={state}>
            <TextArea
              formName="login-form"
              onChange={handleChange}
              required={true}
              parent="login-form"
              type="email"
              name="email"
              disabled={false}
              error={inputs["login-form"] && inputs["login-form"]["email"] && inputs["login-form"]["email"].message ? inputs["login-form"]["email"].message : error}
            >
              Email
            </TextArea>
            <TextArea
              formName="login-form"
              onChange={handleChange}
              required={true}
              parent="login-form"
              type="password"
              name="password"
              disabled={false}
              error={inputs["login-form"] && inputs["login-form"]["password"] && inputs["login-form"]["password"].message ? inputs["login-form"]["password"].message : error}
            >
              Password
            </TextArea>

            <Button
              content="Continue"
              theme="primary"
              size="b"
              full={true}
              disabled={loading}
            />
          </Form>
          <span>
            No accounting? Sign up <Link to="/signup">here</Link>
          </span>
          <span>
            <Link to="/forgot-password">Forgot your password?</Link>
          </span>
        </div>
      </div>
    </>
  );
}
