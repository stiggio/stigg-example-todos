import { Box, styled } from '@mui/material';
import {
  OnPlanSelectedCallbackFn,
  Paywall as StiggPaywall,
  StiggProvider,
  PaywallLocalization,
  PricingType,
  Plan,
  Customer,
  BillingPeriod,
  SubscribeIntentionType,
  useStiggContext,
} from '@stigg/react-sdk';
import { DeepPartial } from '@stigg/react-sdk/dist/types';
import config from '../../config';
import {
  checkout,
  createSubscription,
  useUser,
} from '../../hooks/user/useUser';

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
  const {
    state: { currentUser },
  } = useUser();
  const { stigg } = useStiggContext();

  async function performCheckout(
    plan: Plan,
    customer: Customer,
    currentBillingPeriod: BillingPeriod,
    unitQuantity?: number
  ) {
    const checkoutResult = await checkout({
      customerId: customer.id,
      planId: plan.id,
      successUrl: `${window.location.href}?checkoutSuccess=1&planId=${plan.id}`,
      cancelUrl: window.location.href,
      billingPeriod: currentBillingPeriod,
      unitQuantity,
    });

    if (checkoutResult) {
      window.location.href = checkoutResult.checkoutUrl;
    }

    return checkoutResult;
  }

  /**
   * We support here 2 different scenarios, when there is a billing integration we use the checkout flow,
   * and as a fallback we call to createSubscription
   */
  const onSubscribe: OnPlanSelectedCallbackFn = async (args) => {
    if (onPlanSelected) {
      await onPlanSelected(args);
    } else {
      const { customer, plan, selectedBillingPeriod, intentionType } = args;
      const collaboratorsEntitlement = stigg.getMeteredEntitlement({
        featureId: 'feature-collaborators',
      });
      const collaboratorsUnitQuantity = collaboratorsEntitlement.currentUsage;

      if (customer?.id) {
        const shouldShowCheckout =
          !customer.hasPaymentMethod &&
          plan.pricingType !== PricingType.Free &&
          intentionType !== SubscribeIntentionType.START_TRIAL;

        let checkout = null;
        if (shouldShowCheckout) {
          checkout = await performCheckout(
            plan,
            customer,
            selectedBillingPeriod,
            collaboratorsUnitQuantity
          );
        }

        // checkout will be null in the scenario when there is no billing integration
        if (!checkout) {
          await createSubscription({
            billingPeriod: selectedBillingPeriod,
            customerId: customer.id,
            planId: plan.id,
            unitQuantity: collaboratorsUnitQuantity,
          });
          if (onSuccessProvision) {
            onSuccessProvision();
          }
        }
      }
    }
  };

  return (
    <StiggProvider
      apiKey={config.stiggApiKey}
      customerId={currentUser?.stiggCustomerId}
      theme={{
        layout: {
          planMinWidth: '330px',
          descriptionMinHeight: '60px',
          switchBottomSpacing: '20px',
        },
      }}
    >
      <PaywallBox>
        <StiggPaywall
          highlightedPlanId="plan-todos-essentials"
          onPlanSelected={onSubscribe}
          textOverrides={textOverrides}
        />
      </PaywallBox>
    </StiggProvider>
  );
}
