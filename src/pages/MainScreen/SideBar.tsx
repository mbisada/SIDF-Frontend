import { Box, Typography } from '@mui/material';

import ic_consent_details from '../../assets/ic_consent_details.svg';
import ic_dashboard from '../../assets/ic_dashboard.svg';
import GradientBackground from '../../components/GradientBackground';

interface SideBarProps {
  selected?: string;
  onClick: (selected: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ selected, onClick }) => {
  return (
    <Box style={{ alignItems: 'flex-start', borderRadius: '26px', overflow: 'hidden', height: '100' }} display={'flex'}>
      <GradientBackground alignItems="flex-start" justifyContent="flex-start" flexDirection="column">
        <Box
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            alignContent: 'center',
            marginTop: 32,
            marginLeft: 16,
            paddingLeft: 8,
            backgroundColor: `rgba(255, 255, 255, ${selected === 'Dashboard' ? 0.2 : 0} )`,
            width: '200px',
            height: '40px',
            borderRadius: '6px',
          }}
          display={'flex'}
        >
          <Box
            component="img"
            loading="lazy"
            sx={{
              height: '24px',
              width: '24px',
            }}
            alt="neotek logo"
            src={ic_dashboard}
          />
          <Typography
            variant="body2"
            color="white"
            fontWeight={'500'}
            fontSize={'14px'}
            style={{ marginLeft: 8 }}
            onClick={() => {
              onClick('Dashboard');
            }}
          >
            Dashboard
          </Typography>
        </Box>

        <Box
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            alignContent: 'center',
            marginLeft: 16,
            paddingLeft: 8,
            backgroundColor: `rgba(255, 255, 255, ${selected === 'Consent Details' ? 0.2 : 0} )`,
            width: '200px',
            height: '40px',
            borderRadius: '6px',
          }}
          display={'flex'}
        >
          <Box
            component="img"
            loading="lazy"
            sx={{
              height: '24px',
              width: '24px',
            }}
            alt="neotek logo"
            src={ic_consent_details}
          />
          <Typography
            variant="body2"
            color="white"
            fontWeight={'500'}
            fontSize={'14px'}
            style={{ marginLeft: 8 }}
            onClick={() => {
              onClick('Consent Details');
            }}
          >
            Consent Details
          </Typography>
        </Box>
      </GradientBackground>
    </Box>
  );
};

export default SideBar;
