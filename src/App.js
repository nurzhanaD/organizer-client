import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { SignUp } from './pages/sign-up/SignUp.jsx';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='' element={ <SignUp /> } ></Route>
      </Routes>
    </div>
  )
}
