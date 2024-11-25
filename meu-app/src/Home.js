import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getDados } from './services/api';
import { AuthContext } from './AuthContext';

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

  const handleLogout = () => {
    logout();
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
