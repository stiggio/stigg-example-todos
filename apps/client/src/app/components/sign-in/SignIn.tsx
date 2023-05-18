import { LoadingButton } from '@mui/lab';
import { Grid, Link, TextField, Typography } from '@mui/material';
import { useStiggContext } from '@stigg/react-sdk';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp, useUser } from '../../hooks/user/useUser';

export function SignIn() {
  const {
    state: { currentUser, signInError },
    dispatch,
  } = useUser();
  const navigate = useNavigate();
  const [createNewUser, setCreateNewUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { stigg } = useStiggContext();

  const toggleNewUserMode = () => {
    setCreateNewUser(!createNewUser);
  };

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const onLogin = async (email: string, password: string) => {
    setIsLoading(true);
    if (createNewUser) {
      try {
        await signUp(dispatch, { email, password }, stigg);
      } catch (err: any) {
        if (err.response.status === 409) {
          setSignupError('User email already exists');
        }
      }
    } else {
      await signIn(dispatch, { email, password }, stigg);
    }
    setIsLoading(false);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLogin(email, password);
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
        {signupError && createNewUser && (
          <Typography variant="body1" color="text.primary">
            {signupError}
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
            <LoadingButton
              type="submit"
              color="primary"
              variant="contained"
              loading={isLoading}
              sx={{ color: 'white', width: 450, height: 45 }}
            >
              {createNewUser ? 'Sign up' : 'Sign in'}
            </LoadingButton>
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
