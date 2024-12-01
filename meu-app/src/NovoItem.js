import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { adicionarReceita } from "./services/api";
import { AuthContext } from "./AuthContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function NovoItem() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo || !descricao) {
      alert("Todos os campos são obrigatórios.");
      return;
    }
    try {
      await adicionarReceita(usuario.id, usuario.nome, titulo, descricao);
      alert("Receita adicionada com sucesso!");
      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 8
      }}
    >
      <Typography component="h1" variant="h5">
        Adicionar Nova Receita
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 1, width: "300px" }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          label="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Descrição"
          multiline
          rows={4}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Adicionar
        </Button>
      </Box>
    </Box>
  );
}

export default NovoItem;
