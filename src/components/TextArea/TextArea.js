import React from "react";
import loadIcon from "../Elements/IconLoader/icon-loader";
import "./TextArea.scss"

export default function TextArea(props) {
  return (
    <>
      <label className="text_label" htmlFor={props.name}>{props.children}</label>

      <div className="input_container">
        <input
          className={`text_input${props.error ? " text_input_error" : ""}${props.iconLeft ? " pl-50" : ""}${props.iconRight ? " pr-50" : ""}`}
          type={props.type}
          ref={props.inputRef}
          placeholder={props.placeholder}
          name={props.name}
          required={props.required}
          error={props.error}
          disabled={props.disabled}
          id={props.name}
        ></input>
        {props.iconLeft && <i className="icon-left">{loadIcon(props.iconLeft)}</i>}
        {props.iconRight && <i className="icon-right">{loadIcon(props.iconRight)}</i>}
      </div>
      {props.error && <span className="error_message">{props.error}</span>}
    </>
  )
}
