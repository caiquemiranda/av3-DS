import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDados } from './services/api';
import { AuthContext } from './AuthContext';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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

  return (
    <Box sx={{ marginTop: 4, marginLeft: 2, marginRight: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        Página Home
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/novo-item"
        >
          Adicionar Novo Item
        </Button>
      </Box>

      {/* Tabela de Itens */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="tabela de itens">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Nome</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itens.map((item) => (
              <TableRow
                key={item.id}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(`/item/${item.id}`)}
              >
                <TableCell component="th" scope="row" align="center">
                  {item.id}
                </TableCell>
                <TableCell align="center">{item.nome}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Home;
