import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getItemById } from './services/api';

function ItemDetalhe() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getItemById(id).then((data) => {
      if (data) {
        setItem(data);
      } else {
        alert('Item não encontrado!');
        navigate('/home');
      }
    });
  }, [id, navigate]);

  if (!item) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>Detalhes do Item</h2>
      <p>ID: {item.id}</p>
      <p>Nome: {item.nome}</p>
      <button onClick={() => navigate('/home')}>Voltar</button>
      <Link to={`/editar-item/${item.id}`}>
        <button>Editar Item</button>
      </Link>
    </div>
  );
}

export default ItemDetalhe;
