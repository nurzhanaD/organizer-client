import React, { useState } from 'react';
import axios from 'axios';

import { NavBar } from '../../components/nav/NavBar.jsx';
import { Button } from '../../components/button/Button.jsx';
import { LinkButton } from '../../components/link-button/LinkButton.jsx';

import './MyGoals.css';

export default function MyGoals() {
    const [activeShortGoal, setActiveShortGoal] = useState(true);
    const [activeLongGoal, setActiveLongGoal] = useState(false);
    const [showAddNewGoalFormStatus, setShowAddNewGoalFormStatus] = useState(false);

    // function getUserId() {
    //     return localStorage.getItem('lastSignedInUser');
    // }

    function toggleMyGoals() {
        if(activeShortGoal === false) {
            showShortGoals();
        }
        setActiveShortGoal(!activeShortGoal);
        setActiveLongGoal(!activeLongGoal);
    }

    function showShortGoals() {
        axios.get()
    }

    // function showLongGoals() {
        
    // }

    function toggleAddNewGoal() {
        setShowAddNewGoalFormStatus(!showAddNewGoalFormStatus);
    }

    return (
        <div>
            <NavBar/>
            {
                showAddNewGoalFormStatus ?
                    <div className="add-goals">
                        <div className="add-goals__title">
                            Добавить новую цель
                        </div>
                        <form className="add-goals__form">
                            
                        </form>
                    </div>
                :
                    <div className="my-goals">
                        <div className="my-goals__title">
                            Мои цели
                        </div>
                    <div className="my-goals__wrapper">
                        <div className="my-goals__buttons">
                            <Button classStyle={activeShortGoal ? 'my-goals__btn-active btn-tertiary' : 'my-goals__btn btn-tertiary'} click={() => toggleMyGoals()} title='Краткосрочные'/>
                            <Button classStyle={activeLongGoal ? 'my-goals__btn-active btn-tertiary' : 'my-goals__btn btn-tertiary'} click={() => toggleMyGoals()} title='Долгосрочные'/>
                        </div>
                        <div className="my-goals__box">
                            <LinkButton title='Добавить новую цель' textColor='#fff' classStyle='my-goals__link-btn link-btn-secondary' click={() => toggleAddNewGoal()} />
                        </div>
                    </div>
                    </div>
            }
        </div>
  )
}
