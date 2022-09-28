import { Close } from '@mui/icons-material';
import { Dialog, DialogTitle, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { SuccessfulPlanProvision } from './SuccessfulPlanProvision';
import { Paywall } from './StiggPaywall';
import { useStiggContext } from '@stigg/react-sdk';
import { useQueryParams } from '../../hooks/useQueryParam';

type TodosPaywallProps = {
  paywallIsOpen: boolean;
  onClose: () => void;
};

export function PaywallDialog({ paywallIsOpen, onClose }: TodosPaywallProps) {
  const [showProvisionSuccess, setShowProvisionSuccess] = useState(false);
  const [isAwaitingCheckout, setIsAwaitingCheckout] = useState(false);
  const { stigg } = useStiggContext();
  const checkoutSuccess = useQueryParams('checkoutSuccess');

  let open = paywallIsOpen;
  if (checkoutSuccess) {
    open = true;
  }

  useEffect(() => {
    const waitForCheckoutToComplete = async () => {
      if (!checkoutSuccess) {
        return;
      }

      setIsAwaitingCheckout(true);
      setShowProvisionSuccess(true);
      try {
        await stigg?.waitForCheckoutCompleted();
      } catch (err) {
        console.error('Failed to wait for checkout to complete', err);
      } finally {
        setIsAwaitingCheckout(false);
      }
    };

    waitForCheckoutToComplete();
  }, [stigg, checkoutSuccess]);

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

      {showProvisionSuccess ? (
        <SuccessfulPlanProvision
          waitingForCheckoutConfirmation={isAwaitingCheckout}
        />
      ) : (
        <Paywall onSuccessProvision={() => setShowProvisionSuccess(true)} />
      )}
    </Dialog>
  );
}
