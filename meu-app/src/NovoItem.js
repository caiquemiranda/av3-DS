import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { adicionarItem } from './services/api';
import { AuthContext } from './AuthContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function NovoItem() {
  const [nome, setNome] = useState('');
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nome.trim() === '') {
      alert('O nome do item não pode ser vazio.');
      return;
    }
    adicionarItem(nome)
      .then(() => {
        alert('Item adicionado com sucesso!');
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
        Adicionar Novo Item
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
          Adicionar
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

export default NovoItem;
