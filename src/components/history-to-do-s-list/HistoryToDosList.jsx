import React from 'react';
import './HistoryToDosList.css';

export function HistoryToDosList(props) {
  return (
    <div className="history-to-do-s-list">- {props.content}</div>
  )
}
