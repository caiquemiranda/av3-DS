import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemById, atualizarItem } from './services/api';

function EditarItem() {
  const { id } = useParams();
  const [nome, setNome] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getItemById(id).then((data) => {
      if (data) {
        setNome(data.nome);
      } else {
        alert('Item não encontrado!');
        navigate('/home');
      }
    });
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nome.trim() === '') {
      alert('O nome do item não pode ser vazio.');
      return;
    }
    atualizarItem(id, nome).then(() => {
      alert('Item atualizado com sucesso!');
      navigate('/home');
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
