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
        "error": "",
      }
    }))
  }

  const customErrorMessages = {
    'input/local-error': (inputName, error) => {
      setInputs((prev) => ({
        ...prev,
        [inputName]: {
          ...prev[inputName],
          "error": {
            error: error,
            type: inputs[inputName].type,
            scope: "local"
          } 
        }
      }))
    },
		'auth/email-not-verified': {
        error: "Your email isn't verified",
        type: 'email',
        scope: 'global',
    },
		'auth/user-not-found': {
        error: 'Incorrect email or password',
        type: 'email',
        scope: 'global',
    },
		'auth/wrong-password': {
        error: 'Incorrect email or password',
        type: 'email',
        scope: 'global',
    },
		'auth/too-many-requests': {
        error: 'Too many requests with this email. Please wait.',
        type: 'password',
        scope: 'global',
    },
		'auth/email-already-in-use': {
        error: 'Email already exists.',
        type: 'email',
        scope: 'global',
    },
		'auth/invalid-email': {
        error: 'Your email is badly formatted',
        type: 'email',
        scope: 'local',
    },
	};

  const validate = (errorCode) => {
    if(errorCode) {
      let errorMessage = customErrorMessages[errorCode]
      return errorMessage ? errorMessage : 'Failed to validate';
    }

    for(let i in inputs) {
      console.log("asdasd", inputs[i])
      if(inputs[i].type == "password") {
        if(inputs[i].value.length < 6) {
          customErrorMessages["input/local-error"](i, "The password must have at least 6 characters")
        }

        if(inputs[i].value.length == 0) {
          customErrorMessages["input/local-error"](i, "The password field cannot be empty")
        }
      } else if(inputs[i].type == "email") {
        
        if(inputs[i].value.length == 0) {
          customErrorMessages["input/local-error"](i, "The email field cannot be empty")
        }
      }

      if(inputs[i].error) return false;
    }
    
  }

  
  return (
    <ValidationContext.Provider value={{inputs, addInput, validate}}>
      {children}
    </ValidationContext.Provider>
  );
};
