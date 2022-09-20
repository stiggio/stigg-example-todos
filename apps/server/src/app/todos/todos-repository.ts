import { guid } from '../utils';

export type Todo = {
  id: string;
  label: string;
  completed: boolean;
  userEmail: string;
};

const todos: Todo[] = [];

const newTodo = (userEmail: string, label: string): Todo => ({
  completed: false,
  id: guid(),
  label: (label || '').trim(),
  userEmail,
});

export function addTodo(userEmail: string, todoLabel: string) {
  const todo = newTodo(userEmail, todoLabel);
  todos.push(todo);
  return todo;
}

export function removeTodo(todoId: string) {
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);
  todos.splice(todoIndex, 1);
}

export function toggleTodo(todoId: string) {
  const todo = todos.find((todo) => todo.id === todoId);
  todo.completed = !todo.completed;
  return todo;
}

export function getTodos(userEmail: string) {
  return todos.filter((todo) => todo.userEmail == userEmail);
}
