import React, { useContext, useEffect, useState } from "react";

const ValidationContext = React.createContext();

export const useValidation = () => {
  return useContext(ValidationContext);
};

export const ValidationProvider = ({ children }) => {
  let isValidated = true;

  // needs to be automated to put all the forms that exists
  const [inputs, setInputs] = useState({
    "login-form": {},
    "signup-form": {}
  });

  const [currentInputs, setCurrentInputs] = useState([]);
  const [currentForm, setCurrentForm] = useState("")

  const addInput = (name, value, type, currentForm) => {
    setInputs((prev) => ({
      ...prev,
      [currentForm]: {
        ...prev[currentForm],
        [name]: {
          "value": value,
          "type": type,
          "message": "",
        }
      }
    }))
  }

  const removeInput = (reset = false) => {
    let inputsToRemove = [];
    if(reset) {
      for(let name in inputs[currentForm]) {
        delete inputs[currentForm][name]
      }
    }

    for(let name of currentInputs) {
      if(inputs[currentForm][name]) {
        inputsToRemove.push(name);
        console.log("deletou:", inputs[currentForm][name])
        delete inputs[currentForm][name];
      }
    }
    return inputsToRemove
  }

  const customErrorMessages = {
    'input/local-error': (inputName, error) => {
      setInputs((prev) => ({
        ...prev,
        [currentForm]: {
          ...prev[currentForm],
          [inputName]: {
            ...prev[currentForm][inputName],
            "message": {
              message: error,
              type: inputs[currentForm][inputName].type,
              scope: "local"
            } 
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

    for(let name in inputs[currentForm]) {
      if(inputs[currentForm][name]) {

        if(inputs[currentForm][name].type == "password") {
          if(name == "password-confirmation") {
            if(inputs[currentForm]["password"].value !== inputs[currentForm][name].value) {
              customErrorMessages["input/local-error"](name, "Passwords do not match")  
            }
          }
  
          if(inputs[currentForm][name].value.length > 0 && inputs[currentForm][name].value.length < 6) {
            customErrorMessages["input/local-error"](name, "The password must have at least 6 characters")
          }
        } else if(inputs[currentForm][name].type == "email") {
          if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputs[currentForm][name].value) == false) {
            customErrorMessages["input/local-error"](name, "You must enter an valid email address")
          } 
        }
  
        if(inputs[currentForm][name].value.length == 0) {
          customErrorMessages["input/local-error"](name, `The ${inputs[currentForm][name].type} field cannot be empty`)
        }
      }

    }
    return isValidated;
  }

  return (
    <ValidationContext.Provider value={{inputs, setInputs, addInput, removeInput, currentInputs, setCurrentInputs, validation, currentForm, setCurrentForm}}>
      {children}
    </ValidationContext.Provider>
  );
};
