import { LoadingButton } from '@mui/lab';
import { Modal, Button, Grid, Typography, TextField, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Todo } from '../../types';

export function UpdateTodoModal({
  todo,
  open,
  onClose,
  onSave,
}: {
  todo: Todo | null;
  open: boolean;
  onClose: () => void;
  onSave: (label: string) => Promise<void>;
}) {
  const [label, setLabel] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSaveClick = async (label: string) => {
    setIsLoading(true);
    await onSave(label);
    setIsLoading(false);
    onClose();
  };

  useEffect(() => {
    if (todo) {
      setLabel(todo.label);
    }
  }, [todo]);

  if (!todo) {
    return null;
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'white',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Grid container flexDirection="column">
          <Typography variant="body1" mb={3}>
            Update todo
          </Typography>
          <Grid item container alignItems="center">
            <TextField
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              sx={{ width: 200 }}
              size="small"
            />
          </Grid>
          <Grid item container alignItems="center" mt={4}>
            <Button variant="contained" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <LoadingButton
              loading={isLoading}
              sx={{ color: 'white', marginLeft: 1 }}
              variant="contained"
              onClick={() => onSaveClick(label)}
            >
              Save changes
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
