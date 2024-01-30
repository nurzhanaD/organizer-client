import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { NavBar } from '../../components/nav/NavBar.jsx';
import { LinkButton } from '../../components/link-button/LinkButton.jsx';
import { Button } from '../../components/button/Button.jsx';
import { Input } from '../../components/input/Input.jsx';

import './MyProfile.css';

export default function MyProfile() {
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

    axios.get(`https://organizer-server-app.onrender.com/api/getUsers/${getCurrentUserId()}`)
    .then((res) => {
        setUserFirstName(res.data.first_name);
        setUserLastName(res.data.last_name);
        setUserEmail(res.data.email);
        setUserProfileImage(res.data.profile_image);
    })

    function updateUserFirstName() {
        axios.put(`https://organizer-server-app.onrender.com/api/updateUser/${getCurrentUserId()}`, {
            "first_name" : editFirstName.charAt(0).toUpperCase() + editFirstName.slice(1).toLowerCase()
        }).then((res) => {
            console.log(res.data);
            window.location.reload();
        });
        setEditFirstNameStatus(false);
    }

    function updateUserLastName() {
        axios.put(`https://organizer-server-app.onrender.com/api/updateUser/${getCurrentUserId()}`, {
            "last_name" : editLastName.charAt(0).toUpperCase() + editLastName.slice(1).toLowerCase()
        }).then((res) => {
            console.log(res.data);
            window.location.reload();
        });
        setEditLastNameStatus(false);
    }

    function updateUserProfileImageURL() {
        axios.put(`https://organizer-server-app.onrender.com/api/updateUser/${getCurrentUserId()}`, {
            "profile_image" : editProfileImageURL
        }).then((res) => {
            console.log(res.data);
            window.location.reload();
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
        navigate('/');
        window.location.reload();
    }

    function deleteProfile() {
        const deleteCurrentUserElements = async () => {
            await axios.get(`https://organizer-server-app.onrender.com/api/getUsers/${getCurrentUserId()}`)
            .then((res) => {
                const deleteCurrentUserGoals = async () => {
                    for(let i = 0; i < res.data.goals.length; i++) {
                        await axios.delete(`https://organizer-server-app.onrender.com/api/deleteGoal/${res.data.goals[i]}`)
                        .then((res) => {
                            console.log(res);
                        })
                    }
                }
                const deleteCurrentUserToDos = async () => {
                    for(let i = 0; i < res.data.to_do_s.length; i++) {
                        await axios.delete(`https://organizer-server-app.onrender.com/api/deleteToDo/${res.data.to_do_s[i]}`)
                        .then((res) => {
                            console.log(res);
                        })
                    }
                }
                const deleteCurrentUserJournal = async () => {
                    for(let i = 0; i < res.data.journal.length; i++) {
                        await axios.delete(`https://organizer-server-app.onrender.com/api/deleteJournal/${res.data.journal[i]}`)
                        .then((res) => {
                            console.log(res);
                        })
                    }
                }
                const deleteCurrentUserNotes = async () => {
                    for(let i = 0; i < res.data.notes.length; i++) {
                        await axios.delete(`https://organizer-server-app.onrender.com/api/deleteNote/${res.data.notes[i]}`)
                        .then((res) => {
                            console.log(res);
                        })
                    }
                }

                deleteCurrentUserGoals();
                deleteCurrentUserToDos();
                deleteCurrentUserJournal();
                deleteCurrentUserNotes();
            });
        }
        deleteCurrentUserElements();
        const deleteCurrentUserProfile = async () => {
            await axios.delete(`https://organizer-server-app.onrender.com/api/deleteUser/${getCurrentUserId()}`, {})
            .then((res) => {
                console.log(res);
                localStorage.setItem('lastSignedInUser', '');
                    navigate('/');
                    window.location.reload();
            });
        }
        deleteCurrentUserProfile();
    }
    return (
        <div>
            <NavBar/>
            <div className="my-profile">
                <div className="my-profile__item">
                    <div className="my-profile__user-profile-img">
                        <img src={userProfileImage} alt={userProfileImage === undefined ? 'Загрузка...' : ''} />
                    </div>
                    <div className="my-profile-user-profile-img__item">
                        <LinkButton title={editProfileImageURLStatus ? 'Отменить' : 'Изменить изображение'} classStyle='link-btn' textColor={editProfileImageURLStatus ? '#000' : '#7AA7D2'} click={() => toggleEditProfileImageURLStatus()}/>
                        { editProfileImageURLStatus ?
                            <div className="edit-profile-img">
                                <Input type='text' classStyle='my-profile-input input-white-bg' value={editProfileImageURL} change={(e) => setEditProfileImageStatusURL(e.target.value)} />
                                <LinkButton title='Готово' textColor='#7AA7D2' classStyle='link-btn' click={() => updateUserProfileImageURL()}/>
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
                                    <Input type='text' classStyle='my-profile-input input-white-bg' value={editFirstName} change={(e) => setEditFirstName(e.target.value)}/>
                                    <LinkButton title='Готово' textColor='#7AA7D2' classStyle='link-btn' click={() => updateUserFirstName()}/>
                                </div>
                                :
                                <div className="my-profile__user-data"> 
                                    <span className='my-profile__underline'>Имя:</span> {userFirstName}
                                </div> 
                            }
                            <LinkButton title={editFirstNameStatus ? 'Отменить' : 'Изменить'} textColor={editFirstNameStatus ? '#000' : '#7AA7D2'} classStyle='link-btn' click={() => toggleEditFirstNameStatus()}/>
                        </div>
                        <div className="my-profile-wrapper__item">
                            {editLastNameStatus ? 
                                <div className="my-profile__edit">
                                    <Input type='text' classStyle='my-profile-input input-white-bg' value={editLastName} change={(e) => setEditLastName(e.target.value)}/>
                                    <LinkButton title='Готово' textColor='#7AA7D2' classStyle='link-btn' textShadowColor='#929292' click={() => updateUserLastName()}/>
                                </div>
                                :
                                <div className="my-profile__user-data"> 
                                    <span className='my-profile__underline'>Фамилия:</span> {userLastName}
                                </div> 
                            }
                            <LinkButton title={editLastNameStatus ? 'Отменить' : 'Изменить'} textColor={editLastNameStatus ? '#000' : '#7AA7D2'} classStyle='link-btn' click={() => toggleEditLastNameStatus()}/>
                        </div>
                        <div className="my-profile-wrapper__item">
                            <div className="my-profile__user-data">
                                <span className='my-profile__underline'>Почта:</span> {userEmail}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-profile__item-btns">
                    <Button title='Удалить мой профиль' classStyle='btn-white-bg' click={() => deleteProfile()} />
                    <Button title='Выйти' classStyle='btn-white-bg' click={() => signOut()} />
                </div>
            </div>
        </div>
    )
}

