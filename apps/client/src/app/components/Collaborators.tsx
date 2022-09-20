import { Delete } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Modal,
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
  TextField,
  Box,
} from '@mui/material';
import { useState } from 'react';
import {
  UsersDispatch,
  useUsers,
  addCollaborator,
  removeCollaborator,
} from '../hooks/useUsers';
import { getColor } from './utils';

const COLLABORATORS_LIMIT = 5;

function AddSeatsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [seats, setSeats] = useState(1);
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'white',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Grid container flexDirection="column">
          <Typography variant="body1" mb={3}>
            Add seats
          </Typography>
          <Grid item container alignItems="center">
            <TextField
              value={seats}
              onChange={(e) => setSeats(parseInt(e.target.value))}
              sx={{ width: 200 }}
              size="small"
            />
            <Typography variant="body1" ml={2} color="text.primary">
              news seats, $4/month each
            </Typography>
          </Grid>
          <Grid item container alignItems="center" mt={4}>
            <Button variant="contained" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button sx={{ color: 'white', marginLeft: 1 }} variant="contained">
              Add seats
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

function AddCollaboratorModal({
  open,
  onClose,
  dispatch,
}: {
  open: boolean;
  onClose: () => void;
  dispatch: UsersDispatch;
}) {
  const [collaboratorEmail, setCollaboratorEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const onAddCollaborator = async () => {
    setIsLoading(true);
    await addCollaborator(dispatch, { email: collaboratorEmail });
    setIsLoading(false);
    setCollaboratorEmail('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'white',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Grid container flexDirection="column">
          <Typography variant="body1" mb={3}>
            Add collaborator
          </Typography>
          <Grid item container alignItems="center">
            <TextField
              type="email"
              label="email"
              value={collaboratorEmail}
              onChange={(e) => setCollaboratorEmail(e.target.value)}
              sx={{ width: 200 }}
              size="small"
            />
          </Grid>
          <Grid item container alignItems="center" mt={4}>
            <Button variant="contained" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <LoadingButton
              onClick={onAddCollaborator}
              loading={isLoading}
              loadingPosition="start"
              sx={{ color: 'white', marginLeft: 1 }}
              variant="contained"
            >
              Add
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export function Collaborators() {
  const {
    state: { currentUser },
    dispatch,
  } = useUsers();
  const [openAddSeats, setOpenAddSeats] = useState(false);
  const handleOpenAddSeats = () => setOpenAddSeats(true);
  const handleCloseAddSeats = () => setOpenAddSeats(false);
  const [openAddCollaborator, setOpenAddCollaborator] = useState(false);
  const handleOpenAddCollaborator = () => setOpenAddCollaborator(true);
  const handleCloseAddCollaborator = () => setOpenAddCollaborator(false);

  console.log(currentUser?.collaborators);
  const collaborators = currentUser?.collaborators
    ? [...currentUser.collaborators]
    : [];

  const usagePercentage = Math.min(
    Math.floor((collaborators.length / COLLABORATORS_LIMIT) * 100),
    100
  );

  const onRemoveCollaborator = (collaborator: string) => {
    removeCollaborator(dispatch, { email: collaborator });
  };

  return (
    <Grid
      container
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt={6}
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
            {collaborators.length} out of {COLLABORATORS_LIMIT} seats —
          </Typography>
          <Button sx={{ margin: 0 }} onClick={handleOpenAddSeats}>
            Buy more
          </Button>
          <LinearProgress variant="determinate" value={usagePercentage} />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{ color: 'white' }}
            onClick={handleOpenAddCollaborator}
            disabled={collaborators.length === COLLABORATORS_LIMIT}
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
                  key={collaborator}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Grid container alignItems="center">
                      <Avatar sx={{ bgcolor: getColor(index) }}>
                        {collaborator.slice(0, 2).toUpperCase()}
                      </Avatar>
                      <Typography variant="body1" color="text.primary" ml={2}>
                        {collaborator}
                      </Typography>
                    </Grid>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => onRemoveCollaborator(collaborator)}
                    >
                      <Delete color="disabled" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <AddSeatsModal open={openAddSeats} onClose={handleCloseAddSeats} />
      <AddCollaboratorModal
        open={openAddCollaborator}
        onClose={handleCloseAddCollaborator}
        dispatch={dispatch}
      />
    </Grid>
  );
}
