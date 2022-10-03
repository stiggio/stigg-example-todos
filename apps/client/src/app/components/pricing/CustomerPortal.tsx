import { Card, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { PaywallDialog } from '../paywall/PaywallDialog';
import { useUser } from '../../hooks/user/useUser';
import { PlanDetails } from './PlanDetails';
import { UsageBreakdown } from './UsageBreakdown';
import { Entitlement, useStiggContext } from '@stigg/react-sdk';

export function CustomerPortal() {
  const {
    state: { currentUser },
  } = useUser();
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [entitlements, setEntitlements] = useState<Entitlement[]>([]);
  const stiggCustomer = currentUser?.stiggCustomer;
  const { stigg } = useStiggContext();

  useEffect(() => {
    const getEntitlements = async () => {
      if (stigg) {
        const entitlements = await stigg.getEntitlements();
        setEntitlements(entitlements);
      }
    };

    getEntitlements();
  }, [stigg]);

  if (!stiggCustomer) {
    return null;
  }

  return (
    <Grid
      container
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <Typography variant="h6" fontSize={40} mb={1}>
          Customer portal
        </Typography>
      </Grid>
      <Grid item width="100%">
        <Card sx={{ padding: 5 }}>
          <PlanDetails
            customer={stiggCustomer}
            onManagePlan={() => {
              setIsPaywallOpen(true);
            }}
          />

          <UsageBreakdown entitlements={entitlements} />
        </Card>
      </Grid>

      <PaywallDialog
        paywallIsOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
      />
    </Grid>
  );
}
