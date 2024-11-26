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
  const [receita, setReceita] = useState('');
  const navigate = useNavigate();
  const { usuario, logout } = useContext(AuthContext);

  useEffect(() => {
    getItemById(id)
      .then((data) => {
        if (data) {
          if (data.criadorId !== usuario.id) {
            alert('Você não tem permissão para editar esta receita.');
            navigate('/home');
          } else {
            setReceita(data.receita);
          }
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
  }, [id, navigate, logout, usuario.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (receita.trim() === '') {
      alert('O campo Receita é obrigatório.');
      return;
    }
    atualizarItem(id, usuario.id, usuario.nome, receita)
      .then(() => {
        alert('Receita atualizada com sucesso!');
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
        Editar Receita
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
