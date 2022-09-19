import { Grid } from '@mui/material';
import { TodosActionType, useTodos } from '../hooks/useTodos';
import { TodoItems } from './TodoItems';
import { TodoListFooter } from './TodoListFooter';
import { TodoListHeader } from './TodoListHeader';
import { StyledCard } from './TodosCard';

export function TodoList() {
  const { todos, dispatch } = useTodos();

  const onAddTodo = (label: string) => {
    dispatch({ type: TodosActionType.ADD_TODO, payload: { label } });
  };

  const onToggleTodo = (todoId: string) => {
    dispatch({ type: TodosActionType.TOGGLE_TODO, payload: { id: todoId } });
  };

  const onRemoveTodo = (todoId: string) => {
    dispatch({ type: TodosActionType.REMOVE_TODO, payload: { id: todoId } });
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
