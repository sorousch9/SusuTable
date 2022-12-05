import { useState } from "react";

const Input = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [validEnteredName, setValidEnteredName] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const nameHandeler = (event) => {
    setEnteredName(event.target.value);
    if (event.target.value.trim() !== "") {
      setValidEnteredName(true);
    }
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true)
    if (enteredName.trim() === "") {
      setValidEnteredName(false);
    }
  }
  const formSubmitHandler = (event) => {
    event.preventDefault();

    setEnteredNameTouched(true)
    if (enteredName.trim() === "") {
      setValidEnteredName(false);
      return;
    }
    setValidEnteredName(true);
    console.log(enteredName )
    setEnteredName("");
  };
  const nameInputIsInvalid= !validEnteredName && enteredNameTouched

  const inputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

    
  return (
    <form onSubmit={formSubmitHandler}>
      <div className={inputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameHandeler}
          value={enteredName}
          onBlur={nameInputBlurHandler}
        />
        {nameInputIsInvalid && <p className="error-text">name must not empty</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default Input;
