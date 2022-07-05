import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import loadIcon from "../Elements/IconLoader/icon-loader";
import "./Checkbox.scss";

export default function Checkbox(props) {
  const [input = {checked: props.checked ? props.checked : false}, setInput] = useState()
  
  useEffect(() => {
    const checkbox = document.getElementById("checkbox");
    const checkboxContainerBackground = document.getElementsByClassName("checkbox-container-background")[0];

    checkbox.addEventListener("keydown", event => {
      if(event.code === "Space") {
        console.log("activated with space", checkbox)

        if(input.checked) {
          checkboxContainerBackground.style.animation = "deactivatingCheckbox 0.15s ease-in-out forwards";
        } else if (!input.checked) {
          checkboxContainerBackground.style.animation = "activatingCheckbox 0.15s ease-in-out forwards";
        }
      }
    })

    checkbox.addEventListener("keyup", event => {
      if(event.code === "Space") {

        checkboxContainerBackground.style.animation = "";
      }
    })
  }, [input])

  const handleChange = (event) => {
    setInput({checked: event.target.checked})
  }

  return (
    <>
    <div className="wrapper">
      <label className="checkbox-label" htmlFor={props.name}>
        <span>I agree to the <Link to="/">terms & services</Link></span>
      </label>

      <div className="checkbox-container">
        <input defaultChecked={input.checked} onChange={handleChange} type="checkbox" className="checkbox" id={props.name} disabled={props.disabled}/>
        <i className="check-icon">{loadIcon("check", { width: 18, height: 18 })}</i>
        <div className="checkbox-background"></div>
        <div className="checkbox-container-background"></div>
      </div>
    </div>
    </>
  )
}