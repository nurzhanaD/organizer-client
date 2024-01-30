import React from 'react';
import axios from 'axios';

import { LinkButton } from '../link-button/LinkButton.jsx';

import './ToDo.css';

export function ToDo(props) {

    function getUserId() {
        return localStorage.getItem('lastSignedInUser');
    }

    function updateCompletedStatus(id, status) {
        axios.put(`https://organizer-server-app.onrender.com/api/updateToDo/${id}`,
            {
                "is_completed": !status
            }
        )
        .then((res) => {
            console.log(res.data);
            window.location.reload();
        })
    }

    function deleteToDo(id) {
        const deleteFromUserToDos = async () => {
            await axios.get(`https://organizer-server-app.onrender.com/api/getUsers/${getUserId()}`)
            .then((res) => {
                let temp = res.data.to_do_s;
                let userToDos = temp.filter((to_do) => {
                    return to_do !== id;
                });
                const deleteToDoServer = async () => {
                await axios.put(`https://organizer-server-app.onrender.com/api/updateUser/${getUserId()}`,
                    {
                        "to_do_s": userToDos
                    })
                .then((res) => {
                    console.log(res);
                    axios.delete(`https://organizer-server-app.onrender.com/api/deleteToDo/${id}`)
                    .then((res) => {
                        console.log(res.data);
                        window.location.reload();
                    })
                });
                }
                deleteToDoServer();
            });
        }
        deleteFromUserToDos();
    }

    return (
        <div className={`to-do ${props.is_completed_status ? "to-do__completed" : ""}`}>
            <div className={props.is_completed_status ? 'to-do__content to-do-completed__content' : 'to-do__content'}>{props.is_completed_status ? <strike>{props.index}. {props.to_do_content}</strike> : <span>{props.index}. {props.to_do_content}</span>}</div>
            <div className="to-do__btns">
                <LinkButton title='Удалить' click={() => deleteToDo(props.id)}/>
                <button className="to-do-btn__done" onClick={() => updateCompletedStatus(props.id, props.is_completed_status)}>
                    <div className='to-do-btn-done__icon-wrapper'>
                        {props.is_completed_status ? 
                        <img className='to-do-btn-done__icon' src="https://cdn-icons-png.flaticon.com/512/2732/2732655.png" alt="https://cdn-icons-png.flaticon.com/512/2732/2732655.png" />
                            :
                        <div></div>
                        }
                    </div>
                </button>
            </div>
        </div>
    )
}
