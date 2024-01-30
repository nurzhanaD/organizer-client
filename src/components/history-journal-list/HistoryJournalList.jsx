import React from 'react';
import './HistoryJournalList.css';

export function HistoryJournalList(props) {
  return (
    <div className="history-journal-list">
      <div className="history-journal-list__Qs">
        <div className="history-journal-list__q">Что меня радует?</div>
        <div className="history-journal-list__q">Что меня расстраивает?</div>
        <div className="history-journal-list__q">Мои сильные стороны.</div>
        <div className="history-journal-list__q">Мои слабые стороны.</div>
        <div className="history-journal-list__q">Доволен / довольна ли я, тем как был проведён день сегодня?</div>
        <div className="history-journal-list__q">Опиши свой день.</div>
      </div>
      <div className="history-journal-list__As">
        <div className="history-journal-list__a">{props.q1 === '' ? <span className='empty-q-info'>Не заполнено.</span> : props.q1}</div>
        <div className="history-journal-list__a">{props.q2 === '' ? <span className='empty-q-info'>Не заполнено.</span> : props.q2}</div>
        <div className="history-journal-list__a">{props.q3 === '' ? <span className='empty-q-info'>Не заполнено.</span> : props.q3}</div>
        <div className="history-journal-list__a">{props.q4 === '' ? <span className='empty-q-info'>Не заполнено.</span> : props.q4}</div>
        <div className="history-journal-list__a">{props.q5 === 'yes' ? 'Да' : 'Нет'}</div>
        <div className="history-journal-list__a"><span className='my-day'>{props.myDay === '' ? <span className='empty-q-info'>Не заполнено.</span> : props.myDay}</span></div>
      </div>
    </div>
  )
}
