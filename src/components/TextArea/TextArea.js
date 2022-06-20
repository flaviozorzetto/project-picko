import "./TextArea.scss"
import React from "react";

export default function TextArea(props) {
  return (
    <>
      <label htmlFor={props.name}>{props.children}</label>
      <input
        className={`text_input${props.error ? " text_input_error" : ""}`}
        type={props.type}
        ref={props.inputRef}
        placeholder={props.placeholder}
        name={props.name}
        required={props.required}
        error={props.error}
        disabled={props.disabled}
        id={props.name}
      ></input>
      {props.error && <span className="error_message">{props.error}</span>}
    </>
  )
}
