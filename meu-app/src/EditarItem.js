import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemById, atualizarItem } from './services/api';
import { AuthContext } from './AuthContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function EditarItem() {
  const { id } = useParams();
  const [nome, setNome] = useState('');
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    getItemById(id)
      .then((data) => {
        if (data) {
          setNome(data.nome);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nome.trim() === '') {
      alert('O nome do item não pode ser vazio.');
      return;
    }
    atualizarItem(id, nome)
      .then(() => {
        alert('Item atualizado com sucesso!');
        navigate('/home');
      })
      .catch((error) => {
        if (error === 'Unauthorized') {
          alert('Acesso não autorizado!');
          logout();
          navigate('/');
        }
      });
  };

  const handleCancel = () => {
    navigate('/home');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 8,
      }}
    >
      <Typography component="h1" variant="h5">
        Editar Item
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '300px' }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Nome do Item"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Salvar
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleCancel}
        >
          Cancelar
        </Button>
      </Box>
    </Box>
  );
}

export default EditarItem;
