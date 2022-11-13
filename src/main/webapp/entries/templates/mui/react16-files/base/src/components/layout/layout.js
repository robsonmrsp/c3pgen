import { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AuthGuard } from '../guard';
import { Navbar } from './navbar';
import { Sidebar } from './sidebar';

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));

export const Layout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <AuthGuard>
      <LayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          {children}
        </Box>
      </LayoutRoot>
      <Navbar onSidebarOpen={() => setSidebarOpen(true)} />
      <Sidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </AuthGuard>
  );
};
