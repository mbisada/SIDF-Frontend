import { Box, Button, Typography } from '@mui/material';

import ic_close from '../../assets/ic_close.svg';

interface Props {
  close: Function;
}
const PreferredWayDialog: React.FC<Props> = ({ close }) => {
  return (
    <Box
      style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: '100%',
        height: '100%',
        zIndex: 100,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      display={'flex'}
    >
      <Box
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          width: '640px',
          height: '480px',
          backgroundColor: 'white',
          borderRadius: '12px',
        }}
      >
        <Box
          style={{
            flexDirection: 'row',
            display: 'flex',
            paddingLeft: '39px',
            paddingRight: '26.3px',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            alignContent: 'flex-start',
            backgroundColor: 'white',
            width: '100%',
            height: '130px',
            flexShrink: 0,
            borderRadius: '27px',
            borderWidth: '1px',
            borderColor: '#E5E5E5',
            marginTop: 10,
          }}
        >
          <Box style={{ flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'flex-start', width: '80%', marginTop: 36 }}>
            <Typography variant="body2" color="black" fontWeight={'bold'} fontSize={'29px'} style={{ whiteSpace: 'pre-wrap' }}>
              {`Choose your preferred\nway to complete the process`}
            </Typography>
          </Box>
          <Box
            style={{ marginTop: 27 }}
            component="img"
            loading="lazy"
            sx={{
              height: '40px',
              width: '40px',
            }}
            alt="neotek logo"
            src={ic_close}
            onClick={() => {
              close();
            }}
            paddingTop={1}
          />
        </Box>

        <Typography variant="body2" color="#475467" fontWeight={'400'} fontSize={'22px'} style={{ marginLeft: 39, marginRight: 39 }}>
          {`We can generate a QR code for you to continue your journey from your mobile`}
        </Typography>

        <Button
          type="submit"
          variant="contained"
          autoCapitalize="off"
          disableElevation
          style={{
            backgroundColor: '#F36D21',
            alignSelf: 'flex-end',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '88%',
            height: '72px',
            borderRadius: '10px',
            fontSize: '13px',
            textTransform: 'none',
            marginLeft: 39,
            marginRight: 39,
            marginTop: 57,
          }}
          onClick={() => {
            close();
          }}
          fullWidth
          sx={{
            padding: 1,
            borderRadius: 2,
            fontWeight: 700,
          }}
        >
          <Typography
            variant="body2"
            color="black"
            fontWeight={'600'}
            fontSize={'15px'}
            style={{ backgroundColor: 'white', borderRadius: '10px', width: 127, height: 63, paddingTop: 19 }}
          >
            {`Recommended`}
          </Typography>
          <Typography variant="body2" color="white" fontWeight={'400'} fontSize={'22px'} style={{ marginLeft: 34 }}>
            {'Generate a QR code for me'}
          </Typography>
        </Button>

        <Button
          type="submit"
          variant="contained"
          autoCapitalize="off"
          disableElevation
          style={{
            backgroundColor: 'white',
            border: '1px solid #D0D5DD',
            alignSelf: 'flex-end',
            width: '88%',
            height: '72px',
            borderRadius: '10px',
            fontSize: '26px',
            textTransform: 'none',
            color: 'black',
            marginLeft: 39,
            marginRight: 39,
            marginTop: 10,
            fontWeight: 600,
          }}
          onClick={() => {
            close();
          }}
          fullWidth
          sx={{
            padding: 1,
            borderRadius: 2,
            fontWeight: 700,
          }}
        >
          {'Automatically redirect me'}
        </Button>
      </Box>
    </Box>
  );
};

export default PreferredWayDialog;
