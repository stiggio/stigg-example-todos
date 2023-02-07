import { Delete } from '@mui/icons-material';
import {
  CircularProgress,
  Avatar,
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { BillingModel, useStiggContext } from '@stigg/react-sdk';
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
import { getColor } from '../utils';
import { SeatsUsage } from './SeatsUsage';

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
  const { stigg, refreshData } = useStiggContext();

  // const collaboratorEntitlement = stigg.getMeteredEntitlement({
  //   featureId: 'feature-collaborators',
  //   options: {
  //     requestedUsage: 1,
  //     fallback: { usageLimit: 5, hasAccess: true },
  //   },
  // });

  const canAddCollaborator = true;
  const collaboratorLimit = 5000;
  const isUnlimitedCollaborators = false;

  const [currentActiveSubscription] =
    currentUser?.stiggCustomer?.getActiveSubscriptions() || [];
  const canUpdateSeats =
    currentActiveSubscription &&
    currentActiveSubscription.price?.pricingModel === BillingModel.PerUnit;

  const collaborators = currentUser?.collaborators
    ? [...currentUser.collaborators]
    : [];
  if (currentUser) {
    collaborators.unshift({
      id: currentUser.id as string,
      email: currentUser.email,
    });
  }

  const onRemoveCollaborator = async (collaborator: Collaborator) => {
    setCollaboratorInDelete(collaborator.id);
    await removeCollaborator(dispatch, { email: collaborator.email });
    await refreshData();
    setCollaboratorInDelete(null);
  };

  const onAddCollaborator = async (collaboratorEmail: string) => {
    await addCollaborator(dispatch, { email: collaboratorEmail });
    await refreshData();
  };

  const onAddCollaboratorSeats = async (additionalSeats: number) => {
    if (canUpdateSeats) {
      await addCollaboratorSeats({ additionalSeats });
      await refreshData();
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
          <SeatsUsage
            collaboratorLimit={collaboratorLimit}
            collaborators={collaborators}
            isUnlimitedCollaborators={isUnlimitedCollaborators}
            onAddSeatsClick={onAddSeatsClick}
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
                    {collaborator.id ===
                    currentUser?.id ? null : collaboratorInDelete ===
                      collaborator.id ? (
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
        currentActiveSubscription={currentActiveSubscription}
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
