import React, { useContext, useState, useEffect } from "react";

const ValidationContext = React.createContext();

export const useValidation = () => {
  return useContext(ValidationContext);
};

export const ValidationProvider = ({ children }) => {
  const [inputs, setInputs] = useState({})

  const addInput = (name, value, type) => {
    setInputs((prev) => ({
      ...prev,
      [name]: {
        "value": value,
        "type": type,
      }
    }))
  }

  const validate = (e) => {
    // console.log(inputs)
    e.preventDefault();

    for(let i in inputs) {
      setInputs((prev) => ({
        [i]: {
          ...prev[i],
          "error": inputs[i].value
        }
      }))

      if(inputs[i].type == "password") {
        
      } else if(inputs[i].type == "email") {
        
      }
    }
    
  }

useEffect(() => {
  console.log("sass", inputs)
}, [inputs])

  
  return (
    <ValidationContext.Provider value={{inputs, addInput, validate}}>
      {children}
    </ValidationContext.Provider>
  );
};
