import { Box, styled } from '@mui/material';
import {
  OnPlanSelectedCallbackFn,
  Paywall as StiggPaywall,
  PaywallLocalization,
} from '@stigg/react-sdk';
import type { DeepPartial } from '@stigg/react-sdk/dist/types';

const PaywallBox = styled(Box)`
  .stigg-plan-description:first-of-type {
    margin-top: 30px;
  }
`;

export function Paywall({
  onPlanSelected,
  textOverrides,
}: {
  onPlanSelected: OnPlanSelectedCallbackFn;
  textOverrides?: DeepPartial<PaywallLocalization>;
}) {
  return (
    <PaywallBox>
      <StiggPaywall
        highlightedPlanId="plan-todos-essentials"
        onPlanSelected={onPlanSelected}
        textOverrides={textOverrides}
      />
    </PaywallBox>
  );
}
