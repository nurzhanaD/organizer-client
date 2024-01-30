import React, {useState} from 'react';
import axios from 'axios';
import { NavBar } from '../../components/nav/NavBar';
import { PickDateForm } from '../../components/pick-date-form/PickDateForm.jsx';
import { HistoryGoalsList } from '../../components/history-goals-list/HistoryGoalsList.jsx';
import { HistoryToDosList } from '../../components/history-to-do-s-list/HistoryToDosList.jsx';
import { HistoryJournalList } from '../../components/history-journal-list/HistoryJournalList.jsx';
import { HistoryNotesList } from '../../components/history-notes-list/HistoryNotesList.jsx';
import './History.css';

export default function History() {
    const [goalsList, setGoalsList] = useState([]);
    const [toDosDoneList, setToDosDoneList] = useState([]);
    const [toDosNotDoneList, setToDosNotDoneList] = useState([]);
    const [notesList, setNotesList] = useState([]);
    const [journalList, setJournalList] = useState([]);

    function getUserId() {
        return localStorage.getItem('lastSignedInUser');
    }

    function getDateValue(val) {
        setGoalsList([]);
        setToDosDoneList([]);
        setToDosNotDoneList([]);
        setJournalList([]);
        setNotesList([]);
        let info = null;
        let tempGoalsList = [];
        let tempToDosDoneList = [];
        let tempToDosNotDoneList = [];
        let tempJournalList = [];
        let tempNotesList = [];
        const getInfo = async () => {
            await axios.get(`https://organizer-server-app.onrender.com/api/getUsers/${getUserId()}`)
            .then((res) => {
                info = res.data;
                //getGoalsList
                const getGoalsList = async () => {
                    for(let i = 0; i < info.goals.length; i++) {
                        await axios.get(`https://organizer-server-app.onrender.com/api/getGoals/${info.goals[i]}`)
                        .then((res) => {
                            if(res.data._date === val) {
                                tempGoalsList.push(res.data);
                                setGoalsList(tempGoalsList.map((el, index) => {
                                    return <HistoryGoalsList
                                    key={index}
                                    which={el.which}
                                    why={el.why}
                                    how={el.how}
                                    when={el._when}
                                    type={el._type}
                                    comment={el.comment}
                                    />
                                }));
                            }
                        });
                    }
                }
                //getToDosList
                const getToDosList = async () => {
                    for(let i = 0; i < info.to_do_s.length; i++) {
                        await axios.get(`https://organizer-server-app.onrender.com/api/getToDos/${info.to_do_s[i]}`)
                        .then((res) => {
                            if(res.data._date === val) {
                                if(res.data.is_completed === true) {
                                    tempToDosDoneList.push(res.data);
                                    setToDosDoneList(tempToDosDoneList.map((el, index) => {
                                        return <HistoryToDosList
                                        key={index}
                                        content={el.to_do_content}
                                        isCompleted={el.is_completed}
                                        />
                                    }));
                                } else {
                                    tempToDosNotDoneList.push(res.data);
                                    setToDosNotDoneList(tempToDosNotDoneList.map((el, index) => {
                                        return <HistoryToDosList
                                        key={index}
                                        content={el.to_do_content}
                                        isCompleted={el.is_completed}
                                        />
                                    }));
                                }
                            }
                        });
                    }
                }
                //getJournalList
                const getJournalList = async () => {
                    for(let i = 0; i < info.journal.length; i++) {
                        await axios.get(`https://organizer-server-app.onrender.com/api/getJournal/${info.journal[i]}`)
                        .then((res) => {
                            if(res.data._date === val) {
                                tempJournalList.push(res.data);
                                setJournalList(tempJournalList.map((el, index) => {
                                    return <HistoryJournalList
                                    key={index}
                                    q1={el.q1}
                                    q2={el.q2}
                                    q3={el.q3}
                                    q4={el.q4}
                                    q5={el.q5}
                                    myDay={el.my_day}
                                    />
                                }));
                            }
                        });
                    }
                }
                //getNotesList
                const getNotesList = async () => {
                    for(let i = 0; i < info.notes.length; i++) {
                        await axios.get(`https://organizer-server-app.onrender.com/api/getNotes/${info.notes[i]}`)
                        .then((res) => {
                            if(res.data._date === val) {
                                tempNotesList.push(res.data);
                                setNotesList(tempNotesList.map((el, index) => {
                                    return <HistoryNotesList
                                    key={index}
                                    content={el.note_content}
                                    />
                                }));
                            }
                        });
                    }
                }

                //calling functions
                getGoalsList();
                getToDosList();
                getJournalList();
                getNotesList();
            });
        }
        getInfo();
    }

    return (
        <div>
            <NavBar />
            <div className="history">
                <div className="history__title">История дня</div>
                <div className="history__pick-date-form-wrapper">
                    <PickDateForm getData={getDateValue}/>
                </div>
                <div className="history__info-list">
                    <div className="history-info-list history-info-list__goals">
                        <div className="history-info-list__title">Мои цели</div>
                        {goalsList.length === 0 ?
                            <div className='empty-list-status'>Вы не ставили целей в этот день.</div>
                            :
                            goalsList
                        }
                    </div>
                    <div className="history-info-list history-info-list__to-do-s">
                        <div className="history-info-list__title">Список дел</div>
                        {
                            toDosDoneList.length === 0 && toDosNotDoneList.length === 0 ?
                                <div className="empty-list-status">Вы не назначили дел в этот день.</div>
                            :
                            <div>
                                <div className="history-info-list-to-do-s">
                                <div className="history-info-list-to-do-s__title">Завершённые:</div>
                                {toDosDoneList.length === 0 ?
                                    <div className="completed-status">Вы не завершили дела в этот день.</div>
                                    :
                                    toDosDoneList
                                }
                            </div>

                            <div className="history-info-list-to-do-s">
                                <div className="history-info-list-to-do-s__title">Незавершённые:</div>
                                {toDosNotDoneList.length === 0 ?
                                    <div className="completed-status">Вы завершили все дела в этот день.</div>
                                    :
                                    toDosNotDoneList
                                }
                                </div>
                            </div>
                        }
                    </div>
                    <div className="history-info-list history-info-list__journal">
                        <div className="history-info-list__title">Дневник</div>
                        {journalList.length === 0 ?
                            <div className="empty-list-status">Вы не заполняли дневник в этот день.</div>
                            :
                            journalList
                        }
                    </div>
                    <div className="history-info-list history-info-list__notes">
                        <div className="history-info-list__title">Заметки</div>
                        {notesList.length === 0 ? 
                            <div className="empty-list-status">Вы не создавали заметок в этот день.</div>
                        :
                            notesList
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
