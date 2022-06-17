import "./Form.scss";
import React from "react";
import TextArea from "../../components/TextArea/TextArea";

export default function Form(props) {
  // let authError = "Message of error"

  return (
    <div className="form">
      {props.children}
      {/* {authError && <span className="error_message">{authError}</span>} */}
      {props.authError && <span className="form_error">{props.authError}</span>}
    </div>
  );
}
