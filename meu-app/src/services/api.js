let dados = [
  { id: 1, nome: 'Item 1' },
  { id: 2, nome: 'Item 2' },
  { id: 3, nome: 'Item 3' },
];

const isAuthenticated = () => {
  return localStorage.getItem('token') === 'meuTokenSecreto';
};

export const getDados = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isAuthenticated()) {
        resolve(dados);
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
        const item = dados.find((d) => d.id === parseInt(id));
        resolve(item);
      } else {
        reject('Unauthorized');
      }
    }, 500);
  });
};

export const adicionarItem = (nome) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isAuthenticated()) {
        const novoItem = {
          id: dados.length + 1,
          nome: nome,
        };
        dados.push(novoItem);
        resolve(novoItem);
      } else {
        reject('Unauthorized');
      }
    }, 500);
  });
};

export const atualizarItem = (id, nome) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isAuthenticated()) {
        const index = dados.findIndex((d) => d.id === parseInt(id));
        if (index !== -1) {
          dados[index].nome = nome;
          resolve(dados[index]);
        } else {
          resolve(null);
        }
      } else {
        reject('Unauthorized');
      }
    }, 500);
  });
};
