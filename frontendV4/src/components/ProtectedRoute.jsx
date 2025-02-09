// src/Components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('jwt');
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!isAuthenticated || !user || user.role !== 'admin') {
        return <Navigate to="/admin/login" replace />;
    }
    
    return children;
};

export default ProtectedRoute;