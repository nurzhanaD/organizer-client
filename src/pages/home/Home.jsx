import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkButton } from '../../components/link-button/LinkButton.jsx';

import './Home.css';

export default function Home() {
    const navigate = useNavigate();

    function navigateToSignUpPage() {
        navigate('/sign-up');
    }

    function navigateToSignInPage() {
        navigate('/sign-in');
    }

    return (
        <div className="home">
            <img className="home__img" src="https://cdn-icons-png.flaticon.com/512/4213/4213684.png" alt="dog-icon" />
            <div className="home__title">Органайзер</div>
            <div className="home__buttons">
                <LinkButton title='Зарегистрироваться' classStyle='link-btn-tertiary' textColor='#fff' click={() => navigateToSignUpPage()}/>
                <LinkButton title='Войти в профиль' classStyle='link-btn-tertiary' textColor='#fff' click={() => navigateToSignInPage()}/>
            </div>
        </div>
    )
}
