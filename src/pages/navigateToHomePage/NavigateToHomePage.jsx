import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './NavigateToHomePage.css';

export default function NavigateToHomePage() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/');
    })
    

    return (
        <div className="navigate-to-home-page">
            home page navigation
        </div>
    )
}
