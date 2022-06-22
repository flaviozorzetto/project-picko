import React from "react";
import loadIcon from "../Elements/IconLoader/icon-loader";
import "./Checkbox.scss";

export default function Checkbox(props) {
  return (
    <>
      <div className="checkbox-container">
        

        <input type="checkbox" className="checkbox" id={props.name} disabled={props.disabled}/>
        <i className="check-icon">{loadIcon("check", { width: 18, height: 18 })}</i>

        <div className="checkbox-background"></div>

        <label className="checkbox-label" htmlFor={props.name}></label>
          
        <div className="checkbox-container-background"></div>
        
      </div>
    </>
  )
}
