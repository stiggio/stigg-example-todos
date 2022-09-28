import { Grid } from '@mui/material';
import { AppRoutes } from './AppRoutes';
import { Header } from './components';
import { TopBanner } from './components/TopBar';
import { UsersProvider } from './hooks/user/useUser';

export function App() {
  return (
    <UsersProvider>
      <Grid container flexDirection="column" alignItems="center">
        <TopBanner />
        <Grid container item maxWidth={1100} flexDirection="column">
          <Header />
          <AppRoutes />
        </Grid>
      </Grid>
    </UsersProvider>
  );
}

export default App;
