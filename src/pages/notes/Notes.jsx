import React from 'react';

import { NavBar } from '../../components/nav/NavBar';

import './Notes.css';

export function Notes() {
    return (
        <div>
            <NavBar/>
            <div className="notes">
                Notes
            </div>
        </div>
    )
}