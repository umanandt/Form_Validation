import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if(action.type === 'INPUT'){
     return { value: action.value, isTouched: state.isTouched }; // we have used state.touched it means we need previous value

  }
  if(action.type === 'BLUR'){
      return { isTouched: true, value: state.value };
  }
  if(action.type === 'RESET'){
     return { value: '', isTouched: false};
  }

  return inputStateReducer;
};

const useInput = (validateValue) => {

  //  const [enteredValue, setEnteredValue] = useState("");
  //  const [isTouched, setIsTouched] = useState(false);

  // here I am using reducer which gets two value first one consist 
  // state and action and the other one gets the initial value.

  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  /*const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };*/

  const valueChangeHandler = (event) => {
   dispatch({type: 'INPUT', value: event.target.value})
  };

  const inputBlurHandler = (event) => {
    dispatch({type: 'BLUR'});
  }

  const reset = () => {
  //  setEnteredValue("");
  //  setIsTouched(false);

  dispatch({type: 'RESET'});
  };

  return {
    value:  inputState.value,   // enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
