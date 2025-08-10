import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import { Button, CardContent, } from '@mui/material';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useNavigate } from 'react-router-dom';

interface CompanyCardProps {
  crNumber: string;
  identifier: string;
}
export default function CompanyCard({ crNumber, identifier }: CompanyCardProps) {
  const navigate = useNavigate();
  const handleNavigateClick = () => {
    navigate(`/companies/${crNumber}`, {
      state: {},
    });
  };

  return (
    <div style={{ width: '50%' }}  >
      <Card sx={{ margin: 1, padding: 1, height: '100%', backgroundColor: 'white', border: '1px solid #DADADA', paddingBottom: '0px' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: grey[500] }} aria-label="recipe">
              <AccountBalanceIcon fontSize="small" />
            </Avatar>
          }
          action={
            <Button variant="contained" onClick={handleNavigateClick} style={{ borderRadius: '8px' }}>
              <Typography variant="body2" color="white" fontWeight={'600'} fontSize={'13px'} style={{ padding: '5px' }}>
                View Details
              </Typography>
            </Button>
          }
          title={identifier}
          titleTypographyProps={{ variant: 'body2', fontWeight: 'bold', color: '#272424' }}
        //subheader="September 14, 2016"
        />
        <CardContent style={{ paddingBottom: '0px', paddingTop: '0px' }}>
          <Typography variant="body2" fontWeight={'light'} sx={{ color: '#777777' }}>
            CR Number
          </Typography>
          <Typography variant="body1" fontWeight={'600'} sx={{ color: '#272424' }}>
            {crNumber}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
