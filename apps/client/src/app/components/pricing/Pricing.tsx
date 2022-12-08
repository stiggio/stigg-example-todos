import { Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Paywall } from '../paywall/StiggPaywall';
import pricingPlansImage from '../../../assets/price-tag.svg';

export function Pricing() {
  const navigate = useNavigate();
  const onPlanSelected = () => {
    navigate('/sign-in');
  };
  return (
    <Grid
      container
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item position="relative">
        <Typography variant="h6" fontSize={40} mb={1}>
          Pricing Plans
        </Typography>
        <Box position="absolute" sx={{ top: -10, right: -85 }}>
          <img src={pricingPlansImage} alt="pricing-plans" />
        </Box>
      </Grid>
      <Grid item mb={4}>
        <Typography variant="h6" fontSize={25}>
          Your to-do app to help you organize & share your to-do list with
          others
        </Typography>
      </Grid>
      <Grid item>
        <Paywall
          onPlanSelected={onPlanSelected}
          textOverrides={{
            planCTAButton: {
              startTrial: () => 'Get started',
            },
          }}
        />
      </Grid>
    </Grid>
  );
}
