import React from 'react';
import './Input.css';

export function Input(props) {

    return (
        <div className="input-component">
            <input 
              type={props.type} 
              value={props.value} 
              className={`input ${props.classStyle}`}
              onChange={props.change}
              placeholder={props.placeholder}
            />
        </div>
  )
}
