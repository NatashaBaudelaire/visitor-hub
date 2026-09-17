import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/user-context';

function ProtectedRoute({ children }) {
  const { userData } = useUser();
  const isAuthenticated = Boolean(userData?.email?.trim());

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;