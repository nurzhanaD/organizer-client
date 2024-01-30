import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { NavBar } from '../../components/nav/NavBar.jsx';
import { Button } from '../../components/button/Button.jsx';
import { LinkButton } from '../../components/link-button/LinkButton.jsx';
import { AddGoalsForm } from '../../components/add-goals-form/AddGoalsForm.jsx';
import { UpdateGoalForm } from '../../components/update-goal-form/UpdateGoalForm.jsx';
import { Goal } from '../../components/goal/Goal.jsx';

import './MyGoals.css';

export default function MyGoals() {
    const [activeShortGoal, setActiveShortGoal] = useState(true);
    const [activeLongGoal, setActiveLongGoal] = useState(false);
    const [showAddNewGoalFormStatus, setShowAddNewGoalFormStatus] = useState(false);
    const [showUpdateGoalFormStatus, setShowUpdateGoalFormStatus] = useState(false);

    const [shortGoalsList, setShortGoalsList] = useState();
    const [longGoalsList, setLongGoalsList] = useState([]);

    const [goalId, setGoalId] = useState();

    function getUserId() {
        return localStorage.getItem('lastSignedInUser');
    }    

    function toggleGoals(statusShort, statusLong) {
        setActiveShortGoal(statusShort);
        setActiveLongGoal(statusLong);
    }

    function toggleAddNewGoal(status) {
        setShowAddNewGoalFormStatus(status);
    }

    function toggleUpdateGoal(status, id) {
        setShowUpdateGoalFormStatus(status);
        setGoalId(id);
    }

    useEffect(() => {
        let shortGoals = [];
        let longGoals = [];
            axios.get(`https://organizer-server-app.onrender.com/api/getUsers/${getUserId()}`)
            .then((res) => { 
            if (activeShortGoal === true) {
                const getShortGoal = async () => {
                    for(let i = 0; i < res.data.goals.length; i++) {
                        await axios.get(`https://organizer-server-app.onrender.com/api/getGoals/${res.data.goals[i]}`)
                        .then((res) => {
                            if(res.data._type === "short") {
                                shortGoals.push(res.data);
                                setShortGoalsList(shortGoals.map((goal, index) => {
                                    return <Goal key={index} 
                                    title={goal.which}
                                    why={goal.why}
                                    how={goal.how}
                                    when={goal._when}
                                    comment={goal.comment}
                                    date={goal._date}
                                    updateGoalClick={() => toggleUpdateGoal(!showUpdateGoalFormStatus, goal.goal_id)}
                                    id={goal.goal_id}
                                    />
                                }))
                            }
                        })
                    }
                }
                getShortGoal();
            }
    
            if (activeLongGoal === true) {
                const getLongGoal = async () => {
                    for(let i = 0; i < res.data.goals.length; i++) {
                        await axios.get(`https://organizer-server-app.onrender.com/api/getGoals/${res.data.goals[i]}`)
                        .then((res) => {
                            if (res.data._type === "long") {
                                longGoals.push(res.data);
                                setLongGoalsList(longGoals.map((goal, index) => {
                                    return <Goal key={index} 
                                    title={goal.which}
                                    why={goal.why}
                                    how={goal.how}
                                    when={goal._when}
                                    comment={goal.comment}
                                    date={goal._date}
                                    updateGoalClick={() => toggleUpdateGoal(!showUpdateGoalFormStatus, goal.goal_id)}
                                    id={goal.goal_id}
                                    />
                                }))
                            }
                        })
                    }
                }
                getLongGoal();
            }
        })
    }, [activeShortGoal, activeLongGoal, showUpdateGoalFormStatus]);

    return (
        <div>
            <NavBar/>
            {
                showAddNewGoalFormStatus ?
                    <AddGoalsForm />
                :
                showUpdateGoalFormStatus ?
                    <UpdateGoalForm id={goalId}/>
                :
                <div className="my-goals">
                    <div className="my-goals__title">Мои цели</div>
                    <div className="my-goals__wrapper">
                        <div className="my-goals__buttons">
                            <Button classStyle={activeShortGoal ? 'my-goals__btn-active btn-tertiary' : 'my-goals__btn btn-tertiary'} click={() => toggleGoals(!activeShortGoal, !activeLongGoal)} title='Краткосрочные'/>
                            <Button classStyle={activeLongGoal ? 'my-goals__btn-active btn-tertiary' : 'my-goals__btn btn-tertiary'} click={() => toggleGoals(!activeShortGoal ,!activeLongGoal)} title='Долгосрочные'/>
                        </div>
                        <div className="my-goals__box">
                            <LinkButton title='Добавить новую цель' textColor='#fff' classStyle='my-goals__link-btn link-btn-secondary' click={() => toggleAddNewGoal(!showAddNewGoalFormStatus)} />
                            {
                                activeShortGoal ? 
                                    <div className='short-goals-list'>
                                        {shortGoalsList}
                                    </div>
                                : 
                                activeLongGoal 
                                ?   
                                    <div className='long-goals-list'>
                                        {longGoalsList}
                                    </div>
                                : 
                                'nothing'
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
  )
}
