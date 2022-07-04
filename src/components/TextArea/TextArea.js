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

  const { inputs, addInput, currentInputs, setCurrentInputs } = useValidation();

  useEffect(() => {
    // adding inputs for the first time
    if (!inputs[props.name]) {
      addInput(props.name, "", props.type);
    }
    // setCurrentInputs([]);
    setCurrentInputs((prev) => [...new Set([...prev, props.name])]);
    console.log("TROCOU DE FORM", props.parent)
  }, [props.name]); // rever se o local a se observar é o props.name

  const handleInput = (event) => {
    addInput(props.name, event.target.value, event.target.type);

    if (inputError && inputError.scope == "local") {
      setErrorMessageDisplay(false);
    }
  };

  useEffect(() => {
    if (inputs[props.name] && inputs[props.name].message) {
      setInputError(inputs[props.name].message);
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
              props.error &&
              inputError &&
              (inputError.scope == "local" || inputError.scope == "global")
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

      {errorMessageDisplay && props.error && inputError && inputError.scope == "local" && (
        <div className="error_message-container">
          <span className="error_message">{inputError.message}</span>
        </div>
      )}
    </>
  );
}
