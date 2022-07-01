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

  const customErrorMessages = {
    'input/local-error': (inputName, error) => {
      setInputs((prev) => ({
        [inputName]: {
          ...prev[inputName],
          "error": error 
        }
      }))
    },

		'auth/email-not-verified': () => {
      return {
        message: "Your email isn't verified",
        type: 'email',
        scope: 'global',
      }
    },
		'auth/user-not-found': () => {
      return {
        message: 'Incorrect email or password',
        type: 'email',
        scope: 'global',
		  }
    },
		'auth/wrong-password': () => {
      return {
        message: 'Incorrect email or password',
        type: 'email',
        scope: 'global',
		  }
    },
		'auth/too-many-requests': () => {
      return {
        message: 'Too many requests with this email. Please wait.',
        type: 'password',
        scope: 'global',
		  }
    },
		'auth/email-already-in-use': () => {
      return {
        message: 'Email already exists.',
        type: 'email',
        scope: 'global',
		  }
    },
		'auth/invalid-email': () => {
      return {
        message: 'Your email is badly formatted',
        type: 'email',
        scope: 'local',
		  }
    },
	};

  const validate = (e) => {
    // console.log(inputs)
    e.preventDefault();

    for(let i in inputs) {
      if(inputs[i].type == "password") {
        if(inputs[i].value.length < 6) {
          customErrorMessages["input/local-error"](i, "The password must have at least 6 characters")
        }
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
