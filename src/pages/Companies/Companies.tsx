import { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';

import CompanyCard from '../../components/CompanyCard';
import Spinner from '../../components/Spinner';
import { useAdminServices } from '../../services/admin/admin';
import { CompaniesListDTO, Company } from '../../services/admin/admin.types';
import { CompaniesListDTOMapper } from '../../services/admin/adminDTOMappers';
import Layout from '../../templates/Layout';

function Companies() {
  const [companiesList, setCompaniesList] = useState<Company[]>();
  const [isLoading, setIsLoading] = useState(true);
  const { getCompaniesList } = useAdminServices();

  useEffect(() => {
    setIsLoading(true);
    void getCompaniesList('NEW') //NOW WE GET NEW REQUESTS ONLY
      .then(data => CompaniesListDTOMapper(data.data as unknown as CompaniesListDTO))
      .then(result => setCompaniesList(result))
      .catch(() => {
        return;
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div>
      <Layout
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Companies List Details', href: '/companies' },
        ]}
        heading="Companies List Details"
        //  subheading="Select One Of The Supported Banks To Request Your Financial Data" */
      >
        <Box
          sx={{
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
            <Typography variant={'h5'}>{`${companiesList?.length} New requests available`}</Typography>
          </Box>
          {companiesList &&
            companiesList.length > 0 &&
            companiesList?.map(company => {
              return <CompanyCard identifier={company.companyName} key={company.psuid} crNumber={company.psuid ?? ''} />;
            })}
        </Box>
      </Layout>
    </div>
  );
}

export default Companies;
