import { Box, Typography } from '@mui/material';
import ic_close from '../../assets/ic_close.svg';
import ClipLoader from 'react-spinners/ClipLoader';

interface Props {
  close: Function;
  QrCode: string;
  loading?: boolean;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',

  borderRadius: '20px !important',
};
const QrCodeDialog: React.FC<Props> = ({ QrCode, close, loading }) => {
  return (
    <Box sx={style}>
      <Box
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          borderRadius: '20px !important',
          padding: '20px',
        }}
      >
        <Box
          style={{
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            columnGap: '10px',
          }}
        >
          <Box sx={{ flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'flex-start', width: '100%' }}>
            <Typography variant="body2" color="black" fontWeight={'bold'} fontSize={'18px'} style={{ maxWidth: '70%' }}>
              Scan QR code
            </Typography>
          </Box>

          <Box
            style={{}}
            component="img"
            loading="lazy"
            sx={{
              height: '24px',
              width: '24px',
            }}
            alt="neotek logo"
            src={ic_close}
            onClick={() => {
              close();
            }}
            paddingTop={1}
          />
        </Box>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', margin: '20px 0px' }}>
            <ClipLoader
              color={'#F36D21'}
              loading={loading}
              size={30}
              speedMultiplier={0.7}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </Box>
        )}
        {QrCode && (
          <div style={{ padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={QrCode} alt="QR Code" />
          </div>
        )}
      </Box>
    </Box>
  );
};

export default QrCodeDialog;
