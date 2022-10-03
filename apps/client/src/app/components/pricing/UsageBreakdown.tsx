import { Entitlement, MeteredEntitlement } from '@stigg/js-client-sdk';
import {
  Box,
  Grid,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { getUsagePercentage, getUsageProgressColor } from '../utils';
import { AutoGraph } from '@mui/icons-material';

export const UsageBreakdown = ({
  entitlements,
}: {
  entitlements: Entitlement[];
}) => (
  <>
    <Grid container alignItems="center">
      <Grid item mr={1} pt={1}>
        <AutoGraph color="primary" />
      </Grid>
      <Grid item xs="auto">
        <Typography variant="body1">Usage</Typography>
      </Grid>
    </Grid>

    <TableContainer>
      <Table
        aria-labelledby="tableTitle"
        size={'medium'}
        aria-label="enhanced table"
      >
        <TableHead>
          <TableRow>
            <TableCell colSpan={2} />
          </TableRow>
        </TableHead>
        <TableBody>
          {entitlements
            .sort(
              (a, b) =>
                a.feature?.displayName.localeCompare(
                  b.feature?.displayName || ''
                ) || -1
            )
            .filter((x) => x.feature?.isMetered)
            .map((entitlement, index) => {
              const meteredEntitlement = entitlement as MeteredEntitlement;
              const usagePercentage = meteredEntitlement.isUnlimited
                ? 0
                : getUsagePercentage(
                    meteredEntitlement.currentUsage,
                    meteredEntitlement.usageLimit!
                  );
              return (
                <TableRow key={index}>
                  <TableCell colSpan={1} width="50%">
                    <Typography variant="body1">
                      {meteredEntitlement.feature?.displayName}
                    </Typography>
                    <Typography color="textSecondary" fontSize={16}>
                      {meteredEntitlement.feature?.description}
                    </Typography>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: '100%', mr: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={usagePercentage}
                          color={getUsageProgressColor(usagePercentage)}
                        />
                      </Box>
                      <Box sx={{ minWidth: 35 }}>
                        {meteredEntitlement.isUnlimited ? null : (
                          <Typography variant="body2" color="text.secondary">
                            {usagePercentage}%
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    <Typography
                      variant="body1"
                      fontSize={16}
                      color="text.primary"
                    >
                      {meteredEntitlement.currentUsage} /{' '}
                      {meteredEntitlement.isUnlimited
                        ? 'unlimited'
                        : meteredEntitlement.usageLimit}{' '}
                      {meteredEntitlement.feature?.unitsPlural}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  </>
);
