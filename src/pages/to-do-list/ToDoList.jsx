import React from 'react';

import { NavBar } from '../../components/nav/NavBar';

import './ToDoList.css';

export default function ToDoList() {
    return (
        <div>
            <NavBar/>
            <div className="to-do-list">
                To do list
            </div>
        </div>
    )
}
