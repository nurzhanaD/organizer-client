import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { SignUp } from './pages/sign-up/SignUp.jsx';
import { SignIn } from './pages/sign-in/SignIn.jsx';

export default function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={ <SignUp /> } ></Route>
        <Route path='/sign-in' element={ <SignIn /> } ></Route>
      </Routes>
    </div>
  )
}
