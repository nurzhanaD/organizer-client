import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Button } from '../../components/button/Button.jsx';
import { Input } from '../../components/input/Input.jsx';

import './SignUp.css';

export default function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const defaultProfileImages = [
        'https://cdn-icons-png.flaticon.com/512/4696/4696237.png',
        'https://cdn-icons-png.flaticon.com/512/4696/4696245.png',
        'https://cdn-icons-png.flaticon.com/512/4696/4696249.png',
        'https://cdn-icons-png.flaticon.com/512/4696/4696276.png'
    ]
    const randomNum = defaultProfileImages.length - 1;

    const [requiredWarning, setRequiredWarning] = useState(false);
    const [uniqueEmailWarning, setUniqueEmailWarning] = useState(false);
    const [successfulSignUp, setSuccessfulSignUp] = useState(false);

    function signUp() {
        if (firstName !== '' && lastName !== '' && email !== '' && password !== '') {
            axios.post('https://organizer-server-app.onrender.com/api/addUser', {
                "first_name": firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase(),
                "last_name": lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase(),
                "email": email,
                "_password": password,
                "profile_image": defaultProfileImages[Math.floor(Math.random() * randomNum)]
            }).then((res) => {
                if (res.data.code === '23505') {
                    setUniqueEmailWarning(true);
                    setSuccessfulSignUp(false);
                } else {
                    setUniqueEmailWarning(false);
                    setSuccessfulSignUp(true);
                    setFirstName('');
                    setLastName('');
                    setEmail('');
                    setPassword('');
                }
            });
            setRequiredWarning(false);
            setSuccessfulSignUp(true);
        } else {
            setRequiredWarning(true);
            setSuccessfulSignUp(false);
        }
    }

    return (
        <div className='sign-up'>
            <div className='sign-up__title'>Добро пожаловать в "Органайзер"!</div>
            <form className='sign-up__form'>
                <div className="sign-up-form__title">Зарегистрироваться</div>
                <div className="sign-up-form__wrapper">
                    <div className="sign-up-form__item">
                        <label className='sign-up-form__label'>Имя:</label>
                        <Input type='text' value={firstName} change={e => setFirstName(e.target.value)} classStyle='input-light-bg'></Input>
                    </div>
                    <div className="sign-up-form__item">
                        <label className='sign-up-form__label'>Фамилия:</label>
                        <Input type='text' value={lastName} change={e => setLastName(e.target.value)} classStyle='input-light-bg'></Input>
                    </div>
                    <div className="sign-up-form__item">
                        <label className='sign-up-form__label'>Электронная почта:</label>
                        <Input type='text' value={email} change={e => setEmail(e.target.value)} classStyle='input-light-bg'></Input>
                        <div className="required">{uniqueEmailWarning ? 'Данная электронная почта уже зарегистрирована.' : ''}</div>
                    </div>
                    <div className="sign-up-form__item">
                        <label className='sign-up-form__label'>Пароль:</label>
                        <Input type='password' value={password} change={e => setPassword(e.target.value)} classStyle='input-light-bg'></Input>
                    </div>
                </div>   
                <Button click={() => signUp()} title="Зарегистрироваться" classStyle='btn-light-bg'></Button>
                <div className={`text-space ${requiredWarning ? 'required' : successfulSignUp ? 'success' : 'default'}`}>
                    {requiredWarning ? 'Все поля обязательны для заполнения.' : ''}
                    {successfulSignUp ? 'Вы были успешно зарегистрированы.' : ''}
                </div>
                <Link className="sign-in-link" to="/sign-in">Если у вас уже есть аккаунт, можете войти в свой профиль здесь.</Link>
            </form>
        </div>
  )
}
