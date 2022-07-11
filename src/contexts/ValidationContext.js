import React, { useContext, useEffect, useState } from "react";
const ValidationContext = React.createContext();

export const useValidation = () => {
  return useContext(ValidationContext);
};

export const ValidationProvider = ({ children }) => {
  let isValidated = true;

  const [isFirstRender, setIsFirstRender] = useState(false);
  const [currentForm, setCurrentForm] = useState("");
  const [inputs, setInputs] = useState({});
  
  const checkIfIsFirstRender = (formId) => {
    if(currentForm.length > 0 && currentForm !== formId) {
      // console.log(`form changed from "${currentForm}" to "${formId}"`);
      setIsFirstRender(true);
    }
    setCurrentForm(formId);
  }

  const addNewInput = (stateObject) => {
    /* 
      if the inputs object doesn't have any input, it's the first render. 
      So we will add all the inputs of the form in the inputs object, overriding 
      previous inputs. This will also prevent the validation function to validate 
      inputs from other form.
    */
    if(Object.keys(inputs).length == 0 || isFirstRender) {
      setInputs(stateObject)
      setIsFirstRender(false);
    } else {
      for(let state in stateObject) { //  will add the input changes
        setInputs((prev) => ({
          ...prev,
          [state]: {
            // ...prev[state], // will keep the red alert for all the textAreas that doesn't change after the validation, but also will keep the error message if there's two forms with the same input name
            "value": stateObject[state].value,
            "type": stateObject[state].type,
            "step": stateObject[state].step
          }
        }))
      }
    }
  }

  const setValidationErrorMessage = (input, message) => {
    setInputs((prev) => ({
      ...prev, // will save previous inputs on the same form
      [input]: {
        ...prev[input], // will save the step value
        "value": inputs[input].value,
        "message": message,
        "type": inputs[input].type,
      }
    }))
    isValidated = false;
  }

  const validate = (stepToValidate = 1) => {
    isValidated = true;
    for(let currentInput in inputs) {
      if(inputs[currentInput].step == stepToValidate) {
        if(currentInput == "email") {
          if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputs[currentInput].value) == false) {
            setValidationErrorMessage(currentInput, "You must enter an valid email address")
          }
        }

        if(currentInput == "password" && inputs["password-confirmation"]) { // if there's a password confirmation input, then it's a signup page
          if (inputs[currentInput].value.length > 0 && inputs[currentInput].value.length < 6) {
            setValidationErrorMessage(currentInput, "The password must have at least 6 characters") // this message should appear only in the signup page
          }
        }

        if(currentInput == "password-confirmation") {
          if(inputs[currentInput].value !== inputs["password"].value) {
            setValidationErrorMessage(currentInput, "Passwords do not match")
          }
        }

        if(inputs[currentInput].value.length == 0) {
          setValidationErrorMessage(currentInput, "This field cannot be empty.")
        }
      }
      /*
        if there's a error in any input on the form, the user will not be able to advance.
        But when the form has multiple steps, the user can get stuck on the first step if he trigger an error 
        on the step 2 and get back to step 1. This condition will fix this bug.
      */
      if(inputs[currentInput].message && inputs[currentInput].step <= stepToValidate) {
        console.log("theres a error message on the: ", currentInput)
        isValidated = false;
      }
    }

    return isValidated;
  }

  return (
    <ValidationContext.Provider value={{inputs, setInputs, validate, addNewInput, currentForm, checkIfIsFirstRender}}>
      {children}
    </ValidationContext.Provider>
  );
};