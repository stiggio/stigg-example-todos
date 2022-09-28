import { Button, CircularProgress, Grid, Typography } from '@mui/material';

export function SuccessfulPlanProvision({
  waitingForCheckoutConfirmation,
}: {
  waitingForCheckoutConfirmation: boolean;
}) {
  return (
    <Grid
      container
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt={25}
    >
      <Grid item sx={{ position: 'relative' }}>
        {waitingForCheckoutConfirmation ? (
          <Typography variant="body1" color="text.primary" fontSize={30}>
            Provisioning your subscription...
          </Typography>
        ) : (
          <Typography variant="body1" color="text.primary" fontSize={30}>
            Subscription provisioned successfully!{' '}
            <span role="img" aria-label="successful-provision">
              🎉
            </span>
          </Typography>
        )}
      </Grid>
      <Grid item mt={6}>
        {waitingForCheckoutConfirmation ? (
          <CircularProgress />
        ) : (
          <Button
            sx={{ color: 'white' }}
            variant="contained"
            onClick={() => {
              window.location.href = window.location.pathname;
            }}
          >
            Continue
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
