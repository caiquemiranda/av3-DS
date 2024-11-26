import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Registrar from './Registrar';
import Home from './Home';
import PrivateRoute from './PrivateRoute';
import ItemDetalhe from './ItemDetalhe';
import NovoItem from './NovoItem';
import EditarItem from './EditarItem';
import { AuthProvider, AuthContext } from './AuthContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <div>
            <AuthContext.Consumer>
              {({ usuario, logout }) => (
                <AppBar position="static">
                  <Toolbar>
                    {usuario ? (
                      <>
                        <Button color="inherit" onClick={logout}>
                          Sair
                        </Button>
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ flexGrow: 1, textAlign: 'center' }}
                        >
                          Olá, {usuario.nome}
                        </Typography>
                      </>
                    ) : (
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, textAlign: 'center' }}
                      >
                        Meu Aplicativo de Receitas
                      </Typography>
                    )}
                  </Toolbar>
                </AppBar>
              )}
            </AuthContext.Consumer>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/registrar" element={<Registrar />} />
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
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
