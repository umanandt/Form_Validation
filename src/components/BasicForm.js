import useInput from "../hooks/use-input";

const BasicForm = (props) => {
  const {
    value: enteredNameValue,
    isValid: NameIsValid,
    hasError: firstNameError,
    valueChangeHandler: firstvalueChangeHandler,
    inputBlurHandler: firstvalueBlurHandler,
    reset: resetFirstNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredLastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameError,
    valueChangeHandler: lastvalueChangeHandler,
    inputBlurHandler: lastvalueBlurHandler,
    reset: resetLastNameInput,
  } = useInput((value) => value.trim() !== "");

  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const {
    value: enteredEmailValue,
    isValid: emailIsValid,
    hasError: emailError,
    valueChangeHandler: emailvalueChangeHandler,
    inputBlurHandler: emailvalueBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.match(mailFormat));


  let formIsValid = false;

  if(!firstNameError && !lastNameError && !emailError){
    formIsValid = true;
  }

  const formHandler = (event) => {
    event.preventDefault();
    firstvalueBlurHandler();
    lastvalueBlurHandler();
    emailvalueBlurHandler();

    
     
    if(!NameIsValid && !lastNameIsValid && !emailIsValid){
      return;
    }
    console.log(enteredNameValue, enteredLastNameValue, enteredEmailValue);
    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
  };

  const firstNameCssClass = !firstNameError ? 'form-control' : 'form-control invalid';
  const LastNameCssClass  = !lastNameError ? 'form-control' : 'form-control invalid';
  const emailCssClass = !emailError ? 'form-control' : 'form-control invalid'; 


  return (
    <form onSubmit={formHandler}>
      <div className="control-group">
        <div className={firstNameCssClass}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            onChange={firstvalueChangeHandler}
            onBlur={firstvalueBlurHandler}
            value={enteredNameValue}
          />
          {firstNameError && <p className="error-text"> Name should not be empty and valid</p>}
        </div>
        <div className={LastNameCssClass}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            onChange={lastvalueChangeHandler}
            onBlur={lastvalueBlurHandler}
            value={enteredLastNameValue}
          />
          {lastNameError && <p className="error-text"> Last should not be empty and valid</p>}
        </div>
      </div>
      <div className={emailCssClass}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          onChange={emailvalueChangeHandler}
          onBlur={emailvalueBlurHandler}
          value={enteredEmailValue}
        />
        {emailError && <p className="error-text"> Email should not be empty and valid</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
