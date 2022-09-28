import {
  Grid,
  Typography,
  Button as MuiButton,
  Paper as MuiPaper,
  Chip,
} from '@mui/material';
import { spacing } from '@mui/system';
import styled from 'styled-components/macro';
import { AccessTime } from '@mui/icons-material';
import moment from 'moment';
import {
  BillingPeriod,
  BillingModel,
  Customer,
  EntitlementResetPeriod,
  PricingType,
} from '@stigg/react-sdk';
import { diffInDays } from '../utils';

const Paper = styled(MuiPaper)(spacing);
const Button = styled(MuiButton)(spacing);

export function getResetDateCopy(
  resetPeriod: EntitlementResetPeriod | null | undefined
): string {
  if (!resetPeriod) {
    return '';
  }
  switch (resetPeriod) {
    case EntitlementResetPeriod.Daily:
      return '/ day';
    case EntitlementResetPeriod.Hourly:
      return '/ hour';
    case EntitlementResetPeriod.Monthly:
      return '/ month';
    case EntitlementResetPeriod.Weekly:
      return '/ week';
  }
}

export const PlanDetails = ({
  customer,
  onManagePlan,
}: {
  customer: Customer;
  onManagePlan: () => void;
}) => {
  let isTrial = true;
  let subscription = customer?.getActiveTrials()[0];
  if (!subscription) {
    isTrial = false;
    subscription = customer?.getActiveSubscriptions()[0];
  }
  if (!subscription) {
    return null;
  }
  const daysLeft = diffInDays(subscription.trialEndDate);

  const plan = subscription?.plan;
  const planEntitlements = [
    ...(plan?.inheritedEntitlements || []),
    ...(plan?.entitlements || []),
  ];
  const planPrice = subscription.price;
  const isFreePlan = subscription.pricingType === PricingType.Free;
  const isCustomPricePlan = subscription.pricingType === PricingType.Custom;
  const priceValue = subscription.price?.amount;
  const priceString = isCustomPricePlan
    ? 'Custom price'
    : isFreePlan
    ? 'Free '
    : `$ ${priceValue} ${
        planPrice?.pricingModel === BillingModel.UsageBased
          ? `/ ${planPrice?.feature?.units || ''}`
          : planPrice?.billingPeriod === BillingPeriod.Monthly
          ? '/ month'
          : '/ year'
      }`;

  return (
    <Paper variant="outlined" p={10} mb={5}>
      <Grid container>
        <Grid item xs={4}>
          <Grid container flexDirection="column">
            <Grid container>
              <Typography
                variant="body1"
                fontWeight="regular"
                mr={1}
                color="text.primary"
              >
                Current plan:
              </Typography>
              <Typography
                component="span"
                variant="body1"
                fontWeight="bold"
                color="text.primary"
              >
                {plan?.displayName || 'No active subscription'}
              </Typography>
            </Grid>
            {daysLeft > 0 && (
              <Grid container mt={2}>
                <Chip
                  sx={{ backgroundColor: '#8090BC' }}
                  label={
                    <Grid container alignItems="center">
                      <Grid item pt={1}>
                        <AccessTime color="secondary" />
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body1"
                          fontSize={15}
                          color="white"
                          pl={1}
                        >{`In trial: ${daysLeft} days remaining `}</Typography>
                      </Grid>
                    </Grid>
                  }
                />
              </Grid>
            )}
            <Button
              mt={4}
              onClick={() => onManagePlan()}
              variant="contained"
              color="primary"
              sx={{ height: 30, width: 150, color: 'white' }}
            >
              {isTrial ? 'Upgrade now' : 'Manage plan'}
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <Typography
            variant="body1"
            color="text.primary"
            mb={2}
            fontWeight="bold"
          >
            Plan includes
          </Typography>
          {planEntitlements.map((entitlement, index) => {
            const resetDateCopy = getResetDateCopy(entitlement.resetPeriod);
            return (
              <Typography
                variant="body1"
                color="text.primary"
                key={index}
                mb={1}
              >
                {entitlement.hasUnlimitedUsage
                  ? `Unlimited ${entitlement.feature.unitsPlural}`
                  : entitlement.usageLimit
                  ? `${entitlement.usageLimit} ${entitlement.feature.unitsPlural} ${resetDateCopy}`
                  : entitlement.feature.displayName}
              </Typography>
            );
          })}
        </Grid>
        <Grid item xs={4}>
          <Typography
            variant="body1"
            color="text.primary"
            mb={2}
            fontWeight="bold"
          >
            Billing information
          </Typography>
          <Typography variant="body1" color="text.primary">
            {priceString}
          </Typography>
          {subscription.currentBillingPeriodEnd && !isFreePlan && (
            <Typography variant="body1" color="text.primary">
              Next payment on{' '}
              {moment
                .utc(subscription.currentBillingPeriodEnd)
                .format(`MMMM Do YYYY`)}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};
