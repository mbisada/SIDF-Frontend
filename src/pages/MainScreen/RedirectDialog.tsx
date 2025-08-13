import { Box, Button, Typography } from '@mui/material';
import ic_close from '../../assets/ic_close.svg';
import ClipLoader from 'react-spinners/ClipLoader';

interface Props {
  close: Function;
  generateQRCode: () => void;
  handleReirection: () => void;
  loading: boolean;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',

  borderRadius: '20px !important',
};
const RedirectDialog: React.FC<Props> = ({ close, handleReirection, generateQRCode, loading }) => {
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
              Choose your preferred way to complete the process
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

        <Typography color="#475467" fontWeight={'400'} fontSize={'12px'} style={{ maxWidth: '70%', marginTop: '10px' }}>
          We can generate a QR code for you to continue your journey from your mobile
        </Typography>

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

        <Button
          onClick={generateQRCode}
          style={{
            marginTop: '20px',
            backgroundColor: '#EF6701',
            color: '#000000',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button style={{ alignSelf: 'flex-start', backgroundColor: '#FAFAFA', color: 'black', fontSize: '10px', padding: ' 10px' }}>
            Recommended
          </Button>
          <Typography variant="body2" fontWeight={'bold'} style={{ alignSelf: 'center', color: 'white' }}>
            Generate a QR code for me
          </Typography>
          <Typography variant="body2" style={{ alignSelf: 'center', color: '#6B7280' }}></Typography>
        </Button>
        <Button
          onClick={handleReirection}
          style={{
            marginTop: '15px',
            padding: '10px 0px',
            backgroundColor: '#FAFAFA',
            color: '#344054',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #D0D5DD',
            fontWeight: 'bold',
          }}
        >
          Automatically redirect me
        </Button>
      </Box>
    </Box>
  );
};

export default RedirectDialog;
