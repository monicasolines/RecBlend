import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../store/appContext';

const ProtectedRoute = ({ children, roles }) => {
    const { store, actions } = useContext(Context);

    if (!actions.isAuthorized(roles)) {
        return <Navigate to="/unauthorized" />; 
    }

    return children;
};

export default ProtectedRoute;
