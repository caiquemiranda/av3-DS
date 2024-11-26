import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registrarUsuario } from './services/api';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Registrar() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nome.trim() === '' || email.trim() === '' || senha.trim() === '') {
      alert('Todos os campos são obrigatórios.');
      return;
    }
    registrarUsuario(nome, email, senha)
      .then(() => {
        alert('Usuário registrado com sucesso! Você pode fazer login agora.');
        navigate('/');
      })
      .catch((error) => {
        alert(error);
      });
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
        Registrar
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '300px' }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Registrar
        </Button>
      </Box>
    </Box>
  );
}

export default Registrar;
