import "./Form.scss";
import React, { useState, useEffect, useContext } from "react";
import Banner from "../../components/Banner/Banner.js"
import { useValidation } from "../../contexts/ValidationContext.js";

export default function Form(props) {
  const { validation, removeInput } = useValidation();
  let state = props.state;
  let reset = props.reset;

  const validateAndSubmit = (event) => {
    event.preventDefault()
    if(!validation()) return;
    props.onSubmit(event)

    removeInput(); 
    reset(Object.keys(state))
  }

  return (
    <form noValidate id={props.id} className="form" method={props.method} target={props.target} action={props.action} onSubmit={validateAndSubmit}>
      {props.error && props.error.scope == "global" &&
        <Banner iconLeft="alert-circle" theme="danger" content={props.error.message} />
      }
      {props.children}
    </form>
  );
}