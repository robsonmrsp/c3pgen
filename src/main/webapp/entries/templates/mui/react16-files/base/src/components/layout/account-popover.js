import { useContext } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { Box, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { AuthContext } from '@/contexts/auth-context';
import { auth, ENABLE_AUTH } from '@/lib/auth';

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const authContext = useContext(AuthContext);

  const handleSignOut = async () => {
    onClose?.();
    if (!ENABLE_AUTH) {
      return;
    }
    const authSkipped = globalThis.sessionStorage.getItem('skip-auth') === 'true';

    if (authSkipped) {
      globalThis.sessionStorage.removeItem('skip-auth');
      Router
        .push('/sign-in')
        .catch(console.error);
      return;
    }

    try {
      await auth.signOut();
      authContext.signOut();

      Router
        .push('/sign-in')
        .catch(console.error);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: '300px' }
      }}
      {...other}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Minha Conta
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          John Doe
        </Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          '& > *': {
            '&:first-of-type': {
              borderTopColor: 'divider',
              borderTopStyle: 'solid',
              borderTopWidth: '1px'
            },
            padding: '12px 16px'
          }
        }}
      >
        <MenuItem onClick={handleSignOut}>
          Sair
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
