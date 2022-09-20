import { CircularProgress, Grid, Typography } from '@mui/material';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Collaborators, SignIn, TodoList } from './components';
import { useUsers } from './hooks/useUsers';

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const {
    state: { currentUser },
  } = useUsers();

  if (!currentUser) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export function AppRoutes() {
  const {
    state: { isLoaded },
  } = useUsers();

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
        path="/members"
        element={
          <ProtectedRoute>
            <Collaborators />
          </ProtectedRoute>
        }
      />
      <Route path="/sign-in" element={<SignIn />} />
      <Route
        path="/pricing"
        element={<Typography variant="body1">Pricing here!</Typography>}
      />
    </Routes>
  );
}
