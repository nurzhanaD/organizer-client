import React, { useState } from 'react';
import axios from 'axios';

import { NavLink } from 'react-router-dom';

import './NavBar.css';

export function NavBar() {
    const [profileImage, setProfileImage] = useState('');
    const [burgerStatus, setBurgerStatus] = useState(false);

    function getCurrentUserId() {
        return localStorage.getItem('lastSignedInUser');
    }

    axios.get(`https://organizer-server-app.onrender.com/api/getUsers/${getCurrentUserId()}`)
    .then((res) => {
        setProfileImage(res.data.profile_image);
    });

    function burgerSlideOut() {
        setBurgerStatus(!burgerStatus);
    }

    return (
        <div className='navbar'>
            <button className={`burger-btn ${burgerStatus ? 'burger-btn__close' : 'burger-btn__open'}`} onClick={() => burgerSlideOut()}></button>
            <div className='links' id={burgerStatus ? 'slide-out' : 'fade-in'}>
                <NavLink className='link' style={({ isActive }) => ({textDecoration : isActive ? 'underline' : 'none'})} to='/my-goals' >Мои цели</NavLink>
                <NavLink className='link' style={({ isActive }) => ({textDecoration : isActive ? 'underline' : 'none'})} to='/calendar' >Календарь</NavLink>
                <NavLink className='link' style={({ isActive }) => ({textDecoration : isActive ? 'underline' : 'none'})} to='/to-do-list' >Список дел</NavLink>
                <NavLink className='link' style={({ isActive }) => ({textDecoration : isActive ? 'underline' : 'none'})} to='/journal' >Дневник</NavLink>
                <NavLink className='link' style={({ isActive }) => ({textDecoration : isActive ? 'underline' : 'none'})} to='/relaxing' >Дыхание</NavLink>
                <NavLink className='link' style={({ isActive }) => ({textDecoration : isActive ? 'underline' : 'none'})} to='/notes' >Заметки</NavLink>
                <NavLink className='link' style={({ isActive }) => ({textDecoration : isActive ? 'underline' : 'none'})} to='/history' >История</NavLink>
                <NavLink className='link navbar__my-profile-link' style={({ isActive }) => ({textDecoration : isActive ? 'underline' : 'none'})} to='/my-profile' >
                    <img className='navbar__profile-img' src={profileImage} alt={profileImage} />
                    Мой профиль
                </NavLink>
            </div>
        </div>
  )
}
