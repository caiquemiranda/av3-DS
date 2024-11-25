import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDados } from './services/api';
import { AuthContext } from './AuthContext';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';

function Home() {
  const [itens, setItens] = useState([]);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    getDados()
      .then((data) => {
        setItens(data);
      })
      .catch((error) => {
        if (error === 'Unauthorized') {
          alert('Acesso não autorizado!');
          logout();
          navigate('/');
        }
      });
  }, [logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box sx={{ marginTop: 4, marginLeft: 2, marginRight: 2 }}>
      <Typography variant="h4" gutterBottom>
        Página Home
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Sair
      </Button>
      <Typography variant="h5" gutterBottom sx={{ marginTop: 2 }}>
        Lista de Itens
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/novo-item"
        sx={{ marginBottom: 2 }}
      >
        Adicionar Novo Item
      </Button>
      <List>
        {itens.map((item) => (
          <ListItem
            key={item.id}
            button
            component={RouterLink}
            to={`/item/${item.id}`}
          >
            <ListItemText primary={item.nome} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Home;
