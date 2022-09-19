import { Delete } from '@mui/icons-material';
import {
  Avatar,
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
import { randomColor } from './utils';

const rows = [
  {
    id: '123',
    email: 'nadav@stigg.io',
  },
  {
    id: '542',
    email: 'blabla@stigg.io',
  },
  {
    id: '921',
    email: 'cool@stigg.io',
  },
];

export function Members() {
  return (
    <Grid
      container
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt={6}
    >
      <Grid item>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Members</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Grid container alignItems="center">
                      <Avatar sx={{ bgcolor: randomColor() }}>
                        {row.email.slice(0, 2)}
                      </Avatar>
                      <Typography variant="body1" color="text.primary" ml={2}>
                        {row.email}
                      </Typography>
                    </Grid>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <Delete color="disabled" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
