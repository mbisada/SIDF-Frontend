import React, { ReactNode } from 'react';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';

import { AccountBalance, ListAlt, Logout } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import logo from '../../assets/Logo.png';
import { ROLES } from '../../constants/roles';
import { useCustomer } from '../../contexts/CustomerContext/useContext';
import { useLogout } from '../../hooks/useLogout';

interface LayoutProps {
  breadcrumbs?: { label: string; href?: string }[];
  heading?: string;
  subheading?: string;
  children: ReactNode;
}

const drawerWidth = 240;

const Layout: React.FC<LayoutProps> = ({ heading, subheading, children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { customer } = useCustomer();
  const navigate = useNavigate();
  const logout = useLogout();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{ overflow: 'auto', paddingTop: 2 }}>
      <List>
        {customer?.role === ROLES.user && (
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/ob-connect')}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <AccountBalance sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary={t('CONSENTS')} />
            </ListItemButton>
          </ListItem>
        )}
        {customer?.role === ROLES.admin && (
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/companies')}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <ListAlt sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary={t('COMPANIES_LIST')} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
      <Divider sx={{ borderColor: 'white', marginY: 1, width: '90%', marginX: 'auto' }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Logout sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary={t('LOGOUT')} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Sidebar */}
      <Drawer
        variant={isSmallScreen ? 'temporary' : 'permanent'}
        open={isSmallScreen ? mobileOpen : true}
        onClose={handleDrawerToggle}
        sx={{
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: 'linear-gradient(to bottom, #BF360C, #000000)',
            color: 'white',
          },
        }}
      >
        <Toolbar />
        {drawerContent}
      </Drawer>

      {/* Header */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: 'white',
          color: 'black',
        }}
      >
        <Toolbar>
          {isSmallScreen && (
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Box
              component="img"
              sx={{
                height: 'auto',
                width: 100,
                display: { xs: 'none', md: 'flex' },
                mr: 10,
                cursor: 'pointer',
              }}
              alt="logo"
              src={logo}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1">{customer ? `${customer.crNumber}` : 'Guest'}</Typography>
            <Avatar sx={{ cursor: 'pointer', margin: 1 }}>{/* Optional Avatar */}</Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 3,
          marginLeft: { sm: `${drawerWidth}px` },
          marginTop: '64px',
          minHeight: '100vh',
        }}
      >
        {heading && (
          <Typography variant="h5" gutterBottom>
            {heading}
          </Typography>
        )}
        {subheading && (
          <Typography variant="body2" gutterBottom marginBottom={3}>
            {subheading}
          </Typography>
        )}
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
