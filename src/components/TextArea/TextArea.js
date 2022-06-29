import React, { useState, useEffect } from "react";
import loadIcon from "../Elements/IconLoader/icon-loader";
import { Link, useNavigate } from "react-router-dom";
import Banner from "../../components/Banner/Banner.js";
import "./TextArea.scss";

export default function TextArea(props) {
  const [errorMessageDisplay, setErrorMessageDisplay] = useState(
    props.error == true
  );

  useEffect(() => {
    if (props.error) {
      setErrorMessageDisplay(true);
    }
  }, [props.error]);

  const handleInput = (event) => {
    if (props.error && props.error.scope == "local") {
      setErrorMessageDisplay(false);
    }
  };

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
              ((props.error.scope == "local" &&
                props.error.type == props.name) ||
                props.error.scope == "global")
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
        props.error &&
        props.error.scope == "local" &&
        props.error.type == props.name && (
          <div className="error_message-container">
            <span className="error_message">{props.error.message}</span>
          </div>
        )}
    </>
  );
}
