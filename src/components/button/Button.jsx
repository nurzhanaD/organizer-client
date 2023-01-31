import React from 'react';
import './Button.css';

export function Button(props) {
    return (
        <button 
            type="button" 
            className={`${props.btnStyle}`}
            onClick={props.btnClick}
        >{props.btnTitle}</button>
    )
}
