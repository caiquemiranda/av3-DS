import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function PrivateRoute({ children }) {
  const { usuario } = useContext(AuthContext);

  return usuario ? children : <Navigate to="/" />;
}

export default PrivateRoute;
