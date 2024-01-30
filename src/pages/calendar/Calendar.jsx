import React, { useState, useEffect } from 'react';
import * as dayjs from 'dayjs';

import { NavBar } from '../../components/nav/NavBar.jsx';

import './Calendar.css';

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [calendarDatesList, setCalendarDatesList] = useState([]);
    
    function showMonth() {
        switch (dayjs().month()) {
            case 0:
                return 'января'
            case 1:
                return 'февраля'
            case 2:
                return 'марта'
            case 3:
                return 'апреля'
            case 4:
                return 'мая'
            case 5:
                return 'июня'
            case 6:
                return 'июля'
            case 7:
                return 'августа'
            case 8:
                return 'сентября'
            case 9:
                return 'октября'
            case 10:
                return 'ноября'
            case 11:
                return 'декабря'
            default:
                return ''
        }
    }

    function showMonthTitle() {
        switch (currentDate.$M) {
            case 0:
                return 'ЯНВАРЬ'
            case 1:
                return 'ФЕВРАЛЬ'
            case 2:
                return 'МАРТ'
            case 3:
                return 'АПРЕЛЬ'
            case 4:
                return 'МАЙ'
            case 5:
                return 'ИЮНЬ'
            case 6:
                return 'ИЮЛЬ'
            case 7:
                return 'АВГУСТ'
            case 8:
                return 'СЕНТЯБРЬ'
            case 9:
                return 'ОКТЯБРЬ'
            case 10:
                return 'НОЯБРЬ'
            case 11:
                return 'ДЕКАБРЬ'
            default:
                return ''
        }
    }

    useEffect(() => {
        showCurrentMonth();
        // eslint-disable-next-line
    }, [currentDate]);

    function showCurrentMonth() {
        let temp = [];
        for(let i = 1; i < currentDate.daysInMonth() + 1; i++) {
            temp.push(i);
        }
        setCalendarDatesList(temp);
    }

    function increaseMonthIndex() {
        setCurrentDate(currentDate.add(1, 'month'));
        showCurrentMonth();
    }
    
    function decreaseMonthIndex() {
        setCurrentDate(currentDate.subtract(1, 'month'));
        showCurrentMonth();
    }
    
    return (
        <div>
            <NavBar/>
            <div className="calendar">
                <div className="calendar__title">Календарь</div>
                <div className="calendar__today-wrapper">
                    <div className="calendar__today">&#40; {dayjs().date()} {showMonth()} {dayjs().year()} &#41;</div>
                </div>
                <div className="calendar__month">{showMonthTitle()} {currentDate.year()}</div>
                <div className="calendar__main">
                    <button className="calendar__btn calendar-btn__prev" onClick={() => decreaseMonthIndex()}>
                        <img src="https://cdn-icons-png.flaticon.com/512/25/25243.png" alt="https://cdn-icons-png.flaticon.com/512/25/25243.png" />
                    </button>
                    <table className='calendar__table'>
                        <thead className='calendar-table__thead'>
                            <tr>
                                <th>пн</th>
                                <th>вт</th>
                                <th>ср</th>
                                <th>чт</th>
                                <th>пт</th>
                                <th>сб</th>
                                <th>вс</th>
                            </tr>
                        </thead>

                        <tbody className='calendar-table__tbody'>
                            {
                                calendarDatesList.map((el, index) => {
                                    return <tr className='calendar__date' key={index} style={index === 0 ? currentDate.date(1).$W === 0 ? {gridColumnStart: 7} : {gridColumnStart: currentDate.date(1).$W} : {}}><td>{el}</td></tr>
                                })
                            }
                        </tbody>
                    </table>

                    <button className="calendar__btn calendar-btn__next" onClick={() => increaseMonthIndex()}>
                        <img src="https://cdn-icons-png.flaticon.com/512/25/25243.png" alt="https://cdn-icons-png.flaticon.com/512/25/25243.png" />
                    </button>
                </div>

            </div>
        </div>
  )
}
