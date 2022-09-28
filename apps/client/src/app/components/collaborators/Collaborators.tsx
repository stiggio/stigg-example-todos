import { Delete } from '@mui/icons-material';
import {
  CircularProgress,
  Avatar,
  Button,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { BillingPeriod, BillingModel, useStiggContext } from '@stigg/react-sdk';
import { useState } from 'react';
import {
  useUser,
  removeCollaborator,
  addCollaborator,
  addCollaboratorSeats,
} from '../../hooks/user/useUser';
import { Collaborator } from '../../types';
import { AddCollaboratorModal } from './AddCollaboratorModal';
import { AddSeatsModal } from './AddSeatsModal';
import { PaywallDialog } from '../paywall/PaywallDialog';
import { getColor, getUsagePercentage, getUsageProgressColor } from '../utils';

export function Collaborators() {
  const {
    state: { currentUser },
    dispatch,
  } = useUser();
  const [openAddSeats, setOpenAddSeats] = useState(false);
  const [collaboratorInDelete, setCollaboratorInDelete] = useState<
    string | null
  >(null);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const handleOpenAddSeats = () => setOpenAddSeats(true);
  const handleCloseAddSeats = () => setOpenAddSeats(false);
  const [openAddCollaborator, setOpenAddCollaborator] = useState(false);
  const handleOpenAddCollaborator = () => setOpenAddCollaborator(true);
  const handleCloseAddCollaborator = () => setOpenAddCollaborator(false);
  const { stigg } = useStiggContext();

  const collaboratorEntitlement = stigg?.getMeteredEntitlement({
    featureId: 'feature-collaborators',
    options: {
      requestedUsage: 1,
      fallback: { usageLimit: 5, hasAccess: true },
    },
  });
  const canAddCollaborator = collaboratorEntitlement?.hasAccess;
  const collaboratorLimit = collaboratorEntitlement?.usageLimit || 5;
  const isUnlimitedCollaborators = collaboratorEntitlement?.isUnlimited;

  const collaborators = currentUser?.collaborators || [];

  const usagePercentage = isUnlimitedCollaborators
    ? 0
    : getUsagePercentage(collaborators.length, collaboratorLimit);

  const onRemoveCollaborator = async (collaborator: Collaborator) => {
    setCollaboratorInDelete(collaborator.id);
    await removeCollaborator(dispatch, { email: collaborator.email });
    await stigg?.refresh();
    setCollaboratorInDelete(null);
  };

  const onAddCollaborator = async (collaboratorEmail: string) => {
    await addCollaborator(dispatch, { email: collaboratorEmail });
    await stigg?.refresh();
  };

  const [currentActiveSubscription] =
    currentUser?.stiggCustomer?.getActiveSubscriptions() || [];
  const canUpdateSeats =
    currentActiveSubscription &&
    currentActiveSubscription.price?.pricingModel === BillingModel.PerUnit;
  const currentBillingPeriod = currentActiveSubscription.price?.billingPeriod;
  const price = currentActiveSubscription.plan?.pricePoints.find(
    (price) => price.billingPeriod === currentBillingPeriod
  );
  const seatPrice = price
    ? currentBillingPeriod === BillingPeriod.Annually
      ? price.amount / 12
      : price.amount
    : 0;

  const onAddCollaboratorSeats = async (additionalSeats: number) => {
    if (canUpdateSeats) {
      await addCollaboratorSeats({ additionalSeats });
      await stigg?.refresh();
    }
  };

  const onAddSeatsClick = () => {
    if (canUpdateSeats) {
      handleOpenAddSeats();
    } else {
      setIsPaywallOpen(true);
    }
  };

  return (
    <Grid
      container
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      my={6}
    >
      <Grid
        container
        item
        mb={2}
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Grid item>
          <Typography color="text.primary" component="span">
            {collaborators.length} /{' '}
            {isUnlimitedCollaborators ? 'unlimited' : collaboratorLimit} seats —
          </Typography>
          <Button sx={{ margin: 0 }} onClick={onAddSeatsClick}>
            Buy more
          </Button>
          <LinearProgress
            variant="determinate"
            value={usagePercentage}
            color={getUsageProgressColor(usagePercentage)}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{ color: 'white' }}
            onClick={handleOpenAddCollaborator}
            disabled={!canAddCollaborator}
          >
            Invite collaborator
          </Button>
        </Grid>
      </Grid>
      <Grid item width="100%">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Collaborators</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {collaborators.map((collaborator, index) => (
                <TableRow
                  key={collaborator.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Grid container alignItems="center">
                      <Avatar sx={{ bgcolor: getColor(index) }}>
                        {collaborator.email.slice(0, 2).toUpperCase()}
                      </Avatar>
                      <Typography variant="body1" color="text.primary" ml={2}>
                        {collaborator.email}
                      </Typography>
                    </Grid>
                  </TableCell>
                  <TableCell align="right">
                    {collaboratorInDelete === collaborator.id ? (
                      <CircularProgress size={26} />
                    ) : (
                      <IconButton
                        onClick={() => onRemoveCollaborator(collaborator)}
                      >
                        <Delete color="disabled" />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <AddSeatsModal
        open={openAddSeats}
        onClose={handleCloseAddSeats}
        onAddCollaboratorSeats={onAddCollaboratorSeats}
        seatPrice={seatPrice}
      />
      <AddCollaboratorModal
        open={openAddCollaborator}
        onClose={handleCloseAddCollaborator}
        onAddCollaborator={onAddCollaborator}
      />
      <PaywallDialog
        paywallIsOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
      />
    </Grid>
  );
}
