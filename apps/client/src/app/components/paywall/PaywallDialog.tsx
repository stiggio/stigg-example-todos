import { Close } from '@mui/icons-material';
import { Dialog, DialogTitle, IconButton } from '@mui/material';
import { useWaitForCheckoutCompleted, ProvisionStatus } from '@stigg/react-sdk';
import { useState } from 'react';
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
    <Dialog
      open={open}
      fullWidth={true}
      onClose={onClose}
      PaperProps={{
        sx: {
          height: 730,
          minWidth: 1150,
          backgroundColor: '#F4F4F4',
          paddingTop: 6,
        },
      }}
    >
      <DialogTitle sx={{ position: 'absolute', right: 10, top: 10 }}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      {provisionStatus ? (
        <PlanProvisionStatus provisionStatus={provisionStatus} />
      ) : (
        <Paywall
          onSuccessProvision={() =>
            setProvisionStatus(ProvisionStatus.SUCCEEDED)
          }
        />
      )}
    </Dialog>
  );
}
