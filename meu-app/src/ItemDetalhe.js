import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemById, deletarItem } from './services/api';
import { AuthContext } from './AuthContext';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function ItemDetalhe() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();
  const { usuario, logout } = useContext(AuthContext);

  useEffect(() => {
    getItemById(id)
      .then((data) => {
        if (data) {
          setItem(data);
        } else {
          alert('Receita não encontrada!');
          navigate('/home');
        }
      })
      .catch((error) => {
        if (error === 'Unauthorized') {
          alert('Acesso não autorizado!');
          logout();
          navigate('/');
        } else {
          alert(error);
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

  const handleDeletar = () => {
    deletarItem(item.id, usuario.id)
      .then(() => {
        alert('Receita deletada com sucesso!');
        navigate('/home');
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Box sx={{ marginTop: 4, marginLeft: 2, marginRight: 2 }}>
      <Typography variant="h4" gutterBottom>
        Detalhes da Receita
      </Typography>
      <Typography variant="body1">
        <strong>ID:</strong> {item.id}
      </Typography>
      <Typography variant="body1">
        <strong>Criador:</strong> {item.criador}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Receita:</strong> {item.receita}
      </Typography>
      {item.criadorId === usuario.id && (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditar}
            sx={{ marginRight: 2 }}
          >
            Editar Receita
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDeletar}
            sx={{ marginRight: 2 }}
          >
            Deletar Receita
          </Button>
        </>
      )}
      <Button variant="outlined" onClick={handleVoltar}>
        Voltar
      </Button>
    </Box>
  );
}

export default ItemDetalhe;
