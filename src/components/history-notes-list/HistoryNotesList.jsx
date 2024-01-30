import React from 'react';
import './HistoryNotesList.css';

export function HistoryNotesList(props) {
  return (
    <div className="history-notes-list">- {props.content}</div>
  )
}
