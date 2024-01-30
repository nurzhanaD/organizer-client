import React, { useState, useEffect } from 'react';
import * as dayjs from 'dayjs';
import axios from 'axios';

import { NavBar } from '../../components/nav/NavBar';
import { Input } from '../../components/input/Input.jsx';
import { Button } from '../../components/button/Button.jsx';

import './Journal.css';

export default function Journal() {
    const [q1, setQ1] = useState('');
    const [q2, setQ2] = useState('');
    const [q3, setQ3] = useState('');
    const [q4, setQ4] = useState('');
    const [q5, setQ5] = useState('yes');
    const [my_day, setMyDay] = useState('');
    const [userJournal, setUserJournal] = useState([]);
    const [todayJournalId, setTodayJournalId] = useState('');

    const [status, setStatus] = useState(false);

    const [newQ1, setNewQ1] = useState('');
    const [newQ2, setNewQ2] = useState('');
    const [newQ3, setNewQ3] = useState('');
    const [newQ4, setNewQ4] = useState('');
    const [newQ5, setNewQ5] = useState('');
    const [newMyDay, setNewMyDay] = useState('');

    function getUserId() {
        return localStorage.getItem('lastSignedInUser');
    }

    function saveJournal() {
        const addJournalToServer = async () => {
            await axios.post(`https://organizer-server-app.onrender.com/api/addJournal`,{
                "q1": q1,
                "q2": q2,
                "q3": q3,
                "q4": q4,
                "q5": q5,
                "my_day": my_day,
                "_date": dayjs().format('DD/MM/YYYY'),
                "user_id": getUserId()
            }).then((res) => {
                userJournal.push(res.data[0].journal_id);
                const addJournalToUser = async () => {
                    await axios.put(`https://organizer-server-app.onrender.com/api/updateUser/${getUserId()}`, {
                        "journal": userJournal
                    })
                    .then((res) => {
                        console.log(res.data);
                        window.location.reload();
                    })
                }
                addJournalToUser();
            })
        }
        addJournalToServer();
    }

    function deleteJournal() {
        const deleteJournalServer = async () => {
            await axios.delete(`https://organizer-server-app.onrender.com/api/deleteJournal/${todayJournalId}`)
            .then((res) => {
                const deleteJournalUser = async () => {
                    await axios.put(`https://organizer-server-app.onrender.com/api/updateUser/${getUserId()}`,{
                        "journal" : userJournal.filter((el) => {
                            return el !== todayJournalId
                        })
                    })
                    .then((res) => {
                        console.log(res.data);
                        window.location.reload();
                    })
                }
                deleteJournalUser();
            })
        }
        deleteJournalServer();
    }

    useEffect(() => {
        let temp = [];
        const getJournalPage = async () => {
            await axios.get(`https://organizer-server-app.onrender.com/api/getUsers/${getUserId()}`)
            .then((res) => {
                setUserJournal(res.data.journal);
                for(let i = 0; i < res.data.journal.length; i++) {
                    axios.get(`https://organizer-server-app.onrender.com/api/getJournal/${res.data.journal[i]}`)
                    .then((res) => {
                        if (res.data._date === dayjs().format('DD/MM/YYYY')) {
                            temp.push(res.data);
                            if (temp.length === 1) {
                                let todayJournal = res.data;
                                setQ1(todayJournal.q1);
                                setQ2(todayJournal.q2);
                                setQ3(todayJournal.q3);
                                setQ4(todayJournal.q4);
                                setQ5(todayJournal.q5);
                                setMyDay(todayJournal.my_day);
                                setStatus(true);
                                setTodayJournalId(todayJournal.journal_id)
                            } else {
                                setStatus(false);
                            }
                        }
                    });
                }
            })
        }
        getJournalPage();
        setNewQ1(q1);
        setNewQ2(q2);
        setNewQ3(q3);
        setNewQ4(q4);
        setNewQ5(q5);
        setNewMyDay(my_day);
    }, [q1, q2, q3, q4, q5, my_day]);

    function updateJournal() {
        axios.put(`https://organizer-server-app.onrender.com/api/updateJournal/${todayJournalId}`, {
            "q1": newQ1,
            "q2": newQ2,
            "q3": newQ3,
            "q4": newQ4,
            "q5": newQ5,
            "my_day": newMyDay
        })
        .then((res) => {
            console.log(res);
            window.location.reload();
        })
    }

    return (
        <div>
            <NavBar/>
            <div className="journal">
                <div className="journal__title">Дневник</div>
                <form className="journal__form">
                    <div className="journal-form__wrapper">
                        <div className="journal-form__item">
                            <div className="journal-form-item__q">Что меня радует?</div>
                            <Input classStyle="journal-form-item__a input-light-bg input-journal" value={status ? newQ1 : q1} change={status ? (e) => setNewQ1(e.target.value) : (e) => setQ1(e.target.value)} placeholder={status ? 'Не заполнено...' : 'Заполнить...'}/>
                        </div>
                        <div className="journal-form__item">
                            <div className="journal-form-item__q">Что меня расстраивает?</div>
                            <Input classStyle="journal-form-item__a input-light-bg input-journal" value={status ? newQ2 : q2} change={status ? (e) => setNewQ2(e.target.value) : (e) => setQ2(e.target.value)} placeholder={status ? 'Не заполнено...' : 'Заполнить...'}/>
                        </div>
                        <div className="journal-form__item">
                            <div className="journal-form-item__q">Мои сильные стороны.</div>
                            <Input classStyle="journal-form-item__a input-light-bg input-journal" value={status ? newQ3 : q3} change={status ? (e) => setNewQ3(e.target.value) : (e) => setQ3(e.target.value)} placeholder={status ? 'Не заполнено...' : 'Заполнить...'}/>
                        </div>
                        <div className="journal-form__item">
                            <div className="journal-form-item__q">Мои слабые стороны.</div>
                            <Input classStyle="journal-form-item__a input-light-bg input-journal" value={status ? newQ4 : q4} change={status ? (e) => setNewQ4(e.target.value) : (e) => setQ4(e.target.value)} placeholder={status ? 'Не заполнено...' : 'Заполнить...'}/>
                        </div>
                        <div className="journal-form__item">
                            <div className="journal-form-item__q">Доволен / довольна ли я, тем как был проведён день сегодня? </div>
                            <select className='journal-form-item__select input-light-bg' value={status ? newQ5 : q5} onChange={status ? (e) => setNewQ5(e.target.value) : (e) => setQ5(e.target.value)}>
                                <option value="yes">Да</option>
                                <option value="no">Нет</option>
                            </select>
                        </div>
                    </div>
                    <div className="journal-form__wrapper">
                        <div className="journal-form__item-sec">
                            <div className="journal-form-item__q">Опиши свой день.</div>
                            <div className="journal-form-item-sec__wrapper">
                                <textarea className='journal-form-item__textarea input-light-bg' value={status ? newMyDay : my_day} onChange={status ? (e) => setNewMyDay(e.target.value) : (e) => setMyDay(e.target.value)} placeholder={status ? 'Не заполнено...' : 'Заполнить...'}></textarea>
                                <div>
                                    { status ? 
                                        <div className="journal__btns">
                                            <Button title="Удалить все данные" classStyle='btn-light-bg' click={() => deleteJournal()}/>
                                            <Button title="Изменить" classStyle='btn-light-bg' click={() => updateJournal()}/>
                                        </div> 
                                    :
                                        <Button title="Сохранить" classStyle='btn-journal btn-light-bg' click={() => saveJournal()}/>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="journal__date">&#40;{dayjs().format('DD/MM/YYYY')}&#41;</div>
            </div>
        </div>
    )
}