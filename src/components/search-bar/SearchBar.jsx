import React, { useRef } from 'react';

import './SearchBar.css';

export function SearchBar(props) {
    const refSearchBar = useRef(null);

    function focusSearchBar() {
        refSearchBar.current.style.boxShadow = '1px 8px 5px #81a3c5';
        refSearchBar.current.style.transitionProperty = 'box-shadow';
        refSearchBar.current.style.transitionDuration = '0.5s';
    }

    function unFocusSearchBar() {
        refSearchBar.current.style.boxShadow = 'none';
    }

    return (
        <div className="search-bar" ref={refSearchBar}>
            <input type="text" className="search-bar__input" onFocus={() => focusSearchBar()} onBlur={() => unFocusSearchBar()} placeholder="Поиск..." value={props.value} onChange={props.change}/>
            <button className='search-bar__btn' onClick={props.btnClick}>
                <img className='search-bar-btn__img' src="https://cdn-icons-png.flaticon.com/512/149/149852.png" alt="https://cdn-icons-png.flaticon.com/512/149/149852.png" />
            </button>
        </div>
    )
}
