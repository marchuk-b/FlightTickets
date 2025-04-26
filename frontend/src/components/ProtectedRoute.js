import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../api/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // або можна поставити спіннер або просто `null`
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
