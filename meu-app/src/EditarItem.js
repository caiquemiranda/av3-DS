import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemById, atualizarItem } from './services/api';
import { AuthContext } from './AuthContext';

function EditarItem() {
  const { id } = useParams();
  const [nome, setNome] = useState('');
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    getItemById(id)
      .then((data) => {
        if (data) {
          setNome(data.nome);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nome.trim() === '') {
      alert('O nome do item não pode ser vazio.');
      return;
    }
    atualizarItem(id, nome)
      .then(() => {
        alert('Item atualizado com sucesso!');
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
      <h2>Editar Item</h2>
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
        <button type="submit">Salvar</button>
        <button type="button" onClick={handleCancel}>
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default EditarItem;
