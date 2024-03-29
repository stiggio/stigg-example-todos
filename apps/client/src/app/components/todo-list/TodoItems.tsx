import { Grid, Typography, CircularProgress } from '@mui/material';
import { Todo } from '../../types';
import { TodoItem } from './TodoItem';

function EmptyTodosList() {
  return (
    <Grid
      item
      container
      alignItems="center"
      justifyContent="center"
      height="100%"
      width="100%"
      flex={1}
    >
      <Typography textAlign="center" color="text.primary" variant="body1">
        Your todo list is empty
      </Typography>
    </Grid>
  );
}

export function TodoItems({
  todos,
  isLoading,
  onToggleTodo,
  onUpdateTodo,
  onRemoveTodo,
  removedTodo,
  canUpdateTodo,
  onUpgrade,
}: {
  todos: Todo[];
  isLoading: boolean;
  removedTodo: string | null;
  onToggleTodo: (todoId: string, completed: boolean) => void;
  onRemoveTodo: (todoId: string) => void;
  onUpdateTodo: (todo: Todo) => void;
  canUpdateTodo?: boolean;
  onUpgrade: () => void;
}) {
  return (
    <Grid
      item
      container
      flexDirection="column"
      minHeight={300}
      maxHeight={300}
      overflow="auto"
      flexWrap="nowrap"
    >
      {isLoading ? (
        <Grid container alignItems="center" justifyContent="center" flex={1}>
          <CircularProgress />
        </Grid>
      ) : todos.length === 0 ? (
        <EmptyTodosList />
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleTodo={onToggleTodo}
            onUpdateTodo={onUpdateTodo}
            onRemoveTodo={onRemoveTodo}
            removedTodo={removedTodo}
            canUpdateTodo={canUpdateTodo}
            onUpgrade={onUpgrade}
          />
        ))
      )}
    </Grid>
  );
}
