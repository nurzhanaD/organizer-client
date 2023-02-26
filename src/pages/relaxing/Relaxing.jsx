import React from 'react';

import { NavBar } from '../../components/nav/NavBar';
import { Button } from '../../components/button/Button.jsx';

import './Relaxing.css';

export default function Relaxing() {
    
    return (
        <div>
            <NavBar/>
            <div className="relaxing">
                <div className="relaxing__title">Дыхание</div>
                <div className="relaxing__guide-wrapper">
                    <div className="relaxing__guide">
                        <img className="relaxing-guide__icon" src="https://cdn-icons-png.flaticon.com/512/2438/2438018.png" alt="https://cdn-icons-png.flaticon.com/512/2438/2438018.png" />
                    </div>
                </div>
                <Button title='НАЧАТЬ' classStyle='btn-small btn-secondary'/>
            </div>
        </div>
    )
}