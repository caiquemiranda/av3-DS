import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { adicionarItem } from './services/api';
import { AuthContext } from './AuthContext';

function NovoItem() {
  const [nome, setNome] = useState('');
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nome.trim() === '') {
      alert('O nome do item não pode ser vazio.');
      return;
    }
    adicionarItem(nome)
      .then(() => {
        alert('Item adicionado com sucesso!');
        navigate('/home');
      })
      .catch((error) => {
        if (error === 'Unauthorized') {
          alert('Acesso não autorizado!');
          logout();
          navigate('/');
        }
      });
  };

  const handleCancel = () => {
    navigate('/home');
  };

  return (
    <div>
      <h2>Adicionar Novo Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome do Item:</label><br />
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adicionar</button>
        <button type="button" onClick={handleCancel}>
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default NovoItem;
