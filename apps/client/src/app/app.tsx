import { Grid } from '@mui/material';
import { useState } from 'react';
import { AppRoutes } from './AppRoutes';
import { Header } from './components';
import { User } from './types';
import auth from './auth';

export function App() {
  const [user, setUser] = useState<User | null>(null);

  const onSignOut = () => {
    setUser(null);
  };

  const onSignIn = (email: string, password: string) => {
    setUser({
      id: '123',
      email,
      password,
    });
    auth.setToken(email);
  };

  return (
    <Grid container flexDirection="column" alignItems="center">
      <Grid container item maxWidth={960} flexDirection="column">
        <Header user={user} onSignOut={onSignOut} />
        <AppRoutes user={user} onSignIn={onSignIn} />
      </Grid>
    </Grid>
  );
}

export default App;
