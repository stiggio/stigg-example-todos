import { ChevronRight, Block } from '@mui/icons-material';
import { CircularProgress, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';

const TodoTextField = styled(TextField)`
  width: 100%;

  input {
    margin: 0;
    padding: 0;
    height: 100%;
    font-size: 24px;
    color: #0000008a;
    font-weight: 200;

    &::placeholder {
      color: #99a5c4;
      font-size: 24px;
    }
  }
`;

export function TodoListHeader({
  onAddTodo,
  canAddTodo,
  isAdding,
}: {
  onAddTodo: (label: string) => Promise<void>;
  canAddTodo?: boolean;
  isAdding: boolean;
}) {
  const [text, setText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const onKeyDown = async (event: { key: string }) => {
    if (event.key === 'Enter') {
      await onAddTodo(text);
      setText('');
    }
  };

  return (
    <Grid
      item
      padding={2}
      sx={{ boxShadow: 'inset 0 -2px 1px rgb(0 0 0 / 10%)' }}
    >
      <TodoTextField
        autoFocus
        disabled={!canAddTodo || isAdding}
        value={text}
        onChange={handleChange}
        variant="standard"
        placeholder="What needs to be done?"
        onKeyDown={onKeyDown}
        InputProps={{
          disableUnderline: true,
          startAdornment: canAddTodo ? (
            <ChevronRight color="disabled" fontSize="large" />
          ) : (
            <Block color="disabled" fontSize="large" sx={{ marginRight: 1 }} />
          ),
          endAdornment: isAdding ? <CircularProgress size={28} /> : null,
        }}
      />
    </Grid>
  );
}
