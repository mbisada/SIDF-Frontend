import { Box, Typography } from '@mui/material';

import bookmark from '../../assets/bookmark.svg';
import ic_down_arrow from '../../assets/ic_down_arrow.svg';
import Logo from '../../assets/Logo.svg';
import notification from '../../assets/notification.svg';
import search from '../../assets/search.svg';
import test_man from '../../assets/test_man.svg';

interface IBookmark {
  show: (visible: boolean) => void;
}
const TopBar: React.FC<IBookmark> = ({ show }) => {
  return (
    <Box
      style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: '100%' }}
      display={'flex'}
      sx={{
        padding: 3,
        borderRadius: 2,
      }}
    >
      <Box
        component="img"
        loading="lazy"
        sx={{
          height: '50px',
          width: '180px',
        }}
        alt="neotek logo"
        src={Logo}
      />

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
            show(true);
          }}
        />

        <Box
          component="img"
          loading="lazy"
          sx={{
            height: '40px',
            width: '52px',
          }}
          alt="neotek logo"
          src={search}
        />
        <Box
          component="img"
          loading="lazy"
          sx={{
            height: '40px',
            width: '52px',
          }}
          alt="neotek logo"
          src={notification}
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
          }}
          onClick={() => { }}
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
          <Box style={{ flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'center', marginLeft: '2px' }}>
            <Typography variant="body2" color="black" fontWeight={'bold'} fontSize={'15px'} style={{ marginTop: 2 }}>
              Fahad & Co
            </Typography>
            <Typography variant="body2" color="#72788E" fontWeight={'400'} fontSize={'12px'} style={{ marginTop: 2 }}>
              Email@gmail.com
            </Typography>
          </Box>
          <Box style={{ flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'center' }}>
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
      </Box>
    </Box>
  );
};

export default TopBar;
