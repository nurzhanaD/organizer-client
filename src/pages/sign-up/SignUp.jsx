import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Button } from '../../components/button/Button.jsx';
import { Input } from '../../components/input/Input.jsx';

import './SignUp.css';

export function SignUp() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function signUp() {
        axios.post('https://organizer-server.onrender.com/api/addUser', {
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "_password": password
        }).then((res) => {
            console.log(`user with id: ${res.data[0].user_id} was successfully registered`);
        });

        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    }

    return (
        <div className='sign-up'>
            <div className='sign-up-title'>Добро пожаловать в "Органайзер"</div>
            <form>
                <div className="form-title">Зарегистрироваться</div>
                <div className="form-item">
                    <label>Имя:</label>
                    <Input inputType='text' inputValue={firstName} inputOnChange={e => setFirstName(e.target.value)} inputStyle='input-sign-up'></Input>
                </div>
                <div className="form-item">
                    <label>Фамилия:</label>
                    <Input inputType='text' inputValue={lastName} inputOnChange={e => setLastName(e.target.value)} inputStyle='input-sign-up'></Input>
                </div>
                <div className="form-item">
                    <label>Электронная почта:</label>
                    <Input inputType='text' inputValue={email} inputOnChange={e => setEmail(e.target.value)} inputStyle='input-sign-up'></Input>
                </div>
                <div className="form-item">
                    <label>Пароль:</label>
                    <Input inputType='password' inputValue={password} inputOnChange={e => setPassword(e.target.value)} inputStyle='input-sign-up'></Input>
                </div>
                <Button btnClick={() => signUp()} btnTitle="Зарегистрироваться" btnStyle='btn-sign-up'></Button>
            </form>
            <Link className="status" to="/sign-in">Если у вас уже есть аккаунт, можете зайти здесь.</Link>
        </div>
  )
}
