import { Grid } from '@mui/material';
import { useState } from 'react';
import { CustomerPortal as StiggCustomerPortal, OnManageSubscriptionFn, PricingType, OnPlanSelectedCallbackFn } from '@stigg/react-sdk';
import { Paywall } from '../paywall/StiggPaywall';
import { PricingDialog } from '../pricing-dialog/PricingDialog';
import { StiggCheckout } from '../checkout/StiggCheckout';

export function CustomerPortal() {
  const [planId, setPlanId] = useState<string | null>(null);

  // customer portal props
  const onManageSubscription: OnManageSubscriptionFn = ({ customerSubscriptions }) => {
    const paidSubscription = customerSubscriptions.find(({ pricingType}) => pricingType === PricingType.Paid);
    if (paidSubscription) {
      setPlanId(paidSubscription.planId);
    } else {
      document
        .getElementsByClassName('stigg-customer-portal-paywall-section')[0]
        ?.scrollIntoView({behavior: 'smooth'});
    }
  };

  // paywall props
  const onPlanSelected: OnPlanSelectedCallbackFn = ({plan}) => setPlanId(plan.id);

  // checkout props
  const onCloseCheckout = () => setPlanId(null);

  return (
    <Grid container flexDirection="column" justifyContent="center" my={3}>
      <StiggCustomerPortal
        onManageSubscription={onManageSubscription}
        paywallComponent={<Paywall onPlanSelected={onPlanSelected}/>}
      />

      <PricingDialog open={!!planId} onClose={onCloseCheckout}>
        {planId && <StiggCheckout planId={planId} onClose={onCloseCheckout} />}
      </PricingDialog>
    </Grid>
  );
}
