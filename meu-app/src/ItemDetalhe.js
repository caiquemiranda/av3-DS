import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getItemById } from './services/api';
import { AuthContext } from './AuthContext';

function ItemDetalhe() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    getItemById(id)
      .then((data) => {
        if (data) {
          setItem(data);
        } else {
          alert('Item não encontrado!');
          navigate('/home');
        }
      })
      .catch((error) => {
        if (error === 'Unauthorized') {
          alert('Acesso não autorizado!');
          logout();
          navigate('/');
        }
      });
  }, [id, navigate, logout]);

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
