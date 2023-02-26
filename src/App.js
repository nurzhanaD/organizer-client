import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home.jsx';
import SignUp from './pages/sign-up/SignUp.jsx';
import SignIn from './pages/sign-in/SignIn.jsx';
import MyGoals from './pages/my-goals/MyGoals.jsx';
import Calendar from './pages/calendar/Calendar.jsx';
import ToDoList from './pages/to-do-list/ToDoList.jsx';
import Journal from './pages/journal/Journal.jsx';
import Relaxing from './pages/relaxing/Relaxing.jsx';
import Notes from './pages/notes/Notes.jsx';
import History from './pages/history/History.jsx';
import MyProfile from './pages/my-profile/MyProfile.jsx';
import NavigateToHomePage from './pages/navigateToHomePage/NavigateToHomePage.jsx';
import NavigateToMyProfilePage from './pages/navigateToMyProfilePage/NavigateToMyProfilePage.jsx';

export default function App() {
    function automateSignIn() {
        if (localStorage.getItem('lastSignedInUser') === '' || localStorage.getItem('lastSignedInUser') === null) {
            return false;
        } else {
            return true;
        }
    }

    return (
        <div className='app'>
            <Routes>
                <Route path='/' element={automateSignIn() ? <NavigateToMyProfilePage /> : <Home />} ></Route>
                <Route path='/sign-up' element={ automateSignIn() ? <NavigateToMyProfilePage /> : <SignUp />} ></Route>
                <Route path='/sign-in' element={ automateSignIn() ? <NavigateToMyProfilePage /> : <SignIn/>} ></Route>
                <Route path='/my-goals' element={ automateSignIn() ? <MyGoals /> : <NavigateToHomePage />} ></Route>
                <Route path='/calendar' element={ automateSignIn() ? <Calendar/> : <NavigateToHomePage />}></Route>
                <Route path='/to-do-list' element={ automateSignIn() ? <ToDoList /> : <NavigateToHomePage />} ></Route>
                <Route path='/journal' element={ automateSignIn() ? <Journal /> : <NavigateToHomePage />} ></Route>
                <Route path='/relaxing' element={ automateSignIn() ? <Relaxing /> : <NavigateToHomePage />} ></Route>
                <Route path='/notes' element={ automateSignIn() ? <Notes /> : <NavigateToHomePage />} ></Route>
                <Route path='/history' element={ automateSignIn() ? <History /> : <NavigateToHomePage />} ></Route>
                <Route path='/my-profile' element={ automateSignIn() ? <MyProfile /> : <NavigateToHomePage />} ></Route>
            </Routes>
        </div>
    )
}
