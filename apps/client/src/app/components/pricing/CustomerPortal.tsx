import { Grid } from '@mui/material';
import { useState } from 'react';
import { PaywallDialog } from '../paywall/PaywallDialog';
import { CustomerPortal as StiggCustomerPortal } from '@stigg/react-sdk';
import { Paywall } from '../paywall/StiggPaywall';

export function CustomerPortal() {
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);

  return (
    <Grid
      container
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      my={3}
    >
      <StiggCustomerPortal paywallComponent={<Paywall />} />

      <PaywallDialog
        paywallIsOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
      />
    </Grid>
  );
}
