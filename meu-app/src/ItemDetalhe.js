import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemById } from './services/api';
import { AuthContext } from './AuthContext';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function ItemDetalhe() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    getItemById(id)
      .then((data) => {
        if (data) {
          setItem(data);
        } else {
          alert('Item não encontrado!');
          navigate('/home');
        }
      })
      .catch((error) => {
        if (error === 'Unauthorized') {
          alert('Acesso não autorizado!');
          logout();
          navigate('/');
        }
      });
  }, [id, navigate, logout]);

  if (!item) {
    return <div>Carregando...</div>;
  }

  const handleVoltar = () => {
    navigate('/home');
  };

  const handleEditar = () => {
    navigate(`/editar-item/${item.id}`);
  };

  return (
    <Box sx={{ marginTop: 4, marginLeft: 2, marginRight: 2 }}>
      <Typography variant="h4" gutterBottom>
        Detalhes do Item
      </Typography>
      <Typography variant="body1">
        <strong>ID:</strong> {item.id}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Nome:</strong> {item.nome}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleEditar}
        sx={{ marginRight: 2 }}
      >
        Editar Item
      </Button>
      <Button variant="outlined" onClick={handleVoltar}>
        Voltar
      </Button>
    </Box>
  );
}

export default ItemDetalhe;
