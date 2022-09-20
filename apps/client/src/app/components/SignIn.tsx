import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp, useUsers } from '../hooks/useUsers';

export function SignIn() {
  const {
    state: { currentUser, signInError },
    dispatch,
  } = useUsers();
  const navigate = useNavigate();
  const [createNewUser, setCreateNewUser] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleNewUserMode = () => {
    setCreateNewUser(!createNewUser);
  };

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const onClick = (email: string, password: string) => {
    if (createNewUser) {
      signUp(dispatch, { email, password });
    } else {
      signIn(dispatch, { email, password });
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClick(email, password);
  };

  return (
    <Grid
      container
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt={5}
    >
      <Grid item container flexDirection="column" alignItems="center">
        <Typography fontSize={30} variant="body1">
          {createNewUser ? 'Create a user' : 'Sign into your todos'}
        </Typography>
        {signInError && !createNewUser && (
          <Typography variant="body1" color="text.primary">
            Incorrect email or password
          </Typography>
        )}
      </Grid>
      <form onSubmit={onSubmit}>
        <Grid item container flexDirection="column" alignItems="center">
          <Grid item width={450} my={2}>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              variant="outlined"
              type="email"
              fullWidth
            />
          </Grid>
          <Grid item width={450}>
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item mt={4}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              sx={{ color: 'white', width: 450, height: 45 }}
            >
              {createNewUser ? 'Sign up' : 'Sign in'}
            </Button>
          </Grid>
          <Grid item mt={2}>
            <Typography
              variant="body1"
              color="text.primary"
              component="span"
              mr={1}
            >
              {createNewUser
                ? 'Already have an account?'
                : "Don't have a user?"}
            </Typography>
            <Link
              sx={{ cursor: 'pointer' }}
              underline="hover"
              onClick={toggleNewUserMode}
            >
              {createNewUser ? 'Sign in now' : 'Create one now'}
            </Link>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}
