// Dados simulados de usuários
let usuarios = [
  { id: 1, nome: "João", email: "joao@example.com", senha: "123456" },
  { id: 2, nome: "Maria", email: "maria@example.com", senha: "123456" },
];

// Dados simulados de receitas
let receitas = [
  {
    id: 1,
    autorId: 1,
    autor: "João",
    titulo: "Bolo de Chocolate",
    descricao: "Um bolo delicioso feito com chocolate amargo.",
  },
  {
    id: 2,
    autorId: 2,
    autor: "Maria",
    titulo: "Torta de Limão",
    descricao: "Uma torta refrescante com base crocante e recheio cremoso.",
  },
];

// Simular autenticação
const isAuthenticated = () => !!localStorage.getItem("token");

//usuário autenticado
const getAuthenticatedUser = () => {
  const userJson = localStorage.getItem("user");
  return userJson ? JSON.parse(userJson) : null;
};

//registrar um novo usuário
export const registrarUsuario = async (nome, email, senha) => {
  const usuarioExistente = usuarios.find((u) => u.email === email);
  if (usuarioExistente) {
    throw new Error("Email já está em uso.");
  }
  const novoUsuario = { id: usuarios.length + 1, nome, email, senha };
  usuarios.push(novoUsuario);
  return novoUsuario;
};

//login de usuário
export const loginUsuario = async (email, senha) => {
  const usuario = usuarios.find((u) => u.email === email && u.senha === senha);
  if (!usuario) {
    throw new Error("Credenciais inválidas.");
  }
  localStorage.setItem("token", "meuTokenSecreto");
  localStorage.setItem("user", JSON.stringify(usuario));
  return usuario;
};

// Função logout de usuário
export const logoutUsuario = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Adicionar Receit
export const adicionarReceita = async (autorId, autor, titulo, descricao) => {
  const novaReceita = {
    id: receitas.length + 1,
    autorId,
    autor,
    titulo,
    descricao,
  };
  receitas.push(novaReceita);
  return novaReceita;
};

// Atualizar
export const atualizarReceita = async (id, autorId, titulo, descricao) => {
  const index = receitas.findIndex((r) => r.id === parseInt(id));
  if (index !== -1) {
    if (receitas[index].autorId !== autorId) {
      throw new Error("Você não tem permissão para editar esta receita.");
    }
    receitas[index].titulo = titulo;
    receitas[index].descricao = descricao;
    return receitas[index];
  }
  throw new Error("Receita não encontrada.");
};

// Listar
export const listarReceitas = async () => receitas;

// Obter Receita ID
export const getItemById = async (id) => {
  const receita = receitas.find((r) => r.id === parseInt(id));
  if (!receita) throw new Error("Receita não encontrada.");
  return receita;
};

// Excluir
export const excluirReceita = async (id, autorId) => {
  const index = receitas.findIndex((r) => r.id === parseInt(id));
  if (index !== -1) {
    if (receitas[index].autorId !== autorId) {
      throw new Error("Você não tem permissão para excluir esta receita.");
    }
    receitas.splice(index, 1);
    return true;
  }
  throw new Error("Receita não encontrada.");
};
