import React, { useContext, useState, useEffect } from "react";

const ValidationContext = React.createContext();

export const useValidation = () => {
  return useContext(ValidationContext);
};

export const ValidationProvider = ({ children }) => {
  let [inputs, setInputs] = useState({})

  const addInput = (name, value, type) => {
    setInputs((prev) => {
      inputs[name] = {
        "value": value,
        "type": type
      }
      return inputs
    })
  }

  const validate = (e) => {
    e.preventDefault();

    for(let i in inputs) {

    // console.log(i, inputs[i].value)
      if(inputs[i].type == "password") {
        
        if(!inputs[i].value /* || .test(//g) */) {
          return "Password must have at least 6 characters"
        }

      } else if(inputs[i].type == "email") {

      }
    }
  }

  return (
    <ValidationContext.Provider value={{inputs, addInput, validate}}>
      {children}
    </ValidationContext.Provider>
  );
};
