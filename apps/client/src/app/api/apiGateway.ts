import axios from 'axios';
import { Todo } from '../types';

export async function fetchTodos(): Promise<{ todos: Todo[] }> {
  const todos = await axios.get('/api/todos');
  return todos.data;
}

export async function addTodo(label: string): Promise<Todo> {
  const newTodo = await axios.post('/api/todos', {
    label,
  });
  return newTodo.data;
}

export async function removeTodo(todoId: string) {
  await axios.delete(`/api/todos/${todoId}`);
}

export async function toggleTodo(todoId: string) {
  await axios.put(`/api/todos/${todoId}/toggle`);
}

export async function login(email: string, password: string) {
  return axios.post('/api/users/login', {
    email,
    password,
  });
}

export async function signup(email: string, password: string) {
  return axios.post('/api/users/signup', {
    email,
    password,
  });
}

export async function addCollaborator(email: string) {
  return axios.post('/api/users/collaborator', {
    collaborator: email,
  });
}

export async function removeCollaborator(email: string) {
  return axios.delete(`/api/users/collaborator/${email}`);
}

export async function getUser(email: string) {
  return axios.get(`/api/users/${email}`);
}
