import React, { useState } from 'react';
import axios from 'axios';

import { LinkButton } from '../link-button/LinkButton';

import './Goal.css';

export function Goal(props) {
    const [showMoreGoalInfoStatus, setShowMoreGoalInfoStatus] = useState(false);

    function getUserId() {
        return localStorage.getItem('lastSignedInUser');
    }

    function showMoreGoalInfo() {
        setShowMoreGoalInfoStatus(!showMoreGoalInfoStatus);
    }

    function deleteGoal(goal_id) {
        const deleteFromUserGoals = async () => 
        await axios.get(`https://organizer-server-app.onrender.com/api/getUsers/${getUserId()}`)
        .then((res) => {
            let temp = res.data.goals;
            let userGoals = temp.filter((goal) => {
                return goal !== goal_id
            });
            const deleteGoalServer = async () => 
            await axios.put(`https://organizer-server-app.onrender.com/api/updateUser/${getUserId()}`,
                {
                    "goals" : userGoals
                }
            ).then((res) => {
                console.log(res);
                axios.delete(`https://organizer-server-app.onrender.com/api/deleteGoal/${goal_id}`)
                .then((res) => {
                    console.log(res.data);
                    window.location.reload();
                });
            });
            deleteGoalServer()
        });
        deleteFromUserGoals();
    }

    return (
        <div className="goal">
            <div className="goal__info-wrapper">
                <div className="goal__title">{props.title}</div>
                <div className="goal__date-btn-wrapper">
                    <div className="goal__date">
                        {props.date}
                    </div>
                    <button className="goal__btn" onClick={() => showMoreGoalInfo()}>
                        <img src="https://cdn-icons-png.flaticon.com/512/57/57055.png" alt="https://cdn-icons-png.flaticon.com/512/57/57055.png" style={showMoreGoalInfoStatus ? {transform:'scaleY(-1)'} : {}}/>
                    </button>
                </div>
            </div>
            { showMoreGoalInfoStatus ?

            <div className="goal__more-info-wrapper">
                <div className="goal__q-a q-a-why">
                    <div className="q q-why">Почему я хочу добиться этой цели?</div>
                    <div className="a why">{props.why === '' ? <span className='no-a'>Не заполнено.</span> : props.why}</div>
                </div>
                <div className="goal__q-a q-a-how">
                    <div className="q q-how">Как я буду себя чувствовать, когда добьюсь этой цели?</div>
                    <div className="a how">{props.how === '' ? <span className='no-a'>Не заполнено.</span> : props.how}</div>
                </div>
                <div className="goal__q-a q-a-when">
                    <div className="q q-when">Когда я пойму, что цель достигнута?</div>
                    <div className="a when">{props.when === '' ? <span className='no-a'>Не заполнено.</span> : props.when}</div>
                </div>
                <div className="goal__q-a q-a-comment">
                    <div className="q q-comment">Примечание</div>
                    <div className="a comment">{props.comment === '' ? <span className='no-a'>Не заполнено.</span> : props.comment}</div>
                </div>
                <div className="goal-more-info-wrapper__buttons">
                    <LinkButton title="Удалить цель" click={() => deleteGoal(props.id)}/>
                    <LinkButton title="Изменить цель" click={props.updateGoalClick}/>
                </div>
            </div>

            : 
                null
            }
        </div>
    )
}
