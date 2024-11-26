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
  const [receitas, setReceitas] = useState([]);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    getDados()
      .then((data) => {
        setReceitas(data);
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
          Adicionar Nova Receita
        </Button>
      </Box>

      {/* REceitas */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="tabela de receitas">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ width: '10%' }}>
                ID
              </TableCell>
              <TableCell align="center" style={{ width: '20%' }}>
                Criador
              </TableCell>
              <TableCell align="center" style={{ width: '70%' }}>
                Receita
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receitas.map((receita) => (
              <TableRow
                key={receita.id}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(`/item/${receita.id}`)}
              >
                <TableCell component="th" scope="row" align="center">
                  {receita.id}
                </TableCell>
                <TableCell align="center">{receita.criador}</TableCell>
                <TableCell align="center">{receita.receita}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Home;
