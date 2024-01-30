import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Input } from '../../components/input/Input.jsx';
import { Button } from '../../components/button/Button.jsx';

import './SignIn.css';

export default function SignIn(props) {
    const navigate = useNavigate();

    const [statusFail, setStatusFail] = useState(false);
    const [statusSuccess, setStatusSuccess] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    function signIn() {
        axios.post('https://organizer-server-app.onrender.com/api/signInUser', {
            "email": email,
            "_password": password
        }).then((res) => {
            if (res.data[0] === undefined) {
                setStatusFail(true);
                setStatusSuccess(false);
            } else {
                setStatusSuccess(true);
                setStatusFail(false);
                localStorage.setItem('lastSignedInUser', res.data[0].user_id);
                setEmail('');
                setPassword('');
                navigate('/my-profile');
                window.location.reload();
            }
        });

    }

    return (
        <div className="sign-in">
            <div className="sign-in__title">Добро пожаловать в "Органайзер"!</div>
            <form className="sign-in__form">
                <div className="sign-in-form__title">Войти</div>
                <div className="sign-in-form__wrapper">
                    <div className="sign-in-form__item">
                        <label className="sign-in-form__label">Электронная почта:</label>
                        <Input type='text' value={email} change={e => setEmail(e.target.value)} classStyle='input-light-bg'></Input>
                    </div>
                    <div className="sign-in-form__item">
                        <label className="sign-in-form__label">Пароль:</label>
                        <Input type='password' value={password} change={e => setPassword(e.target.value)} classStyle='input-light-bg'></Input>
                    </div>
                </div>
                <Button title='Войти' classStyle='btn-light-bg' click={() => signIn()}></Button>
                <div className={`text-space ${statusSuccess ? 'success' : statusFail ? 'required' : 'default'}`}>{statusSuccess ? 'Вы вошли успешно' : statusFail ? 'Проверьте правильность введённых данных.' : ''}</div>
                <Link className="sign-up-link" to="/sign-up">Если у вас ещё нет аккаунта, вы можете зарегистрироваться здесь.</Link>
            </form>
        </div>
    )

}