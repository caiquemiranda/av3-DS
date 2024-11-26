import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { adicionarItem } from './services/api';
import { AuthContext } from './AuthContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function NovoItem() {
  const [receita, setReceita] = useState('');
  const navigate = useNavigate();
  const { usuario, logout } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (receita.trim() === '') {
      alert('O campo Receita é obrigatório.');
      return;
    }
    adicionarItem(usuario.id, usuario.nome, receita)
      .then(() => {
        alert('Receita adicionada com sucesso!');
        navigate('/home');
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
        Adicionar Nova Receita
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '300px' }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Receita"
          value={receita}
          onChange={(e) => setReceita(e.target.value)}
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
