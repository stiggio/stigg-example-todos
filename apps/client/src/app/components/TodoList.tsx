import { Grid } from '@mui/material';
import { useEffect } from 'react';
import {
  useTodos,
  fetchTodos,
  addTodo,
  removeTodo,
  toggleTodo,
} from '../hooks/useTodos';
import { TodoItems } from './TodoItems';
import { TodoListFooter } from './TodoListFooter';
import { TodoListHeader } from './TodoListHeader';
import { StyledCard } from './TodosCard';

export function TodoList() {
  const { todos, isLoading, dispatch } = useTodos();

  useEffect(() => {
    fetchTodos(dispatch);
  }, [dispatch]);

  const onAddTodo = (todoLabel: string) => {
    addTodo(dispatch, { todoLabel });
  };

  const onToggleTodo = (todoId: string, completed: boolean) => {
    toggleTodo(dispatch, { todoId, completed });
  };

  const onRemoveTodo = (todoId: string) => {
    removeTodo(dispatch, { todoId });
  };

  return (
    <Grid
      position="relative"
      container
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt={6}
    >
      <Grid item>
        <StyledCard elevation={8}>
          <Grid container flexDirection="column">
            <TodoListHeader onAddTodo={onAddTodo} />
            <TodoItems
              isLoading={isLoading}
              todos={todos}
              onToggleTodo={onToggleTodo}
              onRemoveTodo={onRemoveTodo}
            />
            <TodoListFooter todos={todos} />
          </Grid>
        </StyledCard>
      </Grid>
    </Grid>
  );
}
