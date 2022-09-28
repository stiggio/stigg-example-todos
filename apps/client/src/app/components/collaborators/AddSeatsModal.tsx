import { LoadingButton } from '@mui/lab';
import { Modal, Button, Grid, Typography, TextField, Box } from '@mui/material';
import { useState } from 'react';

export function AddSeatsModal({
  open,
  onClose,
  onAddCollaboratorSeats,
  seatPrice,
}: {
  open: boolean;
  onClose: () => void;
  onAddCollaboratorSeats: (additionalSeats: number) => Promise<void>;
  seatPrice: number;
}) {
  const [seats, setSeats] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const onAdd = async (additionalSeats: number) => {
    setIsLoading(true);
    await onAddCollaboratorSeats(additionalSeats);
    setIsLoading(false);
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
            Add seats
          </Typography>
          <Grid item container alignItems="center">
            <TextField
              type="number"
              value={seats}
              onChange={(e) => setSeats(parseInt(e.target.value))}
              sx={{ width: 200 }}
              size="small"
            />
            <Typography variant="body1" ml={2} color="text.primary">
              news seats, ${seatPrice}/month each
            </Typography>
          </Grid>
          <Grid item container alignItems="center" mt={4}>
            <Button variant="contained" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <LoadingButton
              loading={isLoading}
              sx={{ color: 'white', marginLeft: 1 }}
              variant="contained"
              onClick={() => onAdd(seats)}
            >
              Add seats
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
