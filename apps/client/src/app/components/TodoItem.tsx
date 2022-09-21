import { Checkbox, Grid, IconButton, styled, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Todo } from '../types';

const TodoLabel = styled(Typography)<{ $done: boolean }>`
  transition: all 0.4s;
  text-decoration: ${({ $done }) => ($done ? 'line-through' : 'initial')};
  color: ${({ $done, theme }) =>
    $done ? '#d9d9d9' : theme.palette.text.primary};
  font-size: 22px;
`;

const TodoCheckbox = styled(Checkbox)`
  border-radius: 50%;
`;

export function TodoItem({
  todo,
  onToggleTodo,
  onRemoveTodo,
}: {
  todo: Todo;
  onToggleTodo: (todoId: string, completed: boolean) => void;
  onRemoveTodo: (todoId: string) => void;
}) {
  return (
    <Grid
      container
      item
      p={1}
      alignItems="center"
      justifyContent="space-between"
      sx={{ borderBottom: '1px solid #ededed' }}
      width="auto"
    >
      <Grid item container alignItems="center" width="auto">
        <TodoCheckbox
          checked={todo.completed}
          onClick={() => onToggleTodo(todo.id, !todo.completed)}
        />
        <TodoLabel $done={todo.completed} variant="body1">
          {todo.label}
        </TodoLabel>
      </Grid>
      <Grid item>
        <IconButton onClick={() => onRemoveTodo(todo.id)}>
          <Delete color="disabled" />
        </IconButton>
      </Grid>
    </Grid>
  );
}
