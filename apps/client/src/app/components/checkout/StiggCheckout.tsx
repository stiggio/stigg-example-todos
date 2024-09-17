import { Checkout, OnCheckoutCompletedParams, useStiggContext } from '@stigg/react-sdk';

type TodosPaywallProps = {
  planId: string;
  onClose?: () => void;
};

export function StiggCheckout({ planId, onClose }: TodosPaywallProps) {
  const { refreshData } = useStiggContext();

  const onCheckoutCompleted = async ({ success }: OnCheckoutCompletedParams) => {
    if (!success) {
      return;
    }

    onClose?.();
    await refreshData();
  };

  return <Checkout planId={planId} onCheckoutCompleted={onCheckoutCompleted} />;
}
