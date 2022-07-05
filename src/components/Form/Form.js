import "./Form.scss";
import React, { useState, useEffect, useContext } from "react";
import Banner from "../../components/Banner/Banner.js"
import { useValidation } from "../../contexts/ValidationContext.js";

export default function Form(props) {
  const { validation, removeInput, currentForm, setCurrentForm, currentInputs, inputs, setInputs } = useValidation();
  
  let state = props.state;
  let reset = props.reset;

  useEffect(() => {
    // if(props.id !== currentForm) {
    //   console.log("TROCOU DE FORM", currentInputs)
    // }
    setCurrentForm(props.id)

    // if(!inputs[currentForm]) {
    //   setInputs((prev) => ({
    //     ...prev,
    //     [currentForm] : {}
    //   }))
    // }

  }, [inputs.length])

  // setCurrentForm(props.id)

  const validateAndSubmit = async (event) => {
    event.preventDefault()
    if(!validation()) return;

    let res = await props.onSubmit(event)
    console.log("dasasdasd", res)
    if(res) {
      removeInput(true); 
      reset(Object.keys(state))
    }
  }

  return (
    <form noValidate id={props.id} className="form" method={props.method} target={props.target} action={props.action} onSubmit={validateAndSubmit}>
      {props.error && props.error.scope == "global" && currentForm !== "signup-form" &&
        <Banner iconLeft="alert-circle" theme="danger" content={props.error.message} />
      }
      {props.children}
    </form>
  );
}