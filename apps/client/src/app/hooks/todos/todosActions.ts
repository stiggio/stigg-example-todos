import { Todo } from '../../types';

export enum TodosActionType {
  TODO_ADDED = 'TODO_ADDED',
  TODO_DELETED = 'TODO_DELETED',
  TODO_UPDATED = 'TODO_UPDATED',
  FETCH_TODOS_COMPLETED = 'FETCH_TODOS_COMPLETED',
  FETCH_TODOS_STARTED = 'FETCH_TODOS_STARTED',
}

type TodoAddedAction = {
  type: TodosActionType.TODO_ADDED;
  payload: {
    newTodo: Todo;
  };
};

type TodoUpdatedAction = {
  type: TodosActionType.TODO_UPDATED;
  payload: {
    id: string;
    updatedTodo: Todo;
  };
};

type TodoDeletedAction = {
  type: TodosActionType.TODO_DELETED;
  payload: {
    id: string;
  };
};

type FetchTodosCompletedAction = {
  type: TodosActionType.FETCH_TODOS_COMPLETED;
  payload: {
    todos: Todo[];
  };
};

type FetchTodosStartedAction = {
  type: TodosActionType.FETCH_TODOS_STARTED;
};

export type TodosAction =
  | TodoAddedAction
  | TodoDeletedAction
  | TodoUpdatedAction
  | FetchTodosCompletedAction
  | FetchTodosStartedAction;
