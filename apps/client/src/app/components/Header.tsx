import { Grid, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  ListAlt,
  People,
  MonetizationOn,
  Login,
  Logout,
} from '@mui/icons-material';
import { useUsers, signOut } from '../hooks/useUsers';

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

export function Header() {
  const navigate = useNavigate();
  const {
    state: { currentUser },
    dispatch,
  } = useUsers();

  const onPricingClick = () => {
    navigate('/pricing');
  };
  const onMembersClick = () => {
    navigate('/members');
  };
  const onSignOutClick = () => {
    if (currentUser) {
      signOut(dispatch);
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
        {currentUser && (
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
          label={currentUser ? 'Sign out' : 'Sign in'}
          icon={currentUser ? <Logout /> : <Login />}
          onClick={onSignOutClick}
        />
      </Grid>
    </Grid>
  );
}
