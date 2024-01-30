import React, { useState, useEffect } from 'react';
import * as dayjs from 'dayjs';

import { LinkButton } from '../link-button/LinkButton.jsx';
import './PickDateForm.css';

export function PickDateForm(props) {
    const todayDate = dayjs().format('DD');
    const todayMonth = dayjs().format('MM');
    const todayYear = dayjs().format('YYYY');

    const [pickedDate, setPickedDate] = useState(todayDate);
    const [pickedMonth, setPickedMonth] = useState(todayMonth);
    const [pickedYear, setPickedYear] = useState(todayYear);

    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026'];

    function getMonthDates(monthNumber, yearNumber) {
        let temp = [];
        for (let i = 1; i < dayjs(`${yearNumber}-${monthNumber}`).daysInMonth() + 1; i++) {
            if (i < 10) {
                i = `0${i}`;
            }
            temp.push((i).toString());
        }
        return temp;
    }

    function sendDateValue() {
        props.getData(`${pickedDate}/${pickedMonth}/${pickedYear}`);
    }

    useEffect(() => {
        props.getData(`${pickedDate}/${pickedMonth}/${pickedYear}`);
        //eslint-disable-next-line
    }, [])
    

    return (
        <form className="pick-date-form">
            <select className='pick-date-form__select select__date' onChange={(e) => setPickedDate(e.target.value)} defaultValue={dayjs().format('DD')}>
                {getMonthDates(pickedMonth, pickedYear).map((el, index) => {
                    return <option key={index}>{el}</option>
                })}
            </select>
            <div className="slash">/</div>
            <select className='pick-date-form__select select__month' onChange={(e) => setPickedMonth(e.target.value)} defaultValue={dayjs().format('MM')}>
                {months.map((el, index) => {
                    return <option key={index}>{el}</option>
                })}
            </select>
            <div className="slash">/</div>
            <select className='pick-date-form__select select__year' onChange={(e) => setPickedYear(e.target.value)} defaultValue={dayjs().format('YYYY')}>
                {years.map((el, index) => {
                    return <option key={index}>{el}</option>
                })}
            </select>
            <LinkButton title="ок" textColor="#fff" click={() => sendDateValue()}/>
        </form>
    )
}
