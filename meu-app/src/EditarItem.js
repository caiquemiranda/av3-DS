import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getItemById, atualizarReceita } from "./services/api";
import { AuthContext } from "./AuthContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function EditarItem() {
  const { id } = useParams();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const receita = await getItemById(id);
        if (receita.autorId !== usuario.id) {
          alert("Você não tem permissão para editar esta receita.");
          navigate("/home");
        } else {
          setTitulo(receita.titulo);
          setDescricao(receita.descricao);
        }
      } catch (error) {
        alert(error.message);
        navigate("/home");
      }
    };
    fetchData();
  }, [id, navigate, usuario.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await atualizarReceita(id, usuario.id, titulo, descricao);
      alert("Receita atualizada com sucesso!");
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
        Editar Receita
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
          Salvar
        </Button>
      </Box>
    </Box>
  );
}

export default EditarItem;
