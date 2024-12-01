import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getItemById, excluirReceita } from "./services/api";
import { AuthContext } from "./AuthContext";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function ItemDetalhe() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const receita = await getItemById(id);
        setItem(receita);
      } catch (error) {
        alert(error.message);
        navigate("/home");
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleExcluir = async () => {
    try {
      await excluirReceita(item.id, usuario.id);
      alert("Receita excluída com sucesso!");
      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  if (!item) return <div>Carregando...</div>;

  return (
    <Box sx={{ marginTop: 4, marginLeft: 2, marginRight: 2 }}>
      <Typography variant="h5">{item.titulo}</Typography>
      <Typography variant="body1" gutterBottom>
        {item.descricao}
      </Typography>
      {item.autorId === usuario.id && (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/editar-item/${item.id}`)}
            sx={{ marginRight: 2 }}
          >
            Editar Receita
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleExcluir}
          >
            Excluir Receita
          </Button>
        </>
      )}
      <Button variant="outlined" onClick={() => navigate("/home")}>
        Voltar
      </Button>
    </Box>
  );
}

export default ItemDetalhe;
