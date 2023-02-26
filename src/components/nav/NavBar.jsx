import React, { useState } from 'react';
import axios from 'axios';

import { NavLink } from 'react-router-dom';

import './NavBar.css';

export function NavBar() {
    const [profileImage, setProfileImage] = useState('');

    function getCurrentUserId() {
        return localStorage.getItem('lastSignedInUser');
    }

    axios.get(`https://organizer-server.onrender.com/api/getUsers/${getCurrentUserId()}`)
    .then((res) => {
        setProfileImage(res.data.profile_image);
    });

    return (
        <div className="navbar">
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
  )
}
