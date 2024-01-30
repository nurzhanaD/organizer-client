import React, {useState, useRef} from 'react';
import axios from 'axios';
import * as dayjs from 'dayjs';

import { LinkButton } from '../link-button/LinkButton';

import './AddNoteCard.css';

export function AddNoteCard() {
    const addNoteCardRef = useRef(null);
    const [noteContent, setNoteContent] = useState('');
    const [userNotes, setUserNotes] = useState([]);
    const [counter, setCounter] = useState(0);

    function getUserId() {
        return localStorage.getItem('lastSignedInUser');
    }

    axios.get(`https://organizer-server-app.onrender.com/api/getUsers/${getUserId()}`)
    .then((res) => {
        setUserNotes(res.data.notes);
    });

    function addNote() {
        const addNoteServer = async () => 
        await axios.post(`https://organizer-server-app.onrender.com/api/addNote`,
            {
                "note_content": noteContent,
                "_date": dayjs().format('DD/MM/YYYY'),
                "user_id": getUserId()
            }
        )
        .then((res) => {
            userNotes.push(res.data[0].note_id);
            const addToUserNotes = async () => {
                await axios.put(`https://organizer-server-app.onrender.com/api/updateUser/${getUserId()}`,
                    {
                        "notes" : userNotes
                    }
                )
                .then((res) => {
                    window.location.reload();
                })
            };
            addToUserNotes();
        });
        addNoteServer();
    }

    function countCharacters(e) {
        setCounter(e.target.value.length);
        setNoteContent(e.target.value);
    }

    function focusAddNoteCard() {
        addNoteCardRef.current.style.boxShadow = '1px 8px 5px #81a3c5';
        addNoteCardRef.current.style.transitionProperty = 'box-shadow';
        addNoteCardRef.current.style.transitionDuration = '0.5s';
    }

    function unFocusAddNoteCard() {
        addNoteCardRef.current.style.boxShadow = 'none';
    }

    return (
        <div className="add-note-card" ref={addNoteCardRef}>
            <textarea className="add-note-card__content" onFocus={() => focusAddNoteCard()} onBlur={() => unFocusAddNoteCard()} placeholder="Содержимое заметки..." maxLength="500" value={noteContent} onChange={(e) => countCharacters(e)}></textarea>
            <div className="add-note-card__counter-btn-wrapper">
                <div className="add-note-card__counter">{counter}/500</div>
                <LinkButton title="Добавить" click={() => addNote()}/>
            </div>
        </div>
    )
}
