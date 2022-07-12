import React, { useState, useEffect } from "react";
import loadIcon from "../Elements/IconLoader/icon-loader";
import { Link } from "react-router-dom";
import { useValidation } from "../../contexts/ValidationContext.js";

import "./Checkbox.scss";

export default function Checkbox(props) {
  const { inputs, setInputs } = useValidation();
  
  useEffect(() => {
    const checkbox = document.getElementById(props.name);
    const checkboxContainerBackground = document.getElementsByClassName("checkbox-container-background")[0];

    checkbox.addEventListener("keydown", event => {
      if(event.code === "Space") {
        // console.log("activated with space", checkbox) // there's a bug in this useEffect that stacks the number of calls when the input is checked by the spacebar

        if(inputs[props.name].value) {
          checkboxContainerBackground.style.animation = "deactivatingCheckbox 0.15s ease-in-out forwards";
        } else if (!inputs[props.name].value) {
          checkboxContainerBackground.style.animation = "activatingCheckbox 0.15s ease-in-out forwards";
        }
      }
    })

    checkbox.addEventListener("keyup", event => {
      if(event.code === "Space") {

        checkboxContainerBackground.style.animation = "";
      }
    })
  }, [inputs[props.name]])

  const handleChange = (event) => {
    setInputs((prev) => ({
      ...prev,
      [props.name]: {
        ...prev[props.name],
        message: "",
      },
    }));
    // console.log("TESTE", inputs)

    props.onChange(event)
  }

  return (
    <>
      <label className="checkbox-label" htmlFor={props.name}>
        <div className="checkbox-container">
          <input defaultChecked={inputs[props.name] ? inputs[props.name].value : null} name={props.name} onChange={handleChange} type="checkbox" className="checkbox" id={props.name} disabled={props.disabled}/>
          <i className="check-icon">{loadIcon("check", { width: 18, height: 18 })}</i>
          <div className="checkbox-background"></div>
          <div className="checkbox-container-background"></div>
        </div>
        {props.content}
      </label>
    </>
  )
}