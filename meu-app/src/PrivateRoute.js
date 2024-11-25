import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const autenticado = localStorage.getItem('autenticado');

  return autenticado ? children : <Navigate to="/" />;
}

export default PrivateRoute;
