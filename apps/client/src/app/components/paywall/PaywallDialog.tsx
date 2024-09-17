import { useState } from 'react';
import { Paywall } from './StiggPaywall';
import { StiggCheckout } from '../checkout/StiggCheckout';
import { PricingDialog } from '../pricing-dialog/PricingDialog';

type TodosPaywallProps = {
  paywallIsOpen: boolean;
  onClose: () => void;
};

export function PaywallDialog({ paywallIsOpen, onClose }: TodosPaywallProps) {
  const [planId, setPlanId] = useState<string | null>(null);

  const onCloseDialog = () => {
    onClose();
    setPlanId(null);
  };

  // show checkout if plan was selected, otherwise show paywall to allow selecting a plan
  const element = planId
    ? <StiggCheckout planId={planId} onClose={onCloseDialog} />
    : <Paywall onPlanSelected={({ plan }) => setPlanId(plan.id)} />;

  return (
    <PricingDialog open={paywallIsOpen} onClose={onCloseDialog}>
      {element}
    </PricingDialog>
  );
}
