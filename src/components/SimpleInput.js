
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  // I am using custom hooks that's why commenting out existing states

  const {
    value: enteredName, //alias
    isValid: enteredNameIsValid, //alias
    hasError: nameInputHasError, //alias
    valueChangeHandler: nameChangeHandler, //alias
    inputBlurHandler: nameBlurHandler, //alias
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");


  // using cutom hook for mail validation

  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const {
    value: enteredEmail, //alias
    isValid: enteredEmailIsValid, //alias
    hasError: emailInputHasError, //alias
    valueChangeHandler: emailChangeHandler, //alias
    inputBlurHandler: emailBlurHandler, //alias
    reset: resetEmailInput,
  } = useInput(
    ((value) => value.includes('@'))
  );

  //  const fetchValue = useRef();
  // console.log(fetchValue);

  // Name State
  // const [enteredName, setEnterednName] = useState("");
  // optional -  const [enteredNameIsValid, setEnterednNameIsValid] = useState(false);
  // const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  // email state
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  // use one more state to check if the form is valid
  // if one field is not correct means it is invalid
  //const [formIsValid, setFormIsValid] = useState(false);

  //const enteredNameIsValid = enteredName.trim() !== "";
  //const nameInputIsnvalid = !enteredNameIsValid && enteredNameTouched;
  let formIsValid = false;

  // on Input Name handler
  // const nameInputChangeHandler = (event) => {
  //  setEnterednName(event.target.value);
  // };
  // const nameInputBlurHandler = (event) => {
  //   setEnteredNameTouched(true);
  // };

  // on Email handler
  let emailFormat = false;
  const enteredEmailIsSpaceFree = enteredEmail.trim() !== "";
  // const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  // const emailInputChangeHandler = (event) => {
  //  setEnteredEmail(event.target.value);
  //  if (event.target.value.match(mailFormat)) {
  //    emailFormat = true;
  //  }
  // };
  // const emailInputBlurHandler = (event) => {
  //  setEnteredEmailTouched(true);
  // };

 // const emailBoxEmptyTouched = enteredEmailTouched && !enteredEmailIsSpaceFree;
  const emailInputisRight =
    emailFormat && enteredEmailIsSpaceFree && emailInputHasError;

  if (nameInputHasError && emailInputHasError) {
    formIsValid = true;
  }

  // form- submission
  const formSubmissionHandler = (event) => {
    event.preventDefault();
    //setEnteredNameTouched(true);

    nameBlurHandler();
    emailBlurHandler();
    
    //setEnteredEmailTouched(true);

    if (!enteredNameIsValid && !enteredEmailIsSpaceFree && !emailInputisRight) {
      return;
    }

    console.log(enteredEmail);
    console.log(enteredName);

    // setEnterednName("");
    // setEnteredNameTouched(false);
    resetNameInput();
    resetEmailInput();
    //setEnteredEmail("");
    //setEnteredEmailTouched(false);

    //setEnterednNameIsValid(true);
    // useref
    // const enteredValue = fetchValue.current.value;
    // console.log(enteredValue);
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>

      {/* email INPUT*/}

      <div className={emailInputClasses}>
        <label htmlFor="name">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && (
          <p className="error-text">Email must not be empty</p>
        )}
      </div>

      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
