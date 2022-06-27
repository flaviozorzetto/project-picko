import "./Form.scss";
import React, { useState, useEffect } from "react";

export default function Form(props) {
  const validateAndSubmit = async (e) => {
    e.preventDefault()
    
    // for(let i = 0; i < e.target.length; i++) {
    //   let input = e.target[i]
    //   let error = document.getElementsByClassName(`${input.id}`)[0]
      
    //   // error.style.display = "none"

    //   // if(input.type == "email") {

    //   // } else if(input.type == "password") {

    //   // }
    // }

    await props.onSubmit(e)
  }

  return (
    <form noValidate id={props.id} className="form" method={props.method} target={props.target} action={props.action} onSubmit={validateAndSubmit}>
      {props.children}
    </form>
  );
}