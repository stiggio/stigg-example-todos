import { Button, Grid, TextField, Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { User } from '../types';

export function SignIn({
  user,
  onSignIn,
}: {
  user: User | null;
  onSignIn: (email: string, password: string) => void;
}) {
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <Grid
      container
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt={5}
    >
      <Grid item>
        <Typography fontSize={30} variant="body1">
          Sign into your account
        </Typography>
      </Grid>
      <Grid item container flexDirection="column" alignItems="center">
        <Grid item width={450} my={2}>
          <TextField
            placeholder="Email"
            variant="outlined"
            type="email"
            fullWidth
          />
        </Grid>
        <Grid item width={450}>
          <TextField
            placeholder="Password"
            type="password"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item mt={4}>
          <Button
            color="primary"
            variant="contained"
            sx={{ color: 'white', width: 200 }}
            onClick={() => onSignIn('nadav@stigg.io', '213123')}
          >
            Sign in
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
