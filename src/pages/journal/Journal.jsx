import React from 'react';

import { NavBar } from '../../components/nav/NavBar';

import './Journal.css';

export default function Journal() {
    return (
        <div>
            <NavBar/>
            <div className="journal">
                Journal
            </div>
        </div>
    )
}