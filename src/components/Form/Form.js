import "./Form.scss";
import React, { useState, useEffect } from "react";
import Banner from "../../components/Banner/Banner.js"

export default function Form(props) {
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
    <form noValidate id={props.id} className="form" method={props.method} target={props.target} action={props.action} onSubmit={props.onSubmit}>
      {/* errorMessageDisplay &&  */}
      {props.error && props.error.scope == "global" &&
        <Banner iconLeft="alert-circle" theme="danger" content={props.error.message} />
      }

      {props.children}
    </form>
  );
}