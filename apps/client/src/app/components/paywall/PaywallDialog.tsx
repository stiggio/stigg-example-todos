import { Close } from '@mui/icons-material';
import { useWaitForCheckoutCompleted, ProvisionStatus } from '@stigg/react-sdk';
import { useState } from 'react';
import {
  CloseButton,
  StyledDialog,
  StyledDialogTitle,
} from './PaywallDialog.style';
import { PlanProvisionStatus } from './PlanProvisionStatus';
import { Paywall } from './StiggPaywall';

type TodosPaywallProps = {
  paywallIsOpen: boolean;
  onClose: () => void;
};

export function PaywallDialog({ paywallIsOpen, onClose }: TodosPaywallProps) {
  const [provisionStatus, setProvisionStatus] =
    useState<ProvisionStatus | null>(null);
  const { isAwaitingCheckout } = useWaitForCheckoutCompleted({
    onProvisionStart: () => setProvisionStatus(ProvisionStatus.IN_PROGRESS),
    onProvisionSucceeded: () => setProvisionStatus(ProvisionStatus.SUCCEEDED),
    onProvisionFailed: () => setProvisionStatus(ProvisionStatus.FAILED),
  });

  const open = paywallIsOpen || isAwaitingCheckout || !!provisionStatus;

  return (
    <StyledDialog open={open} onClose={onClose} fullWidth>
      <StyledDialogTitle>
        <CloseButton onClick={onClose}>
          <Close />
        </CloseButton>
      </StyledDialogTitle>

      {provisionStatus ? (
        <PlanProvisionStatus provisionStatus={provisionStatus} />
      ) : (
        <Paywall
          onSuccessProvision={() =>
            setProvisionStatus(ProvisionStatus.SUCCEEDED)
          }
        />
      )}
    </StyledDialog>
  );
}
