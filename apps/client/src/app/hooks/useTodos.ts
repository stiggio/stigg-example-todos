import { useImmerReducer } from 'use-immer';
import { guid } from '../components/utils';
import { Todo } from '../types';

export const newTodo = (label: string): Todo => ({
  completed: false,
  id: guid(),
  label: (label || '').trim(),
});

export type TodosState = {
  todos: Todo[];
};

export const initialState: TodosState = { todos: [] };

export enum TodosActionType {
  ADD_TODO = 'ADD_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
  TOGGLE_TODO = 'TOGGLE_TODO',
}

type AddTodoAction = {
  type: TodosActionType.ADD_TODO;
  payload: {
    label: string;
  };
};

type ToggleTodoAction = {
  type: TodosActionType.TOGGLE_TODO;
  payload: {
    id: string;
  };
};

type RemoveTodoAction = {
  type: TodosActionType.REMOVE_TODO;
  payload: {
    id: string;
  };
};

export type TodosAction = AddTodoAction | RemoveTodoAction | ToggleTodoAction;

function reducer(state: TodosState, action: TodosAction) {
  switch (action.type) {
    case TodosActionType.ADD_TODO:
      state.todos.push(newTodo(action.payload.label));
      break;
    case TodosActionType.REMOVE_TODO:
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
      break;
    case TodosActionType.TOGGLE_TODO: {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
      break;
    }
    default:
      throw new Error('Not supported action type');
  }
}

export function useTodos() {
  const [state, dispatch] = useImmerReducer<TodosState, TodosAction>(
    reducer,
    initialState
  );

  return {
    todos: state.todos,
    dispatch,
  };
}
