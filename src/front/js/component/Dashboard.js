// src/components/Dashboard.js
import React, { useState } from 'react';

const Dashboard = () => {
    const [visible, setVisible] = useState(false);

    const toggleDashboard = () => {
        setVisible(!visible);
    };

    return (
        <>
            <div className="dashboard-icon" onClick={toggleDashboard}>
                
                <svg width="30" height="30" viewBox="0 0 24 24">
                    <path fill="#fff" d="M4 5h16v2H4zM4 11h16v2H4zM4 17h16v2H4z" />
                </svg>
            </div>

            {visible && (
                <div className="dashboard bg-primary text-white p-3">
                    <h4>Dashboard</h4>
                    <ul>
                        <li>Sección 1</li>
                        <li>Sección 2</li>
                        <li>Sección 3</li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default Dashboard;
