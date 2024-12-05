import { useEffect, useState } from 'react';
import Layout from '../../templates/Layout';
import { Box, Typography } from '@mui/material';
import CompanyCard from '../../components/CompanyCard';
import { useAdminServices } from '../../services/admin/admin';
import { CompaniesListDTOMapper } from '../../services/admin/adminDTOMappers';
import { CompaniesListDTO, Company } from '../../services/admin/admin.types';

function Companies() {
  const [companiesList, setCompaniesList] = useState<Company[]>([
    {
      id: 1,
      email: 'test@test.com',
      companyName: 'Tech Solutions Ltd.',
      mobileNumber: '1234567890',
      status: 'INITIATED',
      psuid: null,
      role: 'ADMIN',
    },
    {
      id: 3,
      email: 'test1@test.com',
      companyName: 'Tech Solutions Ltd.',
      mobileNumber: '1234567890',
      status: 'INITIATED',
      psuid: '9999999999',
      role: 'USER',
    },
    {
      id: 8,
      email: 'test3@test.com',
      companyName: 'Tech Solutions Ltd.',
      mobileNumber: '1234567890',
      status: 'INITIATED',
      psuid: 'PSU1233456',
      role: 'USER',
    },
  ]);
  const { getCompaniesList } = useAdminServices();

  useEffect(() => {
    // setIsLoading(true);
    void getCompaniesList('NEW') //NOW WE GET NEW REQUESTS ONLY
      .then(data => CompaniesListDTOMapper(data.data as unknown as CompaniesListDTO))
      .then(result => setCompaniesList(result))
      .catch(() => {
        return;
      });
    // .finally(() => setLoading(false));
  }, []);
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
              return <CompanyCard identifier={company.companyName} crNumber={company.psuid ?? ''} />;
            })}
        </Box>
      </Layout>
    </div>
  );
}

export default Companies;
