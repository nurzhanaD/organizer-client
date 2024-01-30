import React from 'react';
import './HistoryGoalsList.css';

export function HistoryGoalsList(props) {
  return (
    <div className="history-goals-list">
        <div className="history-goals-list__which">{props.which === "" ? <span className='empty-goal-info'>Не заполнено.</span> : props.which}</div>
        <div className="history-goals-list__q-a">
            <div className="history-goals-list__q">Почему я хочу добиться этой цели?</div>
            <div className="history-goals-list__a">{props.why === "" ? <span className='empty-goal-info'>Не заполнено.</span> : props.why}</div>
        </div>
        <div className="history-goals-list__q-a">
            <div className="history-goals-list__q">Как я буду себя чувствовать, когда добьюсь этой цели?</div>
            <div className="history-goals-list__a">{props.how === "" ? <span className='empty-goal-info'>Не заполнено.</span> : props.how}</div>
        </div>
        <div className="history-goals-list__q-a">
            <div className="history-goals-list__q">Когда я пойму, что цель достигнута?</div>
            <div className="history-goals-list__a">{props.when === "" ? <span className='empty-goal-info'>Не заполнено.</span> : props.when}</div>
        </div>
        <div className="history-goals-list__q-a">
            <div className="history-goals-list__q">Тип срочности.</div>
            <div className="history-goals-list__a">{props.type === "" ? <span className='empty-goal-info'>Не заполнено.</span> : props.type === "short" ? "Краткосрочная" : props.type === "long" ? "Долгосрочная": ""}</div>
        </div>
        <div className="history-goals-list__q-a">
            <div className="history-goals-list__q">Примечание.</div>
            <div className="history-goals-list__a">{props.comment === "" ? <span className='empty-goal-info'>Не заполнено.</span> : props.comment}</div>
        </div>
        <hr />
    </div>
  )
}
