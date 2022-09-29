import {
  Box,
  Grid,
  Typography,
  Link,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  ListAlt,
  People,
  MonetizationOn,
  Login,
  Logout,
} from '@mui/icons-material';
import { useUser, signOut } from '../hooks/user/useUser';
import { useState } from 'react';

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const {
    state: { currentUser },
    dispatch,
  } = useUser();

  const onPricingClick = () => {
    if (currentUser) {
      navigate('/customer-portal');
    } else {
      navigate('/pricing');
    }
  };
  const onCollaboratorsClick = () => {
    navigate('/collaborators');
  };
  const onSignInClick = () => {
    navigate('/sign-in');
  };

  const onSignOutClick = () => {
    signOut(dispatch);
    navigate('/sign-in');
  };
  const onTodosClick = () => {
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
        onClick={onTodosClick}
      >
        <ListAlt sx={{ fontSize: 42, strokeWidth: 1 }} />
        <Typography ml={1} variant="h6">
          Todos
        </Typography>
      </Grid>
      <Grid container item width="auto" alignItems="center">
        {currentUser && (
          <HeaderLink label="Todos" icon={<ListAlt />} onClick={onTodosClick} />
        )}
        {currentUser && (
          <HeaderLink
            label="Collaborators"
            icon={<People />}
            onClick={onCollaboratorsClick}
          />
        )}
        <HeaderLink
          label="Pricing"
          icon={<MonetizationOn />}
          onClick={onPricingClick}
        />
        {!currentUser && (
          <HeaderLink
            label={'Sign in'}
            icon={<Login />}
            onClick={onSignInClick}
          />
        )}
        {currentUser && (
          <Avatar
            onClick={handleClick}
            sx={{ cursor: 'pointer', marginLeft: 2 }}
          >
            {currentUser.email.slice(0, 2).toUpperCase()}
          </Avatar>
        )}
      </Grid>

      <Menu
        anchorEl={anchorEl}
        id="user-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        sx={{ marginTop: 1 }}
        PaperProps={{
          sx: {
            minWidth: 180,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box p={1}>
          <Typography variant="body1" color="text.primary" fontSize={16}>
            {currentUser?.email}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={onSignOutClick}>
          <ListItemIcon>
            <Logout fontSize="small" color="primary" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Grid>
  );
}
