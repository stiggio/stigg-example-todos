import { ThemeProvider, Grid, CssBaseline } from '@mui/material';
import { useTheme } from 'styled-components';
import { theme } from '../theme';
import { AppRoutes } from './AppRoutes';
import { Header } from './components';
import { TopBanner } from './components/TopBar';
import { UsersProvider } from './hooks/user/useUser';
import { GlobalStyle } from '../GlobalStyle';

export function App() {
  const outerTheme = useTheme();

  return (
    <ThemeProvider theme={theme(outerTheme)}>
      <CssBaseline />
      <GlobalStyle />
      <UsersProvider>
        <Grid container flexDirection="column" alignItems="center">
          <TopBanner />
          <Grid container item maxWidth={1105} flexDirection="column">
            <Header />
            <AppRoutes />
          </Grid>
        </Grid>
      </UsersProvider>
    </ThemeProvider>
  );
}

export default App;
