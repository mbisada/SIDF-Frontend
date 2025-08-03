import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import Avatar from '@mui/material/Avatar';
//import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import { Button, CardContent } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useNavigate } from 'react-router-dom';

interface CompanyCardProps {
  crNumber: string;
  identifier: string;
}
export default function CompanyCard({ crNumber, identifier }: CompanyCardProps) {
  const navigate = useNavigate();
  const handleNavigateClick = () => {
    navigate(`/companies/${crNumber}`);
  };

  return (
    <Card sx={{ minWidth: 400, width: 580, margin: 1 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: grey[500] }} aria-label="recipe">
            <AccountBalanceIcon fontSize="small" />
          </Avatar>
        }
        action={
          <Button variant="contained" onClick={handleNavigateClick}>
            View Details
          </Button>
        }
        title={identifier}
        //subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          CR Number
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
          {crNumber}
        </Typography>
      </CardContent>
    </Card>
  );
}
