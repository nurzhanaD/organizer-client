import React, {useEffect, useState} from 'react';
import axios from 'axios';
import * as dayjs from 'dayjs';

import { Input } from '../input/Input.jsx';
import { Button } from '../button/Button.jsx';

import './AddToDoForm.css';

export function AddToDoForm() {
    const [to_do_content, setToDoContent] = useState('');
    const [userToDos, setUserToDos] = useState([]);

    function getUserId() {
        return localStorage.getItem('lastSignedInUser');
    }

    function getToDos() {
        axios.get(`https://organizer-server-app.onrender.com/api/getUsers/${getUserId()}`)
        .then((res) => {
            setUserToDos(res.data.to_do_s);
        });
    }

    function addToDo() {
        const addToDoServer = async () => {
            await axios.post(`https://organizer-server-app.onrender.com/api/addToDo`,{
                "to_do_content": to_do_content,
                "is_completed": false,
                "_date": dayjs().format('DD/MM/YYYY'),
                "user_id": getUserId()
            })
            .then((res) => {
                userToDos.push(res.data[0].to_do_id);
                const addToDoUser = async () => {
                    await axios.put(`https://organizer-server-app.onrender.com/api/updateUser/${getUserId()}`,
                        {
                            "to_do_s" : userToDos
                        }
                    )
                    .then((res) => {
                        console.log(res.data);
                        window.location.reload();
                    })
                }
                addToDoUser();
            })
        }
        addToDoServer();
    }

    useEffect(() => {
        getToDos();
    })

    return (
        <div className="add-to-do__form">
            <div className="add-to-to-form__title">
                Задачи на сегодня &#40;{dayjs().format('DD.MM.YY')}&#41; :
            </div>
            <div className="add-to-do__wrapper">
                <Input 
                    type='text' 
                    classStyle='input-to-do input-dark-bg' 
                    placeholder="Новая задача на сегодня..." 
                    value={to_do_content}
                    change={(e) => setToDoContent(e.target.value)}
                />
                <Button title='Добавить' classStyle='btn-dark-bg btn-small' click={() => addToDo()}/>
            </div>
        </div>
    )
}
