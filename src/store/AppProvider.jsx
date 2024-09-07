import { children, useContext, useReducer } from "react";
import appContext from "./app-context";
import Cookies from 'js-cookie';

const appReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_CODE": {
      const prevState = { ...state };
      state.code = action.payload.code;
      Cookies.set('code',action.payload.code, {expires:7});
      return { ...state };
    }
    case "CHANGE_INPUT": {
      const prevState = { ...state };
      state.input = action.payload.input;
      Cookies.set('input',action.payload.input, {expires:7});
      return { ...state };
    }
    case "CHANGE_OUTPUT": {
      const prevState = { ...state };
      state.output = action.payload.output;
      Cookies.set('output',action.payload.output, {expires:7});
      return { ...state };
    }
    default: {
      break;
    }
  }
};

const initialState = {
  code: "write your code here",
  input: "Input",
};
const AppProvider = ({ children }) => {
  const [appState, dispatchAppAction] = useReducer(appReducer, initialState);
  const handleCodeChange = (code) => {
    dispatchAppAction({ type: "CHANGE_CODE", payload: { code: code } });
  };
  const handleInputChange = (input) => {
    dispatchAppAction({ type: "CHANGE_INPUT", payload: { input: input } });
  };

  const handleButtonClick = async () => {
    handleOutputChange("Loading...");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/run-code/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          code: appState.code,
          input: appState.input,
        }),
      });

      if (!response.ok) {
        // Handle HTTP errors and display error messages
        const errorResponse = await response.json();
        console.error("Error response:", errorResponse);
        // You can handle error display or UI updates here
        handleOutputChange(errorResponse.error || "An unknown error occurred");
        return;
      }

      const output = await response.json();
      handleOutputChange(output.output);
      console.log("Successful response:", output);
    } catch (error) {
      // Handle network errors
      console.error("Network error:", error);
      // You can handle network error display or UI updates here
      handleOutputChange("Network error: " + error.message);
    }
  };

  const handleOutputChange = (output) => {
    dispatchAppAction({ type: "CHANGE_OUTPUT", payload: { output: output } });
  };
  const defaultValue = {
    handleCodeChange,
    handleInputChange,
    appState,
    handleButtonClick,
    handleOutputChange,
  };

  return (
    <appContext.Provider value={defaultValue}>{children}</appContext.Provider>
  );
};
export default AppProvider;
