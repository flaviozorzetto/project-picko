import "./Form.scss";
import React, { useState, useEffect, useContext } from "react";
import Banner from "../../components/Banner/Banner.js"
import { useValidation } from "../../contexts/ValidationContext.js";

export default function Form(props) {
  const { inputs, validate } = useValidation();

  let count = 0
  for(let i in inputs) {
    

    console.log(count, inputs[i].value)
    count++
  }
  
  const validateAndSubmit = (event) => {
    validate(event)

    // console.log("Form.js", inputs)
    // console.log("Form.js", inputs["email"].value)
    
    // console.log(props.children)

    props.onSubmit(event)
  }

  const [errorMessageDisplay, setErrorMessageDisplay] = useState("")

  // useEffect(() => {
  //   if(props.error) {
  //     setErrorMessageDisplay(true)
  //   }
  // }, [props.error])

  // const handleChange = (e) => {
  //   setErrorMessageDisplay(false)
  // }
  

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