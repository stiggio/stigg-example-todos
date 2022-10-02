import { Close } from '@mui/icons-material';
import { Dialog, DialogTitle, IconButton } from '@mui/material';
import { useState } from 'react';
import { SuccessfulPlanProvision } from './SuccessfulPlanProvision';
import { Paywall } from './StiggPaywall';
import { useWaitForCheckoutCompleted } from '../../hooks/useWaitForCheckoutCompleted';

type TodosPaywallProps = {
  paywallIsOpen: boolean;
  onClose: () => void;
};

export function PaywallDialog({ paywallIsOpen, onClose }: TodosPaywallProps) {
  const [showProvisionSuccess, setShowProvisionSuccess] = useState(false);
  const { isAwaitingCheckout } = useWaitForCheckoutCompleted();

  let open = paywallIsOpen;
  if (isAwaitingCheckout) {
    open = true;
  }

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

      {showProvisionSuccess || isAwaitingCheckout ? (
        <SuccessfulPlanProvision
          waitingForCheckoutConfirmation={isAwaitingCheckout}
        />
      ) : (
        <Paywall onSuccessProvision={() => setShowProvisionSuccess(true)} />
      )}
    </Dialog>
  );
}
