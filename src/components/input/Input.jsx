import React from 'react';
import './Input.css';

export function Input(props) {
    return (
      <input 
        type={props.inputType} 
        value={props.inputValue} 
        className={`${props.inputStyle}`}
        onChange={props.inputOnChange}
        placeholder={props.inputPlaceholder}
      />
  )
}
