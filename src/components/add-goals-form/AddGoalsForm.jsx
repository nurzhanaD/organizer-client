import React, { useState } from 'react';
import axios from 'axios'
import * as dayjs from 'dayjs';

import { Input } from '../input/Input';
import { Button } from '../button/Button';

import './AddGoalsForm.css';

export function AddGoalsForm() {

    const [which, setWhich] = useState('');
    const [why, setWhy] = useState('');
    const [how, setHow] = useState('');
    const [when, setWhen] = useState('');
    const [type, setType] = useState('short');
    const [comment, setComment] = useState('');

    const [userGoals, setUserGoals] = useState([]);

    function getUserId() {
        return localStorage.getItem('lastSignedInUser');
    }

    axios.get(`https://organizer-server-app.onrender.com/api/getUsers/${getUserId()}`)
    .then((res) => {
        setUserGoals(res.data.goals);
    })

    function addGoal() {
        const addGoalServer = async () => 
        await axios.post(`https://organizer-server-app.onrender.com/api/addGoal`, {
            "which": which,
            "why": why,
            "how": how,
            "_when": when,
            "_type": type,
            "comment": comment,
            "_date": dayjs().format('DD/MM/YYYY'),
            "user_id": getUserId()
        })
        .then((res) => {
            userGoals.push(res.data[0].goal_id);
            const addToUserGoals = async () => 
            await axios.put(`https://organizer-server-app.onrender.com/api/updateUser/${getUserId()}`,{
                "goals": userGoals
            })
            .then((res) => {
                setWhich('');
                setWhy('');
                setHow('');
                setWhen('');
                setComment('');
                window.location.reload();
            });
            addToUserGoals();
        });
        addGoalServer();
    }

    return (
        <div className='add-goals'>
            <div className="add-goals__title">Добавить новую цель</div>
            <form className="add-goals__form">
                <div className="add-goals-form__items-wrapper">
                    <div className="add-goals-form__item">
                        <label className='add-goals-item__label'>Какая у меня цель?</label>
                        <Input classStyle='input-sign input-big' type='text' value={which} change={(e) => setWhich(e.target.value)} />
                    </div>
                    <div className="add-goals-form__item">
                        <label className='add-goals-item__label'>Почему я хочу добиться этой цели?</label>
                        <Input classStyle='input-sign input-big' type='text' value={why} change={(e) => setWhy(e.target.value)}/>
                    </div>
                    <div className="add-goals-form__item">
                        <label className='add-goals-item__label'>Как я буду себя чувствовать, когда добьюсь этой цели?</label>
                        <Input classStyle='input-sign input-big' type='text' value={how} change={(e) => setHow(e.target.value)}/>
                    </div>
                    <div className="add-goals-form__item">
                        <label className='add-goals-item__label'>Когда я пойму, что цель достигнута?</label>
                        <Input classStyle='input-sign input-big' type='text' value={when} change={(e) => setWhen(e.target.value)}/>
                    </div>
                </div>
                <div className="add-goals-form__items-wrapper">
                    <div className="add-goals-form__item">
                        <label className='add-goals-item__label'>Тип срочности цели.</label>
                        <select className='add-goals-item__select' value={type} onChange={(e) => setType(e.target.value)}>
                            <option className='add-goals-item__option' value="short">Краткосрочная</option>
                            <option className='add-goals-item__option' value="long">Долгосрочная</option>
                        </select>
                    </div>
                    <div className="add-goals-form__item">
                        <label className='add-goals-item__label' id='add-goals-form__textarea-label'>Примечание</label>
                        <textarea className='add-goals-item__textarea input-dark-bg' value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                    </div>
                </div>
            </form>
            <div className="add-goals__buttons">
                <Button title='Отменить' classStyle="btn-light-bg" click={() => window.location.reload()}/>
                <Button title='Добавить' classStyle="btn-light-bg" click={() => addGoal()}/>
            </div>
        </div>
    ) 
}
