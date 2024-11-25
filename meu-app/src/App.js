import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import PrivateRoute from './PrivateRoute';
import ItemDetalhe from './ItemDetalhe';
import NovoItem from './NovoItem';
import EditarItem from './EditarItem';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <h1>Bem-vindo ao Meu Aplicativo React</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Login</Link>
              </li>
              <li>
                <Link to="/home">Home</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/item/:id"
              element={
                <PrivateRoute>
                  <ItemDetalhe />
                </PrivateRoute>
              }
            />
            <Route
              path="/novo-item"
              element={
                <PrivateRoute>
                  <NovoItem />
                </PrivateRoute>
              }
            />
            <Route
              path="/editar-item/:id"
              element={
                <PrivateRoute>
                  <EditarItem />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;