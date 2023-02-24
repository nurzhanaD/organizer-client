import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { NavBar } from '../../components/nav/NavBar.jsx';
import { LinkButton } from '../../components/link-button/LinkButton.jsx';
import { Button } from '../../components/button/Button.jsx';
import { Input } from '../../components/input/Input.jsx';

import './MyProfile.css';

export function MyProfile() {
    const navigate = useNavigate();

    const [editFirstNameStatus, setEditFirstNameStatus] = useState(false);
    const [editLastNameStatus, setEditLastNameStatus] = useState(false);
    const [editFirstName, setEditFirstName] = useState('');
    const [editLastName, setEditLastName] = useState('');
    const [editProfileImageURLStatus, setEditProfileImageStatusURLStatus] = useState(false);
    const [editProfileImageURL, setEditProfileImageStatusURL] = useState('');

    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userProfileImage, setUserProfileImage] = useState('');

    function getCurrentUserId() {
        return localStorage.getItem('lastSignedInUser');
    }

    axios.get(`https://organizer-server.onrender.com/api/getUsers/${getCurrentUserId()}`)
    .then((res) => {
        setUserFirstName(res.data.first_name);
        setUserLastName(res.data.last_name);
        setUserEmail(res.data.email);
        setUserProfileImage(res.data.profile_image);
    })

    function updateUserFirstName() {
        axios.put(`https://organizer-server.onrender.com/api/updateUser/${getCurrentUserId()}`, {
            "first_name" : editFirstName.charAt(0).toUpperCase() + editFirstName.slice(1).toLowerCase()
        }).then((res) => {
            console.log(res.data);
        });
        setEditFirstNameStatus(false);
    }

    function updateUserLastName() {
        axios.put(`https://organizer-server.onrender.com/api/updateUser/${getCurrentUserId()}`, {
            "last_name" : editLastName.charAt(0).toUpperCase() + editLastName.slice(1).toLowerCase()
        }).then((res) => {
            console.log(res.data);
        });
        setEditLastNameStatus(false);
    }

    function updateUserProfileImageURL() {
        axios.put(`https://organizer-server.onrender.com/api/updateUser/${getCurrentUserId()}`, {
            "profile_image" : editProfileImageURL
        }).then((res) => {
            console.log(res.data);
        });
        setEditProfileImageStatusURLStatus(false);
    }

    function toggleEditProfileImageURLStatus() {
        setEditProfileImageStatusURLStatus(!editProfileImageURLStatus);
    }

    function toggleEditFirstNameStatus() {
        setEditFirstNameStatus(!editFirstNameStatus);
    }

    function toggleEditLastNameStatus() {
        setEditLastNameStatus(!editLastNameStatus);
    }

    function signOut() {
        localStorage.setItem('lastSignedInUser', '');
        navigate('/sign-up');
        window.location.reload();
    }

    function deleteProfile() {
        axios.delete(`https://organizer-server.onrender.com/api/deleteUser/${getCurrentUserId()}`, {})
        .then((res) => {
            console.log(res);
            localStorage.setItem('lastSignedInUser', '');
            navigate('/');
            window.location.reload();
        });
    }
    
    return (
        <div>
            <NavBar/>
            <div className="my-profile">
                <div className="my-profile__item">
                    <div className="my-profile__user-profile-img">
                        <img src={userProfileImage} alt="profile" />
                    </div>
                    <div className="my-profile-user-profile-img__item">
                        <LinkButton title={editProfileImageURLStatus ? 'Отменить' : 'Изменить изображение'} textColor={editProfileImageURLStatus ? '#000' : '#7AA7D2'} click={() => toggleEditProfileImageURLStatus()}/>
                        { editProfileImageURLStatus ?
                            <div className="edit-profile-img">
                                <Input type='text' value={editProfileImageURL} change={(e) => setEditProfileImageStatusURL(e.target.value)} />
                                <LinkButton title='Готово' textColor='#7AA7D2' click={() => updateUserProfileImageURL()}/>
                            </div>
                            :
                            <div></div>
                        }
                    </div>
                    <div className='my-profile__title'>Добро пожаловать в ваш профиль, <span className='my-profile-title__user-name'>{userFirstName} {userLastName}</span>.</div>
                </div>
                <div className="my-profile__item">
                    <div className="my-profile__wrapper">
                        <div className="my-profile-wrapper__item">
                            {editFirstNameStatus ? 
                                <div className="my-profile__edit">
                                    <Input type='text' value={editFirstName} change={(e) => setEditFirstName(e.target.value)}/>
                                    <LinkButton title='Готово' textColor='#7AA7D2' click={() => updateUserFirstName()}/>
                                </div>
                                :
                                <div className="my-profile__user-data"> 
                                    <span className='my-profile__underline'>Имя:</span> {userFirstName}
                                </div> 
                            }
                            <LinkButton title={editFirstNameStatus ? 'Отменить' : 'Изменить'} textColor={editFirstNameStatus ? '#000' : '#7AA7D2'} click={() => toggleEditFirstNameStatus()}/>
                        </div>
                        <div className="my-profile-wrapper__item">
                            {editLastNameStatus ? 
                                <div className="my-profile__edit">
                                    <Input type='text' value={editLastName} change={(e) => setEditLastName(e.target.value)}/>
                                    <LinkButton title='Готово' textColor='#7AA7D2' click={() => updateUserLastName()}/>
                                </div>
                                :
                                <div className="my-profile__user-data"> 
                                    <span className='my-profile__underline'>Фамилия:</span> {userLastName}
                                </div> 
                            }
                            <LinkButton title={editLastNameStatus ? 'Отменить' : 'Изменить'} textColor={editLastNameStatus ? '#000' : '#7AA7D2'} click={() => toggleEditLastNameStatus()}/>
                        </div>
                        <div className="my-profile-wrapper__item">
                            <div className="my-profile__user-data">
                                <span className='my-profile__underline'>Почта:</span> {userEmail}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-profile__item-btns">
                    <Button title='Удалить мой профиль' click={() => deleteProfile()} />
                    <Button title='Выйти' click={() => signOut()} />
                </div>
            </div>
        </div>
    )
}

