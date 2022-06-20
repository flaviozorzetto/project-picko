import React from "react";
import "./Checkbox.scss"

export default function Checkbox(props) {
  return (
    <>
      <div className="checkbox-container">
        <input type="checkbox" className="checkbox" id={props.name} />
        <div className="checkbox-background">
          <i></i>
        </div>

        <label className="checkbox-label" for={props.name}></label>
        <div className="checkbox-container-background"></div>
        
      </div>
    </>
  )
}
