import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getDados } from './services/api';

function Home() {
  const [itens, setItens] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getDados().then((data) => {
      setItens(data);
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('autenticado');
    navigate('/');
  };

  return (
    <div>
      <h2>Página Home</h2>
      <button onClick={handleLogout}>Sair</button>
      <h3>Lista de Itens</h3>
      <Link to="/novo-item">
        <button>Adicionar Novo Item</button>
      </Link>
      <ul>
        {itens.map((item) => (
          <li key={item.id}>
            <Link to={`/item/${item.id}`}>{item.nome}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
