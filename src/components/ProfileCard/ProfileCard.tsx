import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import Avatar from '@mui/material/Avatar';
//import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import { /* Button, */ CardContent } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
//import { useCustomer } from '../../contexts/CustomerContext/useContext';
//import { useNavigate } from 'react-router-dom';

 interface ProfileCardProps {
 crNumber: string;
 mobileNumber:string;
 email: string;
companyName: string;
} 
export default function ProfileCard( {crNumber,
 mobileNumber,
 email,
companyName }:ProfileCardProps  ) {
 // const {customer} = useCustomer()

/*   const navigate = useNavigate()
  const handleNavigateClick = () =>{
    navigate('/companies/1235678')
  } */
 
  return (
    <Card sx={{width: '100%',  marginY:3}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: grey[500]}} aria-label="recipe">
            <AccountBalanceIcon fontSize='small'/>
          </Avatar>
        }
       
        title={companyName}
      />
      <CardContent sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
        <div  style={{display:'flex', flexDirection:'column', margin:3}}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
         Email
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
         {email ?? ''}
        </Typography>
        </div>
         <div  style={{display:'flex', flexDirection:'column', margin:3}}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
         Mobile Number
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
         {mobileNumber??''}
        </Typography>
        </div>
         <div  style={{display:'flex', flexDirection:'column', margin:3}}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
         CR Number
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
         {crNumber??''}
        </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
