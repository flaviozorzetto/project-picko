import "./Form.scss";
import React, { useState, useEffect } from "react";
import Banner from "../../components/Banner/Banner.js"
import { useValidation } from "../../contexts/ValidationContext.js"

export default function Form(props) {
  const { validate, inputs, checkIfIsFirstRender } = useValidation();

  useEffect(() => {
    checkIfIsFirstRender(props.id);
  }, [inputs.length])

  const formValidation = (event) => {
    event.preventDefault();

    if (!validate()) return;
    props.onSubmit(event);
  }


  return (
    <form noValidate id={props.id} className="form" method={props.method} target={props.target} action={props.action} onSubmit={formValidation}>
      {props.error && props.error.scope == "global" && props.id !== "signup-form" &&
        <Banner iconLeft="alert-circle" theme="danger" content={props.error.message} />
      }
      {props.children}
    </form>
  );
}