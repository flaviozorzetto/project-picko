import "./Form.scss";
import React from "react";

export default function Form(props) {
  return (
    <form className="form" method={props.method} target={props.target} action={props.action} onSubmit={props.onSubmit}>
      {props.children}
    </form>
  );
}