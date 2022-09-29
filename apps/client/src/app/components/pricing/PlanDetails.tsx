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
import { Customer } from '@stigg/react-sdk';
import { getPlanDetails, getResetDateCopy } from './getPlanDetails';

const Paper = styled(MuiPaper)(spacing);
const Button = styled(MuiButton)(spacing);

export const PlanDetails = ({
  customer,
  onManagePlan,
}: {
  customer: Customer;
  onManagePlan: () => void;
}) => {
  const planDetails = getPlanDetails(customer);

  if (!planDetails) {
    return null;
  }

  const {
    priceString,
    isTrial,
    isFreePlan,
    daysLeft,
    subscription,
    plan,
    planEntitlements,
    planPriceEntitlement,
  } = planDetails;

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
          {planPriceEntitlement && (
            <Typography variant="body1" color="text.primary" mb={1}>
              {planPriceEntitlement}
            </Typography>
          )}
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
