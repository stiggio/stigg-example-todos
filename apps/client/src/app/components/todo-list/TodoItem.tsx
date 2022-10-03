import {
  Box,
  Checkbox,
  CircularProgress,
  Grid,
  IconButton,
  Link,
  styled,
  Typography,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Todo } from '../../types';
import { InformationTooltip } from '../Tooltip';

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
  onUpdateTodo,
  removedTodo,
  canUpdateTodo,
  onUpgrade,
}: {
  todo: Todo;
  onToggleTodo: (todoId: string, completed: boolean) => void;
  onUpdateTodo: (todo: Todo) => void;
  onRemoveTodo: (todoId: string) => void;
  removedTodo: string | null;
  canUpdateTodo?: boolean;
  onUpgrade: () => void;
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
      <Grid item container alignItems="center" wrap="nowrap" width="auto">
        <InformationTooltip
          arrow
          title={
            canUpdateTodo ? (
              ''
            ) : (
              <>
                <Typography
                  variant="body1"
                  color="text.primary"
                  fontSize={16}
                  mb={1}
                >
                  Update a todo is not allowed in your current plan.
                </Typography>
                <Link
                  variant="body1"
                  fontSize={16}
                  sx={{ cursor: 'pointer' }}
                  underline="hover"
                  onClick={onUpgrade}
                >
                  Upgrade your plan
                </Link>
              </>
            )
          }
          placement="top"
        >
          <Box
            width={32}
            height={32}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: canUpdateTodo ? 'pointer' : 'not-allowed',
            }}
          >
            <IconButton
              disabled={!canUpdateTodo}
              onClick={() => onUpdateTodo(todo)}
            >
              <Edit color="disabled" />
            </IconButton>
          </Box>
        </InformationTooltip>
        <Box
          width={32}
          height={32}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {removedTodo === todo.id ? (
            <CircularProgress size={28} sx={{ marginRight: 1 }} />
          ) : (
            <IconButton onClick={() => onRemoveTodo(todo.id)}>
              <Delete color="disabled" />
            </IconButton>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
