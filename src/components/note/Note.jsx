import React from 'react';
import axios from 'axios';
import { LinkButton } from '../link-button/LinkButton.jsx';

import './Note.css';

export function Note(props) {
    function getUserId() {
        return localStorage.getItem('lastSignedInUser');
    }

    function deleteNote(id) {
        const deleteFromUserNotes = async () => {
            await axios.get(`https://organizer-server-app.onrender.com/api/getUsers/${getUserId()}`)
            .then((res) => {
                let temp = res.data.notes;
                let userNotes = temp.filter((note) => {
                    return note !== id
                });
                console.log(userNotes);
                const deleteNoteServer = async () => 
                await axios.put(`https://organizer-server-app.onrender.com/api/updateUser/${getUserId()}`,
                    {
                        "notes": userNotes
                    }
                )
                .then((res) => {
                    axios.delete(`https://organizer-server-app.onrender.com/api/deleteNote/${id}`)
                    .then((res) => {
                        window.location.reload();
                    });
                });
                deleteNoteServer();
            });
        }
        deleteFromUserNotes();
    }

    return (
        <div className="note">
            <div className="note__content">{props.noteContent}</div>
            <div className="note__date-btn-wrapper">
                <div className="note__date">{props.date}</div>
                <LinkButton title="Удалить" click={() => deleteNote(props.id)}/>
            </div>
        </div>
    )
}
