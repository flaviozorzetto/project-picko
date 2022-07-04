import React, { useContext, useState } from "react";

const ValidationContext = React.createContext();

export const useValidation = () => {
  return useContext(ValidationContext);
};

export const ValidationProvider = ({ children }) => {
  let isValidated = true;
  const [inputs, setInputs] = useState({});
  const [currentInputs, setCurrentInputs] = useState([]);

  const [currentForm, setCurrentForm] = useState("")

  const addInput = (name, value, type) => {
    setInputs((prev) => ({
      ...prev,
      [name]: {
        "value": value,
        "type": type,
        "message": "",
      }
    }))
  }

  const removeInput = () => {
    let inputsToRemove = [];
    for(let name of currentInputs) {
      if(inputs[name]) {
        inputsToRemove.push(name);
        delete inputs[name];
      }
    }
    return inputsToRemove
  }

  const customErrorMessages = {
    'input/local-error': (inputName, error) => {
      console.log(inputName, error)
      setInputs((prev) => ({
        ...prev,
        [inputName]: {
          ...prev[inputName],
          "message": {
            message: error,
            type: inputs[inputName].type,
            scope: "local"
          } 
        }
      }))
      isValidated = false;
    },
		'auth/email-not-verified': {
        message: "Your email isn't verified",
        type: 'email',
        scope: 'global',
    },
		'auth/user-not-found': {
        message: 'Incorrect email or password',
        type: 'email',
        scope: 'global',
    },
		'auth/wrong-password': {
        message: 'Incorrect email or password',
        type: 'email',
        scope: 'global',
    },
		'auth/too-many-requests': {
        message: 'Too many requests with this email. Please wait.',
        type: 'password',
        scope: 'global',
    },
		'auth/email-already-in-use': {
        message: 'Email already exists.',
        type: 'email',
        scope: 'global',
    },
	};

  const validation = (errorCode) => {
    isValidated = true;
    // if there's a global error before the auth
    if(errorCode) {
      let errorMessage = customErrorMessages[errorCode]
      return errorMessage ? errorMessage : 'Failed to validate';
    }

    for(let name in inputs) {
      if(inputs[name].type == "password") {
        if(name == "password-confirmation") {
          if(inputs["password"].value !== inputs[name].value) {
            customErrorMessages["input/local-error"](name, "Passwords do not match")  
          }
        }

        if(inputs[name].value.length > 0 && inputs[name].value.length < 6) {
          customErrorMessages["input/local-error"](name, "The password must have at least 6 characters")
        }
      } else if(inputs[name].type == "email") {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputs[name].value) == false) {
          customErrorMessages["input/local-error"](name, "You must enter an valid email address")
        } 
      }

      if(inputs[name].value.length == 0) {
        customErrorMessages["input/local-error"](name, `The ${inputs[name].type} field cannot be empty`)
      }
      console.log("input value", inputs[name].value)
    }
    return isValidated;
  }

  return (
    <ValidationContext.Provider value={{inputs, setInputs, addInput, removeInput, currentInputs, setCurrentInputs, validation, currentForm, setCurrentForm}}>
      {children}
    </ValidationContext.Provider>
  );
};
