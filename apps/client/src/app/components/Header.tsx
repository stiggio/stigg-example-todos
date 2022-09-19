import { Grid, Typography, Link, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  ListAlt,
  People,
  MonetizationOn,
  Login,
  Logout,
} from '@mui/icons-material';
import { User } from '../types';

function HeaderLink({
  onClick,
  icon,
  label,
}: {
  onClick: () => void;
  icon: React.ReactElement | null;
  label: string;
}) {
  return (
    <Link underline="hover" ml={2}>
      <Grid
        container
        item
        width="auto"
        alignItems="center"
        sx={{ cursor: 'pointer' }}
        onClick={onClick}
      >
        {icon}
        <Typography ml={1} variant="body1">
          {label}
        </Typography>
      </Grid>
    </Link>
  );
}

export function Header({
  user,
  onSignOut,
}: {
  user: User | null;
  onSignOut: () => void;
}) {
  const navigate = useNavigate();

  const onPricingClick = () => {
    navigate('/pricing');
  };
  const onMembersClick = () => {
    navigate('/members');
  };
  const onSignOutClick = () => {
    if (user) {
      onSignOut();
    }

    navigate('/sign-in');
  };
  const onTitleClick = () => {
    navigate('/');
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      flexWrap="nowrap"
    >
      <Grid
        container
        item
        width="auto"
        alignItems="center"
        sx={{ cursor: 'pointer' }}
        onClick={onTitleClick}
      >
        <ListAlt sx={{ fontSize: 42, strokeWidth: 1 }} />
        <Typography ml={1} variant="h6">
          Todos
        </Typography>
      </Grid>
      <Grid container item width="auto" alignItems="center">
        {user && (
          <HeaderLink
            label="Members"
            icon={<People />}
            onClick={onMembersClick}
          />
        )}
        <HeaderLink
          label="Pricing"
          icon={<MonetizationOn />}
          onClick={onPricingClick}
        />
        <HeaderLink
          label={user ? 'Sign out' : 'Sign in'}
          icon={user ? <Logout /> : <Login />}
          onClick={onSignOutClick}
        />
      </Grid>
    </Grid>
  );
}
