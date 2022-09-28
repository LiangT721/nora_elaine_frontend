import React, { useReducer, useEffect } from "react";

import { validate } from "../util/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialsValue || "",
    isTouched: false,
    isValid: props.initialValid || false
  });

  const { id, onInput, alarm } = props;
  const { value, isValid } = inputState;

  useEffect(()=>{
    alarm && touchHandler()
    onInput(id, value, isValid);
  },[id, value, isValid, onInput, alarm])

  const changeHandler = (e) => {
    console.log('change')
    dispatch({
      type: "CHANGE",
      val: e.target.value,
      validators: props.validators
    });
  };
  const touchHandler = () => {
    dispatch({
      type: "TOUCH"
    });
  };

  return (
    <div className={`input ${props.className}`}>
      <input
        className={`input__text ${
          !inputState.isValid && inputState.isTouched && "input__invalid"
        }`}
        id={props.id}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      ></input>
      <label htmlFor="props.id" className="input__label">
        {props.label}
      </label>
    </div>
  );
};

export default Input;
