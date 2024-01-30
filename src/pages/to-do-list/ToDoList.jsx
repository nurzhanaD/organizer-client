import React, {useEffect, useState} from 'react';
import axios from 'axios';
import * as dayjs from 'dayjs';

import { NavBar } from '../../components/nav/NavBar';
import { AddToDoForm } from '../../components/add-to-do-form/AddToDoForm.jsx';
import { ToDo } from '../../components/to-do/ToDo';

import './ToDoList.css';

export default function ToDoList() {
    const [userToDosList, setUserToDosList] = useState();

    function getUserId() {
        return localStorage.getItem('lastSignedInUser');
    }

    useEffect(() => {
        let temp = [];
        axios.get(`https://organizer-server-app.onrender.com/api/getUsers/${getUserId()}`)
        .then((res) => {
            const getToDo = async () => {
                for (let i = 0; i < res.data.to_do_s.length; i++) {
                    await axios.get(`https://organizer-server-app.onrender.com/api/getToDos/${res.data.to_do_s[i]}`)
                    .then((res) => {
                        temp.push(res.data);
                    })
                }
                setUserToDosList(temp.filter((to_do) => {
                    return to_do._date === dayjs().format('DD/MM/YYYY');
                }));
            }
            getToDo();
        });
    })
    

    return (
        <div>
            <NavBar/>
            <div className="to-do-list">
                <div className="to-do-list__title">Список дел</div>
                <AddToDoForm />
                <div className="to-do-s">
                    <div className="to-do-s__list">
                        {
                            userToDosList === undefined ?
                            <div className="no-to-do-s">Задачи загружаются...</div>
                            :
                            userToDosList === null ? 
                            <div className="no-to-do-s">На сегодня задач нет.</div>
                            :
                            userToDosList.length === 0 ?
                            <div className="no-to-do-s">На сегодня задач нет.</div>
                            :
                            userToDosList.map((el, index) => {
                                return <ToDo
                                key={el.to_do_id}
                                to_do_content={el.to_do_content}
                                id={el.to_do_id}
                                is_completed_status={el.is_completed}
                                index={index + 1}
                                />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
