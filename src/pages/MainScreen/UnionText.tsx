import { Box, Typography } from '@mui/material';
import ic_union from '../../assets/ic_union.svg';

interface Props {
  text: string;
}
const UnionText: React.FC<Props> = ({ text }) => {
  return (
    <Box
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignContent: 'center',
        marginLeft: 16,
        paddingLeft: 8,
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
        src={ic_union}
      />
      <Typography variant="body2" color="#16181C" fontWeight={'400'} fontSize={'18px'} style={{ marginLeft: 8 }}>
        {text}
      </Typography>
    </Box>
  );
};
export default UnionText;
