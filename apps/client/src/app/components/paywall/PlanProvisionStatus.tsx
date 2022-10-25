import React from 'react';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import { ProvisionStatus } from '@stigg/react-sdk';

function ProvisionInProgress() {
  return (
    <>
      <Grid item>
        <Typography variant="body1" color="text.primary" fontSize={30}>
          Provisioning your subscription...
        </Typography>
      </Grid>
      <Grid item mt={6}>
        <CircularProgress />
      </Grid>
    </>
  );
}

function ProvisionSucceeded() {
  return (
    <>
      <Grid item sx={{ position: 'relative' }}>
        <Typography variant="body1" color="text.primary" fontSize={30}>
          Subscription provisioned successfully!{' '}
          <span role="img" aria-label="successful-provision">
            🎉
          </span>
        </Typography>
      </Grid>
      <Grid item mt={6}>
        <Button
          sx={{ color: 'white' }}
          variant="contained"
          onClick={() => {
            window.location.href = window.location.pathname;
          }}
        >
          Continue
        </Button>
      </Grid>
    </>
  );
}

function ProvisionFailed() {
  return (
    <>
      <Grid item sx={{ position: 'relative' }}>
        <Typography variant="body1" color="text.primary" fontSize={30}>
          Subscription provisioned failed{' '}
        </Typography>
      </Grid>
      <Grid item mt={6}>
        <Button
          sx={{ color: 'white' }}
          variant="contained"
          onClick={() => {
            window.location.href = window.location.pathname;
          }}
        >
          Continue
        </Button>
      </Grid>
    </>
  );
}

const renderProvisionStatusComponent = (provisionStatus: ProvisionStatus) => {
  const mapper = {
    [ProvisionStatus.IN_PROGRESS]: ProvisionInProgress,
    [ProvisionStatus.SUCCEEDED]: ProvisionSucceeded,
    [ProvisionStatus.FAILED]: ProvisionFailed,
  };
  return mapper[provisionStatus];
};

export function PlanProvisionStatus({
  provisionStatus,
}: {
  provisionStatus: ProvisionStatus;
}) {
  return (
    <Grid
      container
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt={25}
    >
      {React.createElement(renderProvisionStatusComponent(provisionStatus))}
    </Grid>
  );
}
