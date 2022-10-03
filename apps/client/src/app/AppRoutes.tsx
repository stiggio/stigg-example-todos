import { CircularProgress, Grid } from '@mui/material';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Collaborators, SignIn, TodoList } from './components';
import { CustomerPortal } from './components/pricing/CustomerPortal';
import { Pricing } from './components/pricing/Pricing';
import { useUser } from './hooks/user/useUser';

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const {
    state: { currentUser },
  } = useUser();

  if (!currentUser) {
    return <Navigate to="/pricing" replace />;
  }

  return children;
};

export function AppRoutes() {
  const {
    state: { isLoaded },
  } = useUser();

  if (!isLoaded) {
    return (
      <Grid
        minHeight={500}
        container
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <TodoList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/collaborators"
        element={
          <ProtectedRoute>
            <Collaborators />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer-portal"
        element={
          <ProtectedRoute>
            <CustomerPortal />
          </ProtectedRoute>
        }
      />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/pricing" element={<Pricing />} />
    </Routes>
  );
}
