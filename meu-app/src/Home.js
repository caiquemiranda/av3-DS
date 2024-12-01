import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { listarReceitas } from "./services/api";
import { AuthContext } from "./AuthContext";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function Home() {
  const [receitas, setReceitas] = useState([]);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    listarReceitas()
      .then((data) => setReceitas(data))
      .catch((error) => {
        alert(error.message);
        logout();
        navigate("/");
      });
  }, [logout, navigate]);

  return (
    <Box sx={{ marginTop: 4, marginLeft: 2, marginRight: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        Página Home
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/novo-item")}
        >
          Adicionar Nova Receita
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="tabela de receitas">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Autor</TableCell>
              <TableCell align="center">Título</TableCell>
              <TableCell align="center">Descrição</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receitas.map((receita) => (
              <TableRow
                key={receita.id}
                hover
                onClick={() => navigate(`/item/${receita.id}`)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell align="center">{receita.id}</TableCell>
                <TableCell align="center">{receita.autor}</TableCell>
                <TableCell align="center">{receita.titulo}</TableCell>
                <TableCell align="center">{receita.descricao}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Home;
