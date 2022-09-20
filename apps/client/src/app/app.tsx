import { Grid } from '@mui/material';
import { AppRoutes } from './AppRoutes';
import { Header } from './components';
import { UsersProvider } from './hooks/useUsers';

export function App() {
  return (
    <UsersProvider>
      <Grid container flexDirection="column" alignItems="center">
        <Grid container item maxWidth={960} flexDirection="column">
          <Header />
          <AppRoutes />
        </Grid>
      </Grid>
    </UsersProvider>
  );
}

export default App;
