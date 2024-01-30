import React from 'react';
import './Input.css';

export function Input(props) {

    return (
        <input 
          type={props.type} 
          value={props.value} 
          className={props.classStyle}
          onChange={props.change}
          placeholder={props.placeholder}
        />
  )
}
