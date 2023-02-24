import React from 'react';
import './LinkButton.css';

export function LinkButton(props) {
    return (
        <button className="link-btn" onClick={props.click} style={{color : props.textColor}}>
            {props.title}
        </button>
    )
}
