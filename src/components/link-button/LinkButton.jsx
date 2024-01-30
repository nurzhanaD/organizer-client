import React from 'react';
import './LinkButton.css';

export function LinkButton(props) {
    return (
        <button type='button' className={`link-btn ${props.classStyle}`} onClick={props.click} 
            style={
                {
                    color : props.textColor
                }
            }>
            <span className='link-btn__title'>{props.title}</span>
        </button>
    )
}
