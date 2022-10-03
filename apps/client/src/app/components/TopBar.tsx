import { AccessTime } from '@mui/icons-material';
import { Grid, Link, Typography } from '@mui/material';
import { useState } from 'react';
import { useUser } from '../hooks/user/useUser';
import { PaywallDialog } from './paywall/PaywallDialog';
import { diffInDays } from './utils';

export function TopBanner() {
  const {
    state: { currentUser },
  } = useUser();
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);

  if (!currentUser?.stiggCustomer) {
    return null;
  }

  const customer = currentUser.stiggCustomer;
  const trialSubscriptions = customer?.getActiveTrials();
  if (!trialSubscriptions?.length) {
    return null;
  }

  const trialSubscription = trialSubscriptions[0];
  const daysLeft = diffInDays(trialSubscription.trialEndDate);

  return (
    <>
      <Grid
        color={'#FFFFFF'}
        bgcolor={'#8090BC'}
        container
        height={40}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item pr={1} mt={1}>
          <AccessTime />
        </Grid>
        <Grid item mr={1}>
          <Typography
            variant="body1"
            color="text.primary"
            sx={{ fontWeight: 'bold' }}
          >{`You have ${daysLeft} days left to try the ${trialSubscription.plan.displayName} plan. `}</Typography>
        </Grid>
        <Grid item>
          <Link
            sx={{ cursor: 'pointer', color: '#FFFFFF' }}
            underline="hover"
            onClick={() => {
              setIsPaywallOpen(true);
            }}
          >
            Upgrade now
          </Link>
        </Grid>
      </Grid>

      <PaywallDialog
        paywallIsOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
      />
    </>
  );
}
