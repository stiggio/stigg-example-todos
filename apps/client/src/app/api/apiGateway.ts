import { BillingPeriod } from '@stigg/react-sdk';
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

export async function updateTodo(todoId: string, todo: Partial<Todo>) {
  const res = await axios.put(`/api/todos/${todoId}`, {
    ...todo,
  });

  return res.data;
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

export async function getUser(email: string) {
  return axios.get(`/api/users/${email}`);
}

export async function addCollaborator(email: string) {
  return axios.post('/api/collaborators', {
    collaborator: email,
  });
}

export async function removeCollaborator(email: string) {
  return axios.delete(`/api/collaborators/${email}`);
}

export async function addSeats(additionalSeats: number) {
  return axios.post('api/collaborators/add-seats', {
    additionalSeats,
  });
}

export async function provisionSubscription({
  customerId,
  planId,
  billingPeriod,
  unitQuantity,
  cancelUrl,
  successUrl,
}: {
  customerId: string;
  planId: string;
  billingPeriod: BillingPeriod;
  cancelUrl: string;
  successUrl: string;
  unitQuantity?: number;
}) {
  return axios.post('api/users/provisionSubscription', {
    customerId,
    planId,
    billingPeriod,
    unitQuantity,
    successUrl,
    cancelUrl,
  });
}
