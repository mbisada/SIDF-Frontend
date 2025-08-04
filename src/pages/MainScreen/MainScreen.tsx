import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Link, Typography } from '@mui/material';

import BookMarkDialog from './BookmarkDialog';
import ConsentDetails from './ConsentDetails';
import Dashboard from './Dashbord';
import ExportDialog from './ExportDialog';
import SideBar from './SideBar';
import TopBar from './TopBar';
const MainScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('Dashboard');
  const [showBookmark, setShowBookmark] = useState(false);

  return (
    <Box
      style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignSelf: 'center',
        alignItems: 'flex-start',
        height: '100%',
        width: '100%',
        backgroundColor: '#F4f4f4',
      }}
      display={'flex'}
      sx={{
        width: { xs: '100%', md: '100%' },

        borderRadius: 2,
      }}
      height={'100%'}
    >
      <TopBar
        show={() => {
          setShowBookmark(true);
        }}
      />
      <Box style={{ flexDirection: 'row', alignItems: 'flex-start' }} sx={{ width: '100%' }} display={'flex'}>
        <Box
          style={{ flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'center', justifyContent: 'center', marginLeft: 10 }}
          sx={{ width: '15%' }}
        >
          <SideBar
            selected={selected}
            onClick={(selected: string) => {
              setSelected(selected);
            }}
          />
        </Box>

        {selected === 'Dashboard' && <Dashboard />}
        {selected === 'Consent Details' && <ConsentDetails />}
      </Box>

      {showBookmark && (
        <BookMarkDialog
          close={() => {
            setShowBookmark(false);
          }}
        />
      )}
      {/* {showBookmark && (
        <ExportDialog
          close={() => {
            setShowBookmark(false);
          }}
        />
      )} */}
    </Box>
  );
};

export default MainScreen;
