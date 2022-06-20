import "./Form.scss";
import React from "react";
import TextArea from "../../components/TextArea/TextArea";

export default function Form(props) {
  // let authError = "Message of error"

  return (
    <form className="form" method={props.method} target={props.target} action={props.action} onSubmit={props.onSubmit}>
      {props.children}
      {props.authError && <span className="error_message">{props.authError}</span>}
    </form>
  );
}
