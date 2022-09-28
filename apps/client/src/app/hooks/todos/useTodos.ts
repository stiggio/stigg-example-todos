import React from 'react';
import { useImmerReducer } from 'use-immer';
import * as apiGateway from '../../api/apiGateway';
import { Todo } from '../../types';
import { TodosAction, TodosActionType } from './todosActions';

export type TodosState = {
  isLoading: boolean;
  todos: Todo[];
};

export const initialState: TodosState = { todos: [], isLoading: false };

export type TodosDispatch = React.Dispatch<TodosAction>;

function reducer(state: TodosState, action: TodosAction) {
  switch (action.type) {
    case TodosActionType.FETCH_TODOS_STARTED:
      state.isLoading = true;
      break;
    case TodosActionType.FETCH_TODOS_COMPLETED:
      state.todos = action.payload.todos;
      state.isLoading = false;
      break;
    case TodosActionType.TODO_ADDED:
      state.todos.push(action.payload.newTodo);
      break;
    case TodosActionType.TODO_DELETED:
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
      break;
    case TodosActionType.TODO_UPDATED: {
      const { id, updatedTodo } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = updatedTodo.completed;
        todo.label = updatedTodo.label;
      }
      break;
    }
    default:
      throw new Error('Not supported action type');
  }
}

export async function fetchTodos(dispatch: TodosDispatch) {
  dispatch({
    type: TodosActionType.FETCH_TODOS_STARTED,
  });
  const res = await apiGateway.fetchTodos();
  dispatch({
    type: TodosActionType.FETCH_TODOS_COMPLETED,
    payload: { todos: res.todos },
  });
}

export async function addTodo(
  dispatch: TodosDispatch,
  payload: { todoLabel: string }
) {
  const newTodo = await apiGateway.addTodo(payload.todoLabel);
  dispatch({
    type: TodosActionType.TODO_ADDED,
    payload: {
      newTodo,
    },
  });
}

export async function removeTodo(
  dispatch: TodosDispatch,
  payload: { todoId: string }
) {
  await apiGateway.removeTodo(payload.todoId);
  dispatch({
    type: TodosActionType.TODO_DELETED,
    payload: {
      id: payload.todoId,
    },
  });
}

export async function updateTodo(
  dispatch: TodosDispatch,
  payload: { todoId: string; completed?: boolean; label?: string }
) {
  const updatedTodo = await apiGateway.updateTodo(payload.todoId, {
    completed: payload.completed,
    label: payload.label,
  });
  dispatch({
    type: TodosActionType.TODO_UPDATED,
    payload: {
      id: payload.todoId,
      updatedTodo,
    },
  });
}

export function useTodos() {
  const [state, dispatch] = useImmerReducer<TodosState, TodosAction>(
    reducer,
    initialState
  );

  return {
    todos: state.todos,
    isLoading: state.isLoading,
    dispatch,
  };
}
