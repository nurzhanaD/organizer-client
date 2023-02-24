import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignUp } from './pages/sign-up/SignUp.jsx';
import { SignIn } from './pages/sign-in/SignIn.jsx';
import { MyGoals } from './pages/my-goals/MyGoals.jsx';
import { Calendar } from './pages/calendar/Calendar.jsx';
import { ToDoList } from './pages/to-do-list/ToDoList.jsx';
import { Journal } from './pages/journal/Journal.jsx';
import { Relaxing } from './pages/relaxing/Relaxing.jsx';
import { Notes } from './pages/notes/Notes.jsx';
import { MyProfile } from './pages/my-profile/MyProfile.jsx';

export default function App() {
    function automateSignIn() {
        if (localStorage.getItem('lastSignedInUser') !== '') {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className='app'>
            <Routes>
                <Route path='/sign-up' element={ automateSignIn() ? null : <SignUp />} ></Route>
                <Route path='/sign-in' element={ automateSignIn() ? null : <SignIn/>} ></Route>
                <Route path='/my-goals' element={ automateSignIn() ? <MyGoals /> : null} ></Route>
                <Route path='/calendar' element={ automateSignIn() ? <Calendar/> : null}></Route>
                <Route path='/to-do-list' element={ automateSignIn() ? <ToDoList /> : null} ></Route>
                <Route path='/journal' element={ automateSignIn() ? <Journal /> : null} ></Route>
                <Route path='/relaxing' element={ automateSignIn() ? <Relaxing /> : null} ></Route>
                <Route path='/notes' element={ automateSignIn() ? <Notes /> : null} ></Route>
                <Route path='/my-profile' element={ automateSignIn() ? <MyProfile /> : null} ></Route>
            </Routes>
        </div>
    )
}
