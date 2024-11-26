let usuarios = [
  { id: 1, nome: 'João', email: 'joao@email.com', senha: '123456' },
  { id: 2, nome: 'Maria', email: 'maria@email.com', senha: '123456' },
];

let receitas = [
  { id: 1, criadorId: 1, criador: 'João', receita: 'Bolo de Chocolate' },
  { id: 2, criadorId: 2, criador: 'Maria', receita: 'Torta de Limão' },
  { id: 3, criadorId: 1, criador: 'João', receita: 'Pão de Queijo' },
];

const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

/*
const getAuthenticatedUser = () => {
  const userJson = localStorage.getItem('user');
  return userJson ? JSON.parse(userJson) : null;
};
*/

export const registrarUsuario = (nome, email, senha) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const usuarioExistente = usuarios.find((u) => u.email === email);
      if (usuarioExistente) {
        reject('Email já está em uso.');
      } else {
        const novoUsuario = {
          id: usuarios.length + 1,
          nome,
          email,
          senha,
        };
        usuarios.push(novoUsuario);
        resolve(novoUsuario);
      }
    }, 500);
  });
};

export const loginUsuario = (email, senha) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const usuario = usuarios.find((u) => u.email === email && u.senha === senha);
      if (usuario) {
        localStorage.setItem('token', 'meuTokenSecreto');
        localStorage.setItem('user', JSON.stringify(usuario));
        resolve(usuario);
      } else {
        reject('Credenciais inválidas.');
      }
    }, 500);
  });
};

export const logoutUsuario = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getDados = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isAuthenticated()) {
        resolve(receitas);
      } else {
        reject('Unauthorized');
      }
    }, 500);
  });
};

export const getItemById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isAuthenticated()) {
        const receita = receitas.find((r) => r.id === parseInt(id));
        resolve(receita);
      } else {
        reject('Unauthorized');
      }
    }, 500);
  });
};

export const adicionarItem = (criadorId, criador, receita) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isAuthenticated()) {
        const novaReceita = {
          id: receitas.length + 1,
          criadorId,
          criador,
          receita,
        };
        receitas.push(novaReceita);
        resolve(novaReceita);
      } else {
        reject('Unauthorized');
      }
    }, 500);
  });
};

export const atualizarItem = (id, criadorId, criador, receita) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isAuthenticated()) {
        const index = receitas.findIndex((r) => r.id === parseInt(id));
        if (index !== -1) {
          if (receitas[index].criadorId !== criadorId) {
            reject('Você não tem permissão para editar esta receita.');
          } else {
            receitas[index].criador = criador;
            receitas[index].receita = receita;
            resolve(receitas[index]);
          }
        } else {
          resolve(null);
        }
      } else {
        reject('Unauthorized');
      }
    }, 500);
  });
};

export const deletarItem = (id, criadorId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isAuthenticated()) {
        const index = receitas.findIndex((r) => r.id === parseInt(id));
        if (index !== -1) {
          if (receitas[index].criadorId !== criadorId) {
            reject('Você não tem permissão para excluir esta receita.');
          } else {
            receitas.splice(index, 1);
            resolve(true);
          }
        } else {
          resolve(null);
        }
      } else {
        reject('Unauthorized');
      }
    }, 500);
  });
};
