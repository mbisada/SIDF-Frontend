import { /* Button, */ Box, CardContent } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import dashboardIcon from '../../assets/dashboardIcon.svg';
interface ProfileCardProps {
  crNumber?: string;
  mobileNumber?: string;
  email?: string;
  companyName?: string;
  banks?: string;
  currentFinancialInstitution?: string;
}
export default function ProfileCard({ crNumber, mobileNumber, email, companyName, banks, currentFinancialInstitution }: ProfileCardProps) {
  return (
    <Card
      sx={{
        width: '100%',
        marginY: 1,
        flexDirection: 'row',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: 'white',
        border: '1px solid #DADADA',
        marginTop: '25px',
        borderRadius: '12px',
      }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', margin: 3 }}>
          <CardHeader
            style={{ padding: 0, margin: 0 }}
            avatar={
              <Avatar sx={{ border: '1px solid #DADADA', bgcolor: '#F9F9F9', width: 50, height: 50, borderRadius: 25 }} aria-label="recipe">
                <Box
                  component="img"
                  loading="lazy"
                  sx={{
                    width: '20px',
                    height: '20px',
                  }}
                  alt="empty accounts list"
                  src={dashboardIcon}
                />
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
          <Typography variant="body1" fontWeight={'600'} sx={{ color: '#272424' }}>
            {email ?? ''}
          </Typography>
        </div>
      </CardContent>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', margin: 3 }}>
          <Typography variant="body2" sx={{ color: '#777777', fontWeight: '400' }}>
            Banks
          </Typography>
          <Typography variant="body1" fontWeight={'600'} sx={{ color: '#272424' }}>
            {currentFinancialInstitution == 'All' ? banks : (currentFinancialInstitution ?? '')}
          </Typography>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', margin: 3, marginTop: '20px' }}>
          <Typography variant="body2" sx={{ color: '#777777', fontWeight: '400' }}>
            Mobile
          </Typography>
          <Typography variant="body1" fontWeight={'600'} sx={{ color: '#272424' }}>
            {mobileNumber ?? ''}
          </Typography>
        </div>
      </CardContent>

      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', margin: 3 }}></div>

        <div style={{ display: 'flex', flexDirection: 'column', margin: 3, marginTop: '20px' }}>
          <Typography variant="body2" sx={{ color: '#777777', fontWeight: '400' }}>
            CR Number
          </Typography>
          <Typography variant="body1" fontWeight={'600'} sx={{ color: '#272424' }}>
            {crNumber ?? ''}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
