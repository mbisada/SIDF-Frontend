import { Box, Button, Typography } from '@mui/material';
import ic_export from '../../assets/ic_export.svg';
import ic_close from '../../assets/ic_close.svg';
import ic_unselected from '../../assets/ic_orange_unselected.svg';
import ic_selected from '../../assets/ic_orange_selected.svg';
import ic_orange_radio_unselected from '../../assets/ic_orange_radio_unselected.svg';
import ic_orange_radio_selected from '../../assets/ic_orange_radio_selected.svg';

import ic_pdf from '../../assets/ic_pdf.svg';
import ic_excel from '../../assets/ic_excel.svg';
import { useState } from 'react';
// import html2canvas from "html2canvas";
import { useCustomer } from '../../contexts/CustomerContext/useContext';

interface Props {
  close: Function;
  PSUId: string;
  componentRef: any;
  financialInstitutions: any[];
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  width: '40%',
  borderRadius: '20px !important',
};
const ExportDialog: React.FC<Props> = ({
  close,
  PSUId,
  // componentRef,
  financialInstitutions,
}) => {
  const { customer } = useCustomer();
  const token = import.meta.env.VITE_BACKEND_API_KEY as string;
  const [exportBanks, setExportBanks] = useState<any>([]);

  const [banks, setBanks] = useState([
    {
      FinancialInstitutionId: 'All',
      FinancialInstitutionName: {
        NameEn: 'All',
      },
    },
    ...financialInstitutions,
  ]);

  function List() {
    return banks.map((bank, index) => {
      return (
        <Box
          key={index}
          style={{
            flexDirection: 'row',
            borderRadius: '20px',
            alignItems: 'center',
            justifyContent: 'flex-start',
            alignContent: 'center',
            marginLeft: 16,
            paddingLeft: 8,

            height: '40px',
          }}
          display={'flex'}
          onClick={() => {
            setBanks(prev => {
              const clickedBank = prev[index];

              let updated: typeof prev = [];

              if (clickedBank.FinancialInstitutionId === 'All') {
                // Toggle all banks
                const allSelected = clickedBank.selected;
                updated = prev.map(bank => ({ ...bank, selected: !allSelected }));
              } else {
                // Toggle one bank
                updated = prev.map((bank, i) => (i === index ? { ...bank, selected: !bank.selected } : bank));

                const allIndex = updated.findIndex(b => b.FinancialInstitutionId === 'All');
                const nonAllBanks = updated.filter(b => b.FinancialInstitutionId !== 'All');

                if (updated[allIndex].selected) {
                  // If All was selected, turn it off when a single is toggled
                  updated[allIndex].selected = false;
                }

                // If all non-All banks are now selected, auto-select All
                if (nonAllBanks.every(b => b.selected)) {
                  updated[allIndex].selected = true;
                }
              }

              // --- UPDATE exportBanks ---
              const allBank = updated.find(b => b.FinancialInstitutionId === 'All');
              const selectedBanks = updated.filter(b => b.selected && b.FinancialInstitutionId !== 'All');

              if (allBank?.selected) {
                setExportBanks(''); // All selected → empty string
              } else {
                setExportBanks(selectedBanks.map(b => b.FinancialInstitutionId).join(','));
              }

              return updated;
            });
          }}
        >
          <Box
            component="img"
            loading="lazy"
            sx={{
              height: '24px',
              width: '24px',
            }}
            alt="neotek logo"
            src={bank.selected ? ic_selected : ic_unselected}
          />
          <Typography variant="body2" color="black" fontWeight={'500'} fontSize={'14px'} style={{ marginLeft: 8 }} onClick={() => { }}>
            {bank?.FinancialInstitutionName?.NameEn ?? ''}
          </Typography>
        </Box>
      );
    });
  }

  const ouputs = [
    { icon: ic_pdf, name: 'Pdf', format: 'PDF' },
    { icon: ic_excel, name: 'Excel', format: 'EXCEL' },
  ];

  const [selectedOutput, setSelectedOutput] = useState(ouputs[0].name);
  const [format, setFormat] = useState(ouputs[0].format);

  function List3() {
    return ouputs.map((account, index) => {
      return (
        <Box
          key={index}
          style={{
            flexDirection: 'row',
            display: 'flex',
            paddingLeft: '26.3px',
            paddingRight: '26.3px',
            justifyContent: 'space-between',
            alignContent: 'center',
            marginLeft: '2.5%',
            backgroundColor: '#F7F8FA',
            width: '95%',
            height: '80px',
            marginTop: 10,
            borderRadius: '12px',
            borderColor: `${selectedOutput === account.name ? '#F36D21' : '#F7F8FA'}`,
          }}
          display={'flex'}
          onClick={() => {
            setSelectedOutput(account.name);
            setFormat(account.format);
          }}
        >
          <Box
            style={{ alignSelf: 'center' }}
            component="img"
            loading="lazy"
            sx={{
              height: '65px',
              width: '65px',
            }}
            alt="neotek logo"
            src={account.icon}
          />
          <Box style={{ flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'center', width: '80%' }}>
            <Typography variant="body2" color="black" fontWeight={'bold'} fontSize={'14px'} style={{ marginTop: 10 }}>
              {account.name}
            </Typography>
          </Box>
          <Box style={{ flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'center' }}>
            <Box
              component="img"
              loading="lazy"
              sx={{
                height: '20px',
                width: '20px',
              }}
              alt="neotek logo"
              src={account.name === selectedOutput ? ic_orange_radio_selected : ic_orange_radio_unselected}
            />
          </Box>
        </Box>
      );
    });
  }

  // const takeScreenshot = async () => {
  //   if (!componentRef.current) return;

  //   const canvas = await html2canvas(componentRef.current);
  //   const dataURL = canvas.toDataURL("image/png");

  //   // Download image
  //   const link = document.createElement("a");
  //   link.href = dataURL;
  //   link.download = "screenshot.png";
  //   link.click();
  // };

  return (
    <Box sx={style}>
      <Box
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          borderRadius: '20px !important',
          padding: '20px 0',
        }}
      >
        <Box
          style={{
            flexDirection: 'row',
            display: 'flex',
            paddingLeft: '26.3px',
            paddingRight: '26.3px',
            justifyContent: 'space-between',
            alignItems: 'center',
            columnGap: '10px',
          }}
        >
          <Box
            style={{}}
            component="img"
            loading="lazy"
            sx={{
              height: '48px',
              width: '48px',
            }}
            alt="neotek logo"
            src={ic_export}
          />
          <Box sx={{ flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'flex-start', width: '100%', margin: '16px 0' }}>
            <Typography variant="body2" color="black" fontWeight={'bold'} fontSize={'18px'} style={{}}>
              Export as
            </Typography>
            <Typography variant="body2" color="#475467" fontWeight={'400'} fontSize={'10px'} style={{ marginTop: 0 }}>
              Choose your report details
            </Typography>
          </Box>
          <Box
            style={{}}
            component="img"
            loading="lazy"
            sx={{
              height: '24px',
              width: '24px',
            }}
            alt="neotek logo"
            src={ic_close}
            onClick={() => {
              close();
            }}
            paddingTop={1}
          />
        </Box>

        <Box style={{ width: '100%', alignSelf: 'center', backgroundColor: '#E5E5E5', height: '1px' }} />

        <Box style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignContent: 'center', marginTop: 12 }} />

        <Typography variant="body2" color="#475467" fontWeight={'400'} fontSize={'10px'} style={{ marginTop: 0, marginLeft: 24 }}>
          Choose which bank
        </Typography>

        <Box
          sx={{
            gap: 0.1, // spacing between grid items, adjust as needed
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            maxWidth: '80%',
            marginTop: '10px',
          }}
        >
          <List />
        </Box>

        <>
          <Box style={{ width: '100%', alignSelf: 'center', backgroundColor: '#E5E5E5', height: '1px', marginTop: 32 }} />

          <Typography variant="body2" color="#475467" fontWeight={'400'} fontSize={'10px'} style={{ marginTop: 16, marginLeft: 24 }}>
            Choose the report format
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)', // 3 equal columns
              gap: 0.1, // spacing between grid items, adjust as needed
              width: '100%',
              margin: 'auto',
            }}
          >
            <List3 />
          </Box>
        </>
        <Box style={{ width: '100%', alignSelf: 'center', backgroundColor: '#E5E5E5', height: '1px', marginTop: 32 }} />

        <Box
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            alignContent: 'flex-end',
            marginTop: 12,
            marginRight: 24,
          }}
          display={'flex'}
        >
          <Button
            type="submit"
            variant="contained"
            autoCapitalize="off"
            disableElevation
            style={{
              backgroundColor: 'white',
              border: '1px solid #F36D21',
              alignSelf: 'flex-end',
              width: '80px',
              height: '48px',
              borderRadius: '10px',
              fontSize: '13px',
              textTransform: 'none',
              marginRight: 12,
              color: '#F36D21',
            }}
            onClick={() => {
              close();
            }}
            fullWidth
            sx={{
              padding: 1,
              borderRadius: 2,
              fontWeight: 700,
            }}
          >
            {'Cancel'}
          </Button>

          <Button
            type="submit"
            variant="contained"
            autoCapitalize="off"
            disableElevation
            style={{
              backgroundColor: '#F36D21',
              alignSelf: 'flex-end',
              width: '80px',
              height: '48px',
              borderRadius: '10px',
              fontSize: '13px',
              textTransform: 'none',
            }}
            onClick={() => {
              const paramsObj: Record<string, string> = {
                PSUId,
                format,
              };
              if (exportBanks && typeof exportBanks === 'string' && exportBanks?.length > 0) {
                paramsObj.financialInstitutionId = exportBanks;
              }
              const params = new URLSearchParams(paramsObj);

              fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/e-statements/export?${params.toString()}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  checksum: customer?.checksum || '',
                  apikey: token || '',
                },
              })
                .then(r => r.blob())
                .then(b => {
                  if (format == 'EXCEL') {
                    const url = window.URL.createObjectURL(b);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'report.xlsx'); // filename
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                  } else {
                    window.open(`/viewReport?url=${URL.createObjectURL(b)}`);
                  }
                });
            }}
            fullWidth
            sx={{
              padding: 1,
              borderRadius: 2,
              fontWeight: 700,
            }}
          >
            {'Got it'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ExportDialog;
