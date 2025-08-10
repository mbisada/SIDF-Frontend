import { useNavigate } from 'react-router-dom';
import { Stack, Typography, Link } from '@mui/material';
const BottomBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Stack direction="row" spacing={'30px'} style={{ alignSelf: 'center' }}>
        <Typography variant="body2" color="#221AFB" fontWeight={'bold'}>
          <Link href="/register" underline="none" color="#221AFB">
            Contact US
          </Link>
        </Typography>

        <Typography variant="body2" color="#221AFB" fontWeight={'bold'}>
          <Link href="/register" underline="none" color="#221AFB">
            Terms and Conditions
          </Link>
        </Typography>

        <Typography variant="body2" color="#221AFB" fontWeight={'bold'}>
          <Link href="/login" underline="none" color="#221AFB">
            FAQ
          </Link>
        </Typography>

        <Typography variant="body2" color="#221AFB" fontWeight={'bold'}>
          <Link href="/register" underline="none" color="#221AFB">
            Online Sequrity Conditions
          </Link>
        </Typography>

        <Typography variant="body2" color="#221AFB" fontWeight={'bold'}>
          <Link href="/register" underline="none" color="#221AFB">
            Privacy Policy
          </Link>
        </Typography>

        <Typography variant="body2" color="#221AFB" fontWeight={'bold'}>
          <Link href="/register" underline="none" color="#221AFB">
            e-KYC
          </Link>
        </Typography>

        <Typography variant="body2" color="#221AFB" fontWeight={'bold'}>
          <Link href="/register" underline="none" color="#221AFB">
            Finantial Products
          </Link>
        </Typography>
      </Stack>
    </>
  );
};
export default BottomBar;
