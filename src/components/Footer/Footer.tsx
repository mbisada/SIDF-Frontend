
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        py: 2,
        textAlign: 'center',
      }}
    >
      <Container>
        <Typography variant="body2">
          © {new Date().getFullYear()} Saudi Industrial Development Fund
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
