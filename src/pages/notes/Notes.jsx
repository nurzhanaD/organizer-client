import React, { useState, useEffect } from 'react';
import { Note } from '../../components/note/Note';
import { SearchBar } from '../../components/search-bar/SearchBar.jsx';
import { AddNoteCard } from '../../components/add-note-card/AddNoteCard.jsx';

import { NavBar } from '../../components/nav/NavBar';

import './Notes.css';
import axios from 'axios';

export default function Notes() {
    const [userNotes, setUserNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    function getUserId() {
        return localStorage.getItem('lastSignedInUser');
    }

    useEffect(() => {
        let notes = [];
        axios.get(`https://organizer-server-app.onrender.com/api/getUsers/${getUserId()}`)
        .then((res) => {
            const getNotes = async () => {
                for (let i = 0; i < res.data.notes.length; i++) {
                    await axios.get(`https://organizer-server-app.onrender.com/api/getNotes/${res.data.notes[i]}`)
                    .then((res) => {
                        notes.push(res.data);
                        setUserNotes(notes.map((note, index) => {
                            return <Note
                            key={index}
                            noteContent={note.note_content}
                            date={note._date}
                            id={note.note_id}
                            />
                        }));
                    });
                }
            }
            getNotes();
        });
    }, []);

    function search(query) {
        let notes = [];
        axios.get(`https://organizer-server-app.onrender.com/api/getUsers/${getUserId()}`)
        .then((res) => {
            const getNotes = async () => {
                for (let i = 0; i < res.data.notes.length; i++) {
                    await axios.get(`https://organizer-server-app.onrender.com/api/getNotes/${res.data.notes[i]}`)//eslint-disable-next-line 
                    .then((res) => {
                        notes.push(res.data);
                    });
                }
                notes = notes.filter((note) => {
                    return note.note_content.toLowerCase().includes(query.toLowerCase());
                });
                setUserNotes(notes.map((note, index) => {
                    return <Note
                    key={index}
                    noteContent={note.note_content}
                    date={note._date}
                    id={note.note_id}
                    />
                }));
            }
            getNotes();
        });
    }

    return (
        <div>
            <NavBar/>
            <div className="notes">
                <div className="notes__title">Заметки</div>
                <SearchBar change={(e) => setSearchQuery(e.target.value)} btnClick={() => search(searchQuery)}/>
                <div className="notes__add-note-all-notes-grid">
                    <AddNoteCard/>
                    {userNotes}
                </div>
            </div>
        </div>
    )
}