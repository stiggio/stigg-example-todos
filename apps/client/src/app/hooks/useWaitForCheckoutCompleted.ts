import { useStiggContext } from '@stigg/react-sdk';
import React, { useEffect, useState } from 'react';
import { useQueryParams } from './useQueryParam';

export function useWaitForCheckoutCompleted(
  setShowProvisionSuccess: React.Dispatch<React.SetStateAction<boolean>>
) {
  const { stigg } = useStiggContext();
  const [isAwaitingCheckout, setIsAwaitingCheckout] = useState(false);
  const checkoutSuccess = useQueryParams('checkoutSuccess');

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
  }, [stigg, checkoutSuccess, setShowProvisionSuccess]);

  return { isAwaitingCheckout };
}
