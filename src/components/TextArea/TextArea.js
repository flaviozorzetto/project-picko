import React, { useState, useEffect } from "react";
import loadIcon from "../Elements/IconLoader/icon-loader";
import { Link, useNavigate } from "react-router-dom";
import Banner from "../../components/Banner/Banner.js";
import "./TextArea.scss";
import { useValidation } from "../../contexts/ValidationContext.js";

export default function TextArea(props) {
  const { inputs, setInputs } = useValidation();

  const [errorMessageDisplay, setErrorMessageDisplay] = useState(
    props.globalError == true
  );

  useEffect(() => {
    if (props.globalError) {
      setErrorMessageDisplay(true);
    }
  }, [props.globalError]);

  const handleInput = (event) => {
    if (inputs[props.name] && inputs[props.name].message) {
      //  || props.globalError
      setInputs((prev) => ({
        ...prev,
        [props.name]: {
          ...prev[props.name],
          message: "",
        },
      }));
      // setErrorMessageDisplay(false);
    }
  };

  useEffect(() => {
    if (inputs[props.name] && inputs[props.name].message) {
      setErrorMessageDisplay(true);
    }
  }, [inputs[props.name]]);

  return (
    <>
      <div className="text-area-container">
        <label className="text_label" htmlFor={props.name}>
          {props.children}
        </label>
        <div className="input_container">
          <input
            value={props.value}
            onInput={handleInput}
            onChange={props.onChange}
            className={`text_input${
              errorMessageDisplay &&
              (props.globalError ||
                (inputs[props.name] && inputs[props.name].message))
                ? " text_input_error"
                : ""
            }${props.iconLeft ? " pl-50" : ""}${
              props.iconRight ? " pr-50" : ""
            }`}
            type={props.type}
            ref={props.inputRef}
            placeholder={props.placeholder}
            name={props.name}
            required={props.required}
            disabled={props.disabled}
            id={props.name}
          ></input>
          {props.iconLeft && (
            <i className="icon-left">{loadIcon(props.iconLeft)}</i>
          )}
          {props.iconRight && (
            <i className="icon-right">{loadIcon(props.iconRight)}</i>
          )}
        </div>
      </div>

      {errorMessageDisplay && inputs[props.name] && inputs[props.name].message && (
        <div className="error_message-container">
          <span className="error_message">{inputs[props.name].message}</span>
        </div>
      )}
    </>
  );
}