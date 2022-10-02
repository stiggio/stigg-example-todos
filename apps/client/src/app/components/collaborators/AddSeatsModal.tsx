import { LoadingButton } from '@mui/lab';
import { Modal, Button, Grid, Typography, TextField, Box } from '@mui/material';
import { BillingPeriod, Subscription } from '@stigg/react-sdk';
import { useState } from 'react';

export function AddSeatsModal({
  open,
  onClose,
  onAddCollaboratorSeats,
  currentActiveSubscription,
}: {
  open: boolean;
  onClose: () => void;
  onAddCollaboratorSeats: (additionalSeats: number) => Promise<void>;
  currentActiveSubscription: Subscription;
}) {
  const [seats, setSeats] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const currentBillingPeriod = currentActiveSubscription.price?.billingPeriod;
  const price = currentActiveSubscription.plan?.pricePoints.find(
    (price) => price.billingPeriod === currentBillingPeriod
  );
  const seatPrice = price
    ? currentBillingPeriod === BillingPeriod.Annually
      ? price.amount / 12
      : price.amount
    : 0;

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
