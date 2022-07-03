import React, { useState, useEffect } from "react";
import loadIcon from "../Elements/IconLoader/icon-loader";
import { useValidation } from "../../contexts/ValidationContext.js";
import "./TextArea.scss";

export default function TextArea(props) {
  const [inputError, setInputError] = useState("");

  const [errorMessageDisplay, setErrorMessageDisplay] = useState(
    inputError == true
  );


  useEffect(() => {
    if (props.error) {
      setErrorMessageDisplay(true);
      setInputError(props.error);
    }
  }, [props.error]);

  const {inputs, addInput} = useValidation();

  const handleInput = (event) => {
    addInput(props.name, event.target.value, event.target.type)

    if (inputError && inputError.scope == "local") {
      setErrorMessageDisplay(false);
    }
  };

  useEffect(() => {
    if(inputs[props.name] && inputs[props.name].error) {
      console.log("sass", inputs[props.name])
      setInputError(inputs[props.name].error)
      setErrorMessageDisplay(true);
    }
  }, [inputs[props.name]])

  useEffect(() => {
    addInput(props.name, "", props.type)
  }, [props.value])

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
              inputError &&
              ((inputError.scope == "local" &&
                inputError.type == props.name) ||
                inputError.scope == "global")
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

      {errorMessageDisplay &&
        inputError &&
        inputError.scope == "local" &&
        inputError.type == props.name && (
          <div className="error_message-container">
            <span className="error_message">{inputError.error}</span>
          </div>
        )}
    </>
  );
}