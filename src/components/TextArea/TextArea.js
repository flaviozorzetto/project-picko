import "./TextArea.scss"
import React from "react";

export default function TextArea(props) {
  
  return (
    <>
      <label htmlFor={props.name}>{props.children}</label>
      <input
        required={props.required}
        disabled={props.disabled}
        placeholder={props.placeholder}
        type={props.type}
        name={props.name}
        id={props.name}
      ></input>
    </>
  )
}
