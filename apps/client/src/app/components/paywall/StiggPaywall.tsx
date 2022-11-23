import { Box, styled } from '@mui/material';
import {
  OnPlanSelectedCallbackFn,
  Paywall as StiggPaywall,
  PaywallLocalization,
  useStiggContext,
} from '@stigg/react-sdk';
import { DeepPartial } from '@stigg/react-sdk/dist/types';
import { provisionSubscription } from '../../hooks/user/useUser';

const PaywallBox = styled(Box)`
  .stigg-plan-description:first-of-type {
    margin-top: 30px;
  }
`;

export function Paywall({
  onPlanSelected,
  onSuccessProvision,
  textOverrides,
}: {
  onPlanSelected?: OnPlanSelectedCallbackFn;
  onSuccessProvision?: () => void;
  textOverrides?: DeepPartial<PaywallLocalization>;
}) {
  const { stigg, refreshData } = useStiggContext();
  /**
   *
   * We support here 2 different scenarios, when there is a billing integration we use the checkout flow,
   * and as a creation of a subscription without redirection to stripe
   */
  const onSubscribe: OnPlanSelectedCallbackFn = async (args) => {
    if (onPlanSelected) {
      await onPlanSelected(args);
    } else {
      const { customer, plan, selectedBillingPeriod } = args;
      const collaboratorsEntitlement = stigg.getMeteredEntitlement({
        featureId: 'feature-collaborators',
      });
      const collaboratorsUnitQuantity = collaboratorsEntitlement.currentUsage;

      if (customer?.id) {
        const checkoutResult = await provisionSubscription({
          billingPeriod: selectedBillingPeriod,
          customerId: customer.id,
          planId: plan.id,
          unitQuantity: collaboratorsUnitQuantity,
          cancelUrl: window.location.href,
          successUrl: window.location.href,
        });

        if (checkoutResult.status === 'PaymentRequired') {
          if (onSuccessProvision) {
            onSuccessProvision();
          }
        } else {
          refreshData();
        }
      }
    }
  };

  return (
    <PaywallBox>
      <StiggPaywall
        highlightedPlanId="plan-todos-essentials"
        onPlanSelected={onSubscribe}
        textOverrides={textOverrides}
      />
    </PaywallBox>
  );
}
