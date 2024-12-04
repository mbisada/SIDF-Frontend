// src/components/Layout.tsx
import React, { ReactNode } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Breadcrumbs,
  Link,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  ListItemButton
} from '@mui/material';
import {  Dashboard, ListAlt, Notifications, Search } from '@mui/icons-material';
import { useCustomer } from '../../contexts/CustomerContext/useContext';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import logo  from '../../assets/Logo.png'
interface LayoutProps {
  breadcrumbs: { label: string; href?: string }[];
  heading?: string;
  subheading?: string;
  children: ReactNode;
}

const drawerWidth = 240;

const Layout: React.FC<LayoutProps> = ({ breadcrumbs, heading, subheading, children }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { customer, setCustomer } = useCustomer();
const navigate = useNavigate()
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuLogoutClose = () => {
    setAnchorEl(null);
    setCustomer(null)
    navigate('/login')
  };

    const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
         // width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: 'linear-gradient(to bottom, #BF360C, #000000)',
            color: 'white',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', paddingTop: 2 }}>
          <List>
            <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Dashboard sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding >
            <ListItemButton>
              <ListItemIcon>
                <ListAlt sx={{ color: 'white' }} />
              </ListItemIcon>
                <ListItemText primary="Companies List Details" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Header */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'white',
          color: 'black',
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
           {/*  <IconButton>
              <Search />
            </IconButton>
            <IconButton>
              <Notifications />
            </IconButton> */}
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
              //onClick={() => navigate(i18n.language + '/')}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1">
              {customer ? `${customer.crNumber}` : 'Guest'}
            </Typography>
            <Avatar
              onClick={handleMenuOpen}
              sx={{ cursor: 'pointer', margin:1 }}
            >
              <PersonIcon/>
              </Avatar>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{ mt: '45px' }}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuLogoutClose}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 3,
          marginLeft: `${drawerWidth}px`,
          marginTop: '64px',
          minHeight: '100vh',
        }}
      >
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
          {breadcrumbs.map((breadcrumb, index) => (
            <Link
              key={index}
              href={breadcrumb.href || '#'}
              underline={breadcrumb.href ? 'hover' : 'none'}
              color={breadcrumb.href ? 'inherit' : 'text.primary'}
            >
              {breadcrumb.label}
            </Link>
          ))}
        </Breadcrumbs>
        {heading && <Typography variant="h5" gutterBottom>
          {heading}
        </Typography>}
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
