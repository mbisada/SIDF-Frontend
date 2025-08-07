import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { /* Button, */ CardContent } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { grey } from '@mui/material/colors';
//import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
//import { useCustomer } from '../../contexts/CustomerContext/useContext';
//import { useNavigate } from 'react-router-dom';

interface ProfileCardProps {
  crNumber?: string;
  mobileNumber?: string;
  email?: string;
  companyName?: string;
  banks?: string;
}
export default function ProfileCard({ crNumber, mobileNumber, email, companyName, banks }: ProfileCardProps) {
  // const {customer} = useCustomer()

  /*   const navigate = useNavigate()
  const handleNavigateClick = () =>{
    navigate('/companies/1235678')
  } */

  return (
    <Card sx={{ width: '100%', marginY: 1, flexDirection: 'row', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'stretch', backgroundColor: 'white', border: '1px solid #DADADA' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}>
        <div style={{ display: 'flex', flexDirection: 'column', margin: 3 }}>

          <CardHeader
            style={{ padding: 0, margin: 0 }}
            avatar={
              <Avatar sx={{ bgcolor: grey[500], width: 50, height: 50, borderRadius: 25, }} aria-label="recipe">
                <AccountBalanceIcon fontSize="small" />
              </Avatar>
            }

            title={companyName}
            titleTypographyProps={{ variant: 'h6', fontWeight: 'bold', color: '#272424' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', margin: 3, marginTop: '20px' }}>
          <Typography variant="body2" sx={{ color: '#777777', fontWeight: '400' }}>
            Email
          </Typography>
          <Typography variant="body1" fontWeight={'600'} sx={{ color: '#272424', }}>
            {email ?? ''}
          </Typography>
        </div>

      </CardContent>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}>
        <div style={{ display: 'flex', flexDirection: 'column', margin: 3 }}>
          <Typography variant="body2" sx={{ color: '#777777', fontWeight: '400' }}>
            banks
          </Typography>
          <Typography variant="body1" fontWeight={'600'} sx={{ color: '#272424', }}>
            {banks ?? ''}
          </Typography>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', margin: 3, marginTop: '20px' }}>
          <Typography variant="body2" sx={{ color: '#777777', fontWeight: '400' }}>
            Mobile
          </Typography>
          <Typography variant="body1" fontWeight={'600'} sx={{ color: '#272424', }}>
            {mobileNumber ?? ''}
          </Typography>
        </div>

      </CardContent>

      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}>
        <div style={{ display: 'flex', flexDirection: 'column', margin: 3 }}>

        </div>

        <div style={{ display: 'flex', flexDirection: 'column', margin: 3, marginTop: '20px' }}>
          <Typography variant="body2" sx={{ color: '#777777', fontWeight: '400' }}>
            CR Number
          </Typography>
          <Typography variant="body1" fontWeight={'600'} sx={{ color: '#272424', }}>
            {crNumber ?? ''}
          </Typography>
        </div >
      </CardContent >
    </Card >
  );
}
