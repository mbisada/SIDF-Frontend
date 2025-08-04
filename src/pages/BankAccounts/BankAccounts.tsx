import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';

import backArrow from '../../assets/backArrow.svg';
import ic_account from '../../assets/ic_account.svg';
import ic_selected from '../../assets/ic_selected.svg';
import ic_unselected from '../../assets/ic_unselected.svg';
import BottomBar from '../RaghiLogin/BottomBar';

const BankAccounts: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const [accounts, setAccounts] = useState([
    { name: 'Current Account', number: '9034', selected: false },
    { name: 'Current Account', number: '1234', selected: false },
    { name: 'Current Account', number: '4536', selected: false },
    { name: 'Current Account', number: '4572', selected: false },
    { name: 'Current Account', number: '5736', selected: false },
  ]);

  const handleClick = (index: number) => {
    setAccounts(prevAccounts => prevAccounts.map((account, i) => (i === index ? { ...account, selected: !account.selected } : account)));
  };

  function List() {
    return accounts.map((account, index) => {
      return (
        <Box
          key={index}
          style={{
            flexDirection: 'row',
            display: 'flex',
            paddingLeft: '26.3px',
            paddingRight: '26.3px',
            justifyContent: 'space-between',
            alignContent: 'center',
            backgroundColor: '#F7F8FA',
            width: '400px',
            height: '80px',
            marginTop: 10,
            borderRadius: '26px',
          }}
          onClick={() => handleClick(index)}
        >
          <Box
            style={{ alignSelf: 'center' }}
            component="img"
            loading="lazy"
            sx={{
              height: '65px',
              width: '65px',
            }}
            alt="neotek logo"
            src={ic_account}
            paddingTop={1}
          />
          <Box style={{ flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'center', width: '65%' }}>
            <Typography variant="body2" color="black" fontWeight={'bold'} fontSize={'14px'} style={{ marginTop: 10 }}>
              {account.name}
            </Typography>
            <Typography variant="body2" color="#72788E" fontWeight={'400'} fontSize={'14px'} style={{ marginTop: 5 }}>
              &#8226; {account.number}
            </Typography>
          </Box>
          <Box style={{ flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'center' }}>
            <Box
              component="img"
              loading="lazy"
              sx={{
                height: '40px',
                width: '40px',
              }}
              alt="neotek logo"
              src={account.selected ? ic_selected : ic_unselected}
              paddingTop={1}
            />
          </Box>
        </Box>
      );
    });
  }
  return (
    <Box
      sx={{
        width: { xs: '100%', md: '100%' },

        padding: 3,
        borderRadius: 2,
      }}
      height={'100vh'}
      flexDirection={'column'}
      alignItems={'flex-start'}
      alignContent={'space-between'}
      justifyContent={'space-between'}
      display={'flex'}
    >
      <Box style={{ flexDirection: 'column', justifyContent: 'flex-start', alignSelf: 'flex-start' }}>
        <Box
          component="img"
          loading="lazy"
          sx={{
            height: 43,
            width: 43,
          }}
          alt="neotek logo"
          src={backArrow}
          marginTop={6}
          paddingTop={1}
          onClick={() => navigate(-1)}
        />
        <Typography variant="body2" color="black" fontWeight={'bold'} style={{ marginTop: 10 }}>
          Select which bank account you want to share
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)', // 3 equal columns
            gap: 2, // spacing between grid items, adjust as needed
            width: '100%',
            maxWidth: 1240, // or whatever width fits your design
            margin: 'auto',
          }}
        >
          <List />
        </Box>
        <Box
          style={{
            flexDirection: 'column',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            alignContent: 'flex-end',
            alignSelf: 'flex-end',
            width: '100%',
          }}
        >
          <Button
            type="submit"
            variant="contained"
            autoCapitalize="off"
            style={{
              backgroundColor: '#221AFB',
              alignSelf: 'flex-end',
              height: '52px',
              borderRadius: '15px',
              marginTop: '42px',
              width: '150px',
            }}
            onClick={() => {
              navigate('/raghi-bank-success-login');
            }}
            fullWidth
            sx={{
              padding: 1,
              borderRadius: 2,
              fontWeight: 700,
            }}
            loading={isLoading}
          >
            {'Confirm'}
          </Button>
        </Box>
      </Box>

      <div style={{ flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'center' }}>
        <BottomBar />
      </div>
    </Box>
  );
};

export default BankAccounts;
