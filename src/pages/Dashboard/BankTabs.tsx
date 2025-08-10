import { Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';

export const BankTabs = ({
  financialInstitutions,
  setCurrentFinancialInstitution,
}: {
  financialInstitutions: any[];
  setCurrentFinancialInstitution: (institution: any) => void;
}) => {
  const [selected, setSelected] = useState<any>('All');
  const banks = [{ FinancialInstitutionName: { NameEn: 'All' } }, ...financialInstitutions];

  return (
    <Box
      sx={{
        backgroundColor: '#f9f1eb',
        borderRadius: 2,
        display: 'inline-block',
      }}
    >
      <Stack direction="row" paddingInline={2} spacing={3} alignItems="center">
        {banks.map(bank =>
          bank.FinancialInstitutionId === selected.FinancialInstitutionId ? (
            <Button
              key={bank}
              onClick={() => {
                (setSelected(bank), setCurrentFinancialInstitution(bank.FinancialInstitutionId));
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
              key={bank}
              onClick={() => {
                (setSelected(bank), setCurrentFinancialInstitution(bank.FinancialInstitutionId));
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
