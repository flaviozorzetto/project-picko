import "./Form.scss";
import React, { useState, useEffect, useContext } from "react";
import Banner from "../../components/Banner/Banner.js"
import { useValidation } from "../../contexts/ValidationContext.js";

export default function Form(props) {
  const { inputs, validate } = useValidation();

  const validateAndSubmit = (event) => {
    event.preventDefault()
    if(!validate()) return;

    props.onSubmit(event)
  }

  return (
    <form noValidate id={props.id} className="form" method={props.method} target={props.target} action={props.action} onSubmit={validateAndSubmit}>
      {/* errorMessageDisplay &&  */}
      {props.error && props.error.scope == "global" &&
        <Banner iconLeft="alert-circle" theme="danger" content={props.error.message} />
      }

      {props.children}
    </form>
  );
}