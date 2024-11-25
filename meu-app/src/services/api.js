// dados iniciais
let dados = [
  { id: 1, nome: 'Item 1' },
  { id: 2, nome: 'Item 2' },
  { id: 3, nome: 'Item 3' },
];


export const getDados = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dados);
    }, 500); 
  });
};


export const getItemById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const item = dados.find((d) => d.id === parseInt(id));
      resolve(item);
    }, 500); 
  });
};

export const adicionarItem = (nome) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const novoItem = {
        id: dados.length + 1,
        nome: nome,
      };
      dados.push(novoItem);
      resolve(novoItem);
    }, 500); 
  });
};

export const atualizarItem = (id, nome) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = dados.findIndex((d) => d.id === parseInt(id));
      if (index !== -1) {
        dados[index].nome = nome;
        resolve(dados[index]);
      } else {
        resolve(null);
      }
    }, 500); 
  });
};
