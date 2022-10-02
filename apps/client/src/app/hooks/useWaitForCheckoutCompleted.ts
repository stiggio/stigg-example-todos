import { useStiggContext } from '@stigg/react-sdk';
import { useEffect, useState } from 'react';
import { useQueryParams } from './useQueryParam';

export function useWaitForCheckoutCompleted() {
  const { stigg } = useStiggContext();
  const [isAwaitingCheckout, setIsAwaitingCheckout] = useState(false);
  const checkoutSuccess = useQueryParams('checkoutSuccess');

  useEffect(() => {
    const waitForCheckoutToComplete = async () => {
      if (!checkoutSuccess) {
        return;
      }

      setIsAwaitingCheckout(true);
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

  return { isAwaitingCheckout };
}
