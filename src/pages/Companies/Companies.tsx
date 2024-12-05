import { useEffect, useState } from 'react'
import Layout from '../../templates/Layout'
import { Box } from '@mui/material'
import CompanyCard from '../../components/CompanyCard';

function Companies() {
  const [companiesList, setCompaniesList] = useState<{name:string, crNumber:string}[]>();

  useEffect(()=>{
  //TODO: Add api call to get all companies
setCompaniesList([{name: 'SUMO', crNumber:'1235678'}, {name: 'Shawrmer', crNumber:'1235678'},  {name: 'Shawrmer2', crNumber:'1235678'},  {name: 'Shawrmer3', crNumber:'1235678'}])
  },[])

  return (
    <div>   
      <Layout
      breadcrumbs={[
        { label: 'Dashboard', href: '/' },
        { label: 'Companies List Details' , href:'/companies'},
      ]}
      heading="Companies List Details"
    //  subheading="Select One Of The Supported Banks To Request Your Financial Data" */
    >
      <Box
        sx={{
          width: '100%',
          height: 'fit-content',
          display:'flex',
          flexDirection:'row',
          flexWrap: 'wrap',
          alignItems:'center',
          justifyContent:'space-between'
        }}
      >
      {companiesList && companiesList.length> 0 && companiesList?.map((company)=>{
        return <CompanyCard identifier={company.name} crNumber={company.crNumber}/>
      })}
      </Box>
    </Layout>
  </div>
  )
}

export default Companies