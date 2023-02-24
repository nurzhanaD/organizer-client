import React from 'react';
import { useNavigate } from 'react-router-dom';

import { LinkButton } from '../../components/link-button/LinkButton.jsx';

import './Home.css';

export function Home() {
    const navigate = useNavigate();

    function navigateToSignUpPage() {
        navigate('/sign-up');
    }

    function navigateToSignInPage() {
        navigate('/sign-in');
    }

    return (
        <div className="home">
            <div className="home__cover">
                <img className="home-cover__img" src="https://cdn-icons-png.flaticon.com/512/4213/4213684.png" alt="" />
            </div>
            <div className="home__title">Органайзер</div>
            <div className="home__buttons">
                <LinkButton title='Зарегистрироваться' classStyle='link-btn-secondary' textColor='#fff' click={() => navigateToSignUpPage()}/>
                <LinkButton title='Войти в профиль' classStyle='link-btn-secondary' textColor='#fff' click={() => navigateToSignInPage()}/>
            </div>
        </div>
    )
}
