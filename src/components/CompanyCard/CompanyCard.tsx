import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box, Button, CardContent } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import dashboardIcon from "../../assets/dashboardIcon.svg"
interface CompanyCardProps {
  crNumber: string;
  identifier: string;
  calculationStatus: string
}
export default function CompanyCard({ crNumber, identifier, calculationStatus }: CompanyCardProps) {
  const navigate = useNavigate();
  const handleNavigateClick = () => {

    calculationStatus == "COMPLETED" ?
      navigate(`/companies/${crNumber}`, {
        state: {},
      }) : null
  };

  return (
    <div style={{ width: '50%' }}>
      <Card sx={{ margin: 1, padding: .5, height: '100%', backgroundColor: 'white', border: '1px solid #DADADA', paddingBottom: '0px' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ border: '1px solid #DADADA', bgcolor: '#F9F9F9', width: 50, height: 50, borderRadius: 25 }} aria-label="recipe">
              <Box
                component="img"
                loading="lazy"
                sx={{
                  width: '18px',
                  height: '18px',
                }}
                alt="empty accounts list"
                src={dashboardIcon}
              />
            </Avatar>
          }
          action={
            <Button variant={"contained"} onClick={handleNavigateClick} style={{ backgroundColor: calculationStatus == "COMPLETED" ? '' : 'gray', borderRadius: '8px', }}>
              <Typography variant="body2" color="white" fontWeight={'600'} fontSize={'13px'} style={{ padding: '5px' }}>
                {calculationStatus == "COMPLETED" ? "View Details" : "No Details Available"}
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
    </div >
  );
}
