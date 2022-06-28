import "./Form.scss";
import React, { useState, useEffect } from "react";

export default function Form(props) {
  const validateAndSubmit = async (e) => {
    e.preventDefault()
    
    for(let i = 0; i < e.target.length; i++) {
      let input = e.target[i]
      let error = document.getElementsByClassName(`${input.id}`)[0] // vai pegar todos os elementos q são inputs
      
      
      // if(input.type == "email") {
      //   // *regra pra validação*

      //   // error.style.display = "block"
      //   // input.classList.add("error_message");
      // } else if(input.type == "password") {
      //   // *regra pra validação*
      // }
    }

    await props.onSubmit(e)
  }

  return (
    <form noValidate id={props.id} className="form" method={props.method} target={props.target} action={props.action} onSubmit={validateAndSubmit}>
      {props.children}
    </form>
  );
}