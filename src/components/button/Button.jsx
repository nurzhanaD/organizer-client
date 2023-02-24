import React from 'react';
import './Button.css';

export function Button(props) {
    return (
        <button 
            type="button" 
            className={`btn ${props.classStyle}`}
            onClick={props.click}
        >{props.title}</button>
    )
}
