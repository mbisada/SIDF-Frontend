import React, { ReactNode } from 'react';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';

import { ListAlt, Logout } from '@mui/icons-material';
import Dasboard from '../../assets/Dasboard.svg';
import Consents from '../../assets/Consents.svg';

import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
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
  Modal,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import bookmark from '../../assets/bookmark.svg';
import ic_down_arrow from '../../assets/ic_down_arrow.svg';
import logo from '../../assets/Logo.png';
import test_man from '../../assets/test_man.svg';
import { ROLES } from '../../constants/roles';
import { useCustomer } from '../../contexts/CustomerContext/useContext';
import { useLogout } from '../../hooks/useLogout';
import BookMarkDialog from '../../pages/MainScreen/BookmarkDialog';
import AdminDialog from '../../pages/MainScreen/AdminDialog';

interface LayoutProps {
  breadcrumbs?: { label: string; href?: string }[];
  heading?: string;
  subheading?: string;
  children: ReactNode;
}

const drawerWidth = 240;

const Layout: React.FC<LayoutProps> = ({ heading, subheading, children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);
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
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/ob-connect')}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Box
                    component="img"
                    loading="lazy"
                    sx={{
                      height: '25px',
                      width: '25px',
                    }}
                    alt="neotek logo"
                    src={Dasboard}
                  />
                </ListItemIcon>
                <ListItemText primary={t('Dashboard')} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/consent-details')}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Box
                    component="img"
                    loading="lazy"
                    sx={{
                      height: '25px',
                      width: '25px',
                    }}
                    alt="neotek logo"
                    src={Consents}
                  />
                </ListItemIcon>
                <ListItemText primary={t('Consents Details')} />
              </ListItemButton>
            </ListItem>
          </>
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
    <Box sx={{ display: 'flex', backgroundColor: 'rgb(249, 248, 251)' }}>
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
            background: 'linear-gradient(to bottom, #F26F22, #000000)',
            color: 'white',
            borderTopRightRadius: '26px',
            borderTopLeftRadius: '26px',
            marginTop: '69px',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Header */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: 'white',
          color: 'black',
          '--Paper-shadow': 'none !important',
        }}
      >
        <Toolbar style={{ backgroundColor: '#f9f8fb' }}>
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
                display: { md: 'flex' },
                mr: 10,
                cursor: 'pointer',
              }}
              alt="logo"
              src={logo}
            />
          </Box>
          <Box style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }} display={'flex'}>
            <Box
              component="img"
              loading="lazy"
              sx={{
                height: '40px',
                width: '52px',
              }}
              alt="neotek logo"
              src={bookmark}
              onClick={() => {
                setShow(true);
              }}
            />

            <Box
              style={{
                flexDirection: 'row',
                display: 'flex',
                paddingLeft: '18px',
                paddingRight: '16px',
                justifyContent: 'space-between',
                alignContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F7F8FA',
                width: '240px',
                height: '54px',
                marginLeft: 6,
                borderRadius: '16px',
                border: '1px solid #E9E9E9',
              }}
              onClick={() => { }}
            >
              <Box
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', columnGap: '10px' }}
              >
                <Box
                  style={{ alignSelf: 'center' }}
                  component="img"
                  loading="lazy"
                  sx={{
                    height: '40px',
                    width: '40px',
                  }}
                  alt="neotek logo"
                  src={test_man}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="body2" color="black" fontWeight={'bold'} fontSize={'15px'} style={{ marginTop: 2 }}>
                    {customer?.name}
                  </Typography>
                  <Typography variant="body2" color="#72788E" fontWeight={'400'} fontSize={'12px'} style={{ marginTop: 2 }}>
                    {customer?.email}
                  </Typography>
                </Box>
              </Box>
              <Box
                component="img"
                loading="lazy"
                sx={{
                  height: '24px',
                  width: '24px',
                }}
                alt="neotek logo"
                src={ic_down_arrow}
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 1,
          marginLeft: { sm: `${drawerWidth}px` },
          marginTop: '64px',
          minHeight: '100vh',
          backgroundColor: '#f9f8fb',
        }}
      >
        {heading && (
          <Typography variant="h5" gutterBottom color="#151538">
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

      <Modal open={show} onClose={() => setShow(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        {customer?.role == 'ROLE_USER' ? <BookMarkDialog close={() => setShow(false)} /> : <AdminDialog close={() => setShow(false)} />}
      </Modal>
    </Box>
  );
};

export default Layout;
