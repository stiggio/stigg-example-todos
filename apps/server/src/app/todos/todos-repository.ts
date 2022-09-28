import { Todo } from '@prisma/client';
import prismaClient from '../prismaClient';

export async function addTodo(
  userEmail: string,
  todoLabel: string
): Promise<Todo> {
  const todo = await prismaClient.todo.create({
    data: {
      label: todoLabel,
      completed: false,
      author: {
        connect: {
          email: userEmail,
        },
      },
    },
  });

  return todo;
}

export async function removeTodo(todoId: number): Promise<void> {
  await prismaClient.todo.delete({
    where: {
      id: todoId,
    },
  });
}

export async function updateTodo(todoId, todo: Partial<Todo>) {
  const updatedTodo = await prismaClient.todo.update({
    where: {
      id: todoId,
    },
    data: {
      ...todo,
    },
  });

  return updatedTodo;
}

export async function toggleTodo(
  todoId: number,
  completed: boolean
): Promise<Todo> {
  const todo = await prismaClient.todo.update({
    where: {
      id: todoId,
    },
    data: {
      completed,
    },
  });

  return todo;
}

export async function getTodos(userEmail: string): Promise<Todo[]> {
  const todos = await prismaClient.todo.findMany({
    where: {
      author: {
        email: userEmail,
      },
    },
  });

  return todos;
}
