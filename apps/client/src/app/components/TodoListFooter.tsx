import { Grid, Typography } from '@mui/material';
import Confetti from 'react-dom-confetti';
import styled from 'styled-components';
import { Todo } from '../types';

const StyledConfetti = styled(Confetti)`
  left: 250px;
`;

export function TodoListFooter({ todos }: { todos: Todo[] }) {
  const uncompletedTodos = todos.filter((todo) => !todo.completed);
  const allTodosCompleted = todos.length > 0 && uncompletedTodos.length === 0;

  return (
    <Grid item py={2} px={3}>
      <Typography color="text.primary" variant="body1">
        {!todos.length
          ? null
          : !uncompletedTodos.length
          ? 'All done, great job! 🎉'
          : `${uncompletedTodos.length} item${
              uncompletedTodos.length > 1 ? 's' : ''
            } left`}
      </Typography>
      <StyledConfetti active={allTodosCompleted} />
    </Grid>
  );
}
