import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';

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
            console.log(res.data[0]);
        })
    }

    return (
        <div className='sign-up'>
            <h1 className='sign-up-title'>Добро пожаловать в "Органайзер"</h1>
            <form>
                <h3>Зарегистрироваться</h3>
                <label>Имя</label>
                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
                <label>Фамилия</label>
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
                <label>Электронная почта</label>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                <label>Пароль</label>
                <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
                <button type='button' onClick={() => signUp()}>Зарегистрироваться</button>
            </form>
        </div>
  )
}
