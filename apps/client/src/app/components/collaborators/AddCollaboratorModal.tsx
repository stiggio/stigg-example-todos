import LoadingButton from '@mui/lab/LoadingButton';
import { Modal, Button, Grid, Typography, TextField, Box } from '@mui/material';
import { useState } from 'react';

export function AddCollaboratorModal({
  open,
  onClose,
  onAddCollaborator,
}: {
  open: boolean;
  onClose: () => void;
  onAddCollaborator: (collaboratorEmail: string) => Promise<void>;
}) {
  const [collaboratorEmail, setCollaboratorEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const onAdd = async () => {
    setIsLoading(true);
    await onAddCollaborator(collaboratorEmail);
    setIsLoading(false);
    setCollaboratorEmail('');
    onClose();
  };

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
            Add collaborator
          </Typography>
          <Grid item container alignItems="center">
            <TextField
              type="email"
              label="email"
              value={collaboratorEmail}
              onChange={(e) => setCollaboratorEmail(e.target.value)}
              sx={{ width: 200 }}
              size="small"
            />
          </Grid>
          <Grid item container alignItems="center" mt={4}>
            <Button variant="contained" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <LoadingButton
              onClick={onAdd}
              loading={isLoading}
              sx={{ color: 'white', marginLeft: 1 }}
              variant="contained"
            >
              Add
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
