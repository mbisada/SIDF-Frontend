import { Box, Button, Stack, Typography } from '@mui/material';

export const BankTabs = ({
  financialInstitutions,
  setCurrentFinancialInstitution,
  currentFinancialInstitution
}: {
  financialInstitutions: any[];
  setCurrentFinancialInstitution: (institution: any) => void;
  currentFinancialInstitution: any;
}) => {
  const allBank = { FinancialInstitutionId: 'All', FinancialInstitutionName: { NameEn: 'All' } };
  const banks = [allBank, ...financialInstitutions];

  return (
    <Box sx={{ backgroundColor: '#f9f1eb', borderRadius: 2, display: 'inline-block' }}>
      <Stack direction="row" spacing={3} alignItems="center" paddingInline={1.3} paddingBlock={.5}>
        {banks.map(bank =>
          bank.FinancialInstitutionId === currentFinancialInstitution ? (
            <Button
              key={bank.FinancialInstitutionId}
              onClick={() => {

                setCurrentFinancialInstitution(bank.FinancialInstitutionId);
              }}
              variant="contained"
              sx={{
                backgroundColor: 'white',
                color: 'black',
                fontWeight: 'bold',
                borderRadius: 3,
                boxShadow: 3,
                px: 3,
                py: 1,
                minWidth: 'auto',
              }}
            >
              {bank.FinancialInstitutionName.NameEn}
            </Button>
          ) : (
            <Typography
              key={bank.FinancialInstitutionId}
              onClick={() => {

                setCurrentFinancialInstitution(bank.FinancialInstitutionId);
              }}
              sx={{
                cursor: 'pointer',
                color: '#7a7a7a',
              }}
            >
              {bank.FinancialInstitutionName.NameEn}
            </Typography>
          )
        )}
      </Stack>
    </Box>
  );
};
