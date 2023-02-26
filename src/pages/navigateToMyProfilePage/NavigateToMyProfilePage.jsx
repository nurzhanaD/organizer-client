import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './NavigateToMyProfilePage.css';

export default function NavigateToMyProfilePage() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/my-profile');
    })

    return (
        <div className="navigate-to-my-profile-page">
            my-profile page navigation
        </div>
    )
}
