import React, {useState, useEffect} from 'react';
import axios from 'axios';

import { Button } from '../button/Button';
import { Input } from '../input/Input';

import './UpdateGoalForm.css';

export function UpdateGoalForm(props) {

    const [which, setWhich] = useState('');
    const [why, setWhy] = useState('');
    const [how, setHow] = useState('');
    const [when, setWhen] = useState('');
    const [type, setType] = useState('');
    const [comment, setComment] = useState('');

    useEffect(() => {
        axios.get(`https://organizer-server-app.onrender.com/api/getGoals/${props.id}`)
        .then((res) =>{
            setWhich(res.data.which);
            setWhy(res.data.why);
            setHow(res.data.how);
            setWhen(res.data._when);
            setType(res.data._type);
            setComment(res.data.comment);
        });
    }, [props.id])

    function updateGoalWhich() {
        const updateGoalServer = async () => 
        await axios.put(`https://organizer-server-app.onrender.com/api/updateGoal/${props.id}`,
        {
            "which": which,
            "why": why,
            "how": how,
            "_when": when,
            "_type": type,
            "comment": comment,
        }
        ).then((res) => {
            console.log(res);
            window.location.reload();
        });
        updateGoalServer();
    }

    return (
        <div className='add-goals'>
            <div className="add-goals__title">Изменить цель</div>
            <form className="add-goals__form">
                <div className="add-goals-form__items-wrapper">
                    <div className="add-goals-form__item">
                        <label className='add-goals-item__label'>Какая у меня цель?</label>
                        <Input classStyle='input-sign input-big' type='text' value={which} change={(e) => setWhich(e.target.value)}/>
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
                        <label className='add-goals-item__label'>Примечание</label>
                        <textarea className='add-goals-item__textarea input-secondary' value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                    </div>
                </div>
            </form>
            <div className="add-goals__buttons">
                <Button title='Отменить' classStyle="btn-tertiary" click={() => window.location.reload()}/>
                <Button title='Сохранить изменения' classStyle="btn-tertiary" click={() => updateGoalWhich()}/>
            </div>
        </div>
    )
}
