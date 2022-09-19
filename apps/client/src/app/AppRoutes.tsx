import { Typography } from '@mui/material';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Members, SignIn, TodoList } from './components';
import { User } from './types';

const ProtectedRoute = ({
  children,
  user,
}: {
  children: React.ReactElement;
  user?: User | null;
}) => {
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export function AppRoutes({
  user,
  onSignIn,
}: {
  user: User | null;
  onSignIn: (email: string, password: string) => void;
}) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute user={user}>
            <TodoList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/members"
        element={
          <ProtectedRoute user={user}>
            <Members />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sign-in"
        element={<SignIn user={user} onSignIn={onSignIn} />}
      />
      <Route
        path="/pricing"
        element={<Typography variant="body1">Pricing here!</Typography>}
      />
    </Routes>
  );
}
