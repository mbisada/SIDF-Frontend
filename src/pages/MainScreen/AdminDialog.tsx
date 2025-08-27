import { Box, Button, Typography } from '@mui/material';
import UnionText from './UnionText';
import bookmark from '../../assets/bookmark.svg';
import ic_close from '../../assets/ic_close.svg';

interface Props {
  close: Function;
}
const AdminDialog: React.FC<Props> = ({ close }) => {
  return (
    <Box
      style={{
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
          paddingBottom: '20px',
          backgroundColor: 'white',
          borderRadius: '12px',
        }}
      >
        <Box
          style={{
            flexDirection: 'row',
            display: 'flex',
            paddingLeft: '26.3px',
            paddingRight: '26.3px',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            alignContent: 'flex-start',
            backgroundColor: 'white',
            width: '100%',
            height: '93px',
            flexShrink: 0,
            borderRadius: '27px',
            borderWidth: '1px',
            borderColor: '#E5E5E5',
            marginTop: 10,
          }}
        >
          <Box
            style={{ marginTop: 27 }}
            component="img"
            loading="lazy"
            sx={{
              height: '48px',
              width: '48px',
            }}
            alt="neotek logo"
            src={bookmark}
            paddingTop={1}
          />
          <Box style={{ flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'flex-start', width: '80%', marginTop: 36 }}>
            <Typography variant="body2" color="black" fontWeight={'bold'} fontSize={'18px'} style={{}}>
              User Guide
            </Typography>
            <Typography variant="body2" color="#475467" fontWeight={'400'} fontSize={'10px'} style={{ marginTop: 0 }}>
              This guide helps you explaining how to use and utilize the portal
            </Typography>
          </Box>
          <Box
            style={{ marginTop: 27 }}
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

        <Box style={{ width: '100%', alignSelf: 'center', backgroundColor: '#E5E5E5', height: '1px' }} />

        <Box style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignContent: 'center', marginTop: 12 }} />
        <UnionText text={'Select the customer'} />
        <UnionText text={'View dashboard of the customer details'} />
        <UnionText text={'Export Reports of Summary and detailed report'} />

        <Box style={{ width: '100%', alignSelf: 'center', backgroundColor: '#E5E5E5', height: '1px', marginTop: 32 }} />

        <Box
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            alignContent: 'flex-end',
            marginTop: 12,
            marginRight: 24,
          }}
          display={'flex'}
        >
          <Button
            type="submit"
            variant="contained"
            autoCapitalize="off"
            disableElevation
            style={{
              backgroundColor: 'white',
              border: '1px solid #F36D21',
              alignSelf: 'flex-end',
              width: '80px',
              height: '48px',
              borderRadius: '10px',
              fontSize: '13px',
              textTransform: 'none',
              marginRight: 12,
              color: '#F36D21',
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
            {'Cancel'}
          </Button>

          <Button
            type="submit"
            variant="contained"
            autoCapitalize="off"
            disableElevation
            style={{
              backgroundColor: '#F36D21',
              alignSelf: 'flex-end',
              width: '80px',
              height: '48px',
              borderRadius: '10px',
              fontSize: '13px',
              textTransform: 'none',
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
            {'Got it'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDialog;
