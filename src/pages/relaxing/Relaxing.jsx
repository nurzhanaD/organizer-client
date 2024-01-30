import React, { useState } from 'react';

import { NavBar } from '../../components/nav/NavBar';
import { Button } from '../../components/button/Button.jsx';

import './Relaxing.css';

export default function Relaxing() {
    const time = 4000;
    const [relaxingSessionStatus, setRelaxingSessionStatus] = useState(false);
    const [relaxingGuideClass, setRelaxingGuideClass] = useState('');
    const [relaxingGuideTitle, setRelaxingGuideTitle] = useState('');
    const [intervalID, setIntervalID] = useState();
    const [timeoutID, setTimeoutID] = useState();

    function toggleRelaxingSession(status) {
        setRelaxingSessionStatus(status);
        if (status === true) {
            relaxingSession();
        } else {
            endRelaxingSession();
        }
    }

    function relaxingSession() {
        setRelaxingGuideClass('inhale');
        setRelaxingGuideTitle('ВДОХ');
        setTimeoutID(
            setTimeout(() => {
                setRelaxingGuideTitle('ЗАДЕРЖКА');
                setTimeout(() => {
                    setRelaxingGuideClass('exhale');
                    setRelaxingGuideTitle('ВЫДОХ');
                    setTimeout(() => {
                        setRelaxingGuideTitle('ЗАДЕРЖКА');
                    }, time);
                }, time);
            }, time)
        );

        setIntervalID(
            setInterval(() => {
                setRelaxingGuideClass('inhale');
                setRelaxingGuideTitle('ВДОХ');
                setTimeout(() => {
                    setRelaxingGuideTitle('ЗАДЕРЖКА');
                    setTimeout(() => {
                        setRelaxingGuideClass('exhale');
                        setRelaxingGuideTitle('ВЫДОХ');
                        setTimeout(() => {
                            setRelaxingGuideTitle('ЗАДЕРЖКА');
                        }, time);
                    }, time);
                }, time);
            }, time * 4)
        );
    }

   function endRelaxingSession() {
        clearTimeout(timeoutID);
        clearInterval(intervalID);
        setTimeoutID(null);
        setIntervalID(null);
        reloadPage();
    }

    function reloadPage() {
        window.location.reload();
    }

    return (
        <div>
            <NavBar/>
            <div className="relaxing">
                <div className="relaxing__title">Дыхание</div>
                <div className="relaxing__guide-wrapper">
                    <div className={`relaxing__guide ${relaxingSessionStatus ? relaxingGuideClass : ''}`}>
                        {relaxingSessionStatus ?
                            <span className='relaxing-guide__title'>{relaxingGuideTitle}</span>
                            :
                            <img className="relaxing-guide__icon" src="https://cdn-icons-png.flaticon.com/512/2438/2438018.png" alt="https://cdn-icons-png.flaticon.com/512/2438/2438018.png" />
                        }
                    </div>
                </div>
                <Button title={relaxingSessionStatus ? 'ЗАКОНЧИТЬ' : 'НАЧАТЬ'} classStyle='btn-small btn-light-bg' click={() => toggleRelaxingSession(!relaxingSessionStatus)}/>
            </div>
        </div>
    )
}