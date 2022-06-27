import React, { useState, useEffect } from "react";
import loadIcon from "../Elements/IconLoader/icon-loader";
import { Link, useNavigate } from "react-router-dom";
import "./TextArea.scss"

export default function TextArea(props) {
  const [input = {value: ""}, setInput] = useState()
  const [errorMessageDisplay, setErrorMessageDisplay] = useState(props.error);

  useEffect(() => {
    if(props.error) {
      setErrorMessageDisplay(true);
    }
  }, [props.error])

  const handleChange = (event) => {
    setInput({value: event.target.value})

    if(props.error) {
      setErrorMessageDisplay(false);
    }
  }

  // const checkInput = (e) => {
  //   if(props.type = "email") {
  //     if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.value)) {
  //       console.log("deu bom!!!")
  //     } else {
  //       console.log("error!!!!!")
  //     }
  //   }
  // }

  return (
    <>
      {errorMessageDisplay && 
        <div className="error_message-container">
          <span className="error_message">{props.error}</span>
        </div>
      }

      <div className="text-area-container">
        <label className="text_label" htmlFor={props.name}>{props.children}</label>
        <div className="input_container">
          <input
            onChange={handleChange}
            className={`text_input${errorMessageDisplay ? " text_input_error" : ""}${props.iconLeft ? " pl-50" : ""}${props.iconRight ? " pr-50" : ""}`}
            type={props.type}
            ref={props.inputRef}
            placeholder={props.placeholder}
            name={props.name}
            required={props.required}
            error={props.error}
            disabled={props.disabled}
            id={props.name}
          ></input>
          {props.iconLeft && <i className="icon-left">{loadIcon(props.iconLeft)}</i>}
          {props.iconRight && <i className="icon-right">{loadIcon(props.iconRight)}</i>}
        </div>
      </div>

      {/* <div className={`error_message-container ${props.name}`}>
        <span className="error_message"></span>
      </div> */}
    </>
  )
}