// db firebase

import { auth, db, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "../firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";

// Registrar usuário
export const registrarUsuario = async (email, senha) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
  return userCredential.user;
};

// Login de usuário
export const loginUsuario = async (email, senha) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, senha);
  return userCredential.user;
};

// Logout de usuário
export const logoutUsuario = async () => {
  await signOut(auth);
};

// Adicionar Receita
export const adicionarReceita = async (autorId, autor, titulo, descricao) => {
  const docRef = await addDoc(collection(db, "receitas"), {
    autorId,
    autor,
    titulo,
    descricao,
  });
  return { id: docRef.id, autorId, autor, titulo, descricao };
};

// Listar Receitas
export const listarReceitas = async () => {
  const querySnapshot = await getDocs(collection(db, "receitas"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Obter Receita por ID
export const getItemById = async (id) => {
  const docRef = doc(db, "receitas", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id, ...docSnap.data() };
  } else {
    throw new Error("Receita não encontrada.");
  }
};

// Atualizar Receita
export const atualizarReceita = async (id, dados) => {
  const docRef = doc(db, "receitas", id);
  await updateDoc(docRef, dados);
};

// Excluir Receita
export const excluirReceita = async (id) => {
  const docRef = doc(db, "receitas", id);
  await deleteDoc(docRef);
};
