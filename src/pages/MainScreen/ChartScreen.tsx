import { Box, Button, Link, Typography } from "@mui/material";
import ic_download from '../../assets/ic_download.svg';
import { useState } from "react";
import { BorderStyle } from "@mui/icons-material";

const ChartScreen: React.FC = () => {

    const accounts = ['All', 'Raghi Bank', 'Alinma Bank', 'SAMA Bank']
    const [selectedIndex, setSelectedIndex] = useState(0);

    function List() {
        return accounts.map((account, index) => {
            return (
                <Box style={{
                    flexDirection: 'row', display: 'flex', width: "125px", justifyContent: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: selectedIndex == index ? 'white' : '#F5EDE8', height: '40px', flexShrink: 0, borderRadius: "8px", BorderStyle: 'solid', marginRight: 4
                }}
                    onClick={() => { setSelectedIndex(index); }}>
                    <Typography variant="body2" color="black" fontWeight={'bold'} fontSize={'16px'} style={{}}>
                        {account}
                    </Typography>
                </Box>
            )
        })
    }


    return (
        <Box style={{ flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'center', justifyContent: 'center', height: '100vh', marginLeft: 10 }}
            sx={{ width: '83%' }}>


            <Box style={{ flexDirection: 'row', alignItems: 'flex-start', alignSelf: 'center', justifyContent: 'space-between', marginTop: 12.5, marginBottom: 40 }}
                sx={{ flexGrow: 1 }}
                display={'flex'}>
                <Typography variant="body2" color="black" fontWeight={'600'} fontSize={'24px'} style={{ marginLeft: 8 }}>
                    {'Dashboard'}
                </Typography>
                <Box style={{ flexDirection: 'row', alignItems: 'flex-start', alignSelf: 'center', justifyContent: 'center' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        autoCapitalize="off"
                        disableElevation
                        style={{ backgroundColor: '#F36D21', alignSelf: 'flex-end', width: "240px", height: "48px", borderRadius: "10px", fontSize: '13px', textTransform: 'none' }}
                        onClick={() => { }}
                        fullWidth

                        sx={{
                            padding: 1,
                            borderRadius: 2,
                            fontWeight: 700,
                        }}

                    >
                        {'Connect New Bank Account'}

                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        autoCapitalize="off"
                        disableElevation
                        style={{ backgroundColor: '#FFE4D5', alignSelf: 'flex-end', width: "240px", height: "48px", borderRadius: "10px", fontSize: '13px', textTransform: 'none', marginLeft: 23, color: '#F36D21' }}
                        onClick={() => { }}
                        fullWidth

                        sx={{
                            padding: 1,
                            borderRadius: 2,
                            fontWeight: 700,
                        }}

                    >
                        {'Export E-Statement As'}
                        <img
                            src={ic_download}    // replace with your image path
                            alt="icon"
                            style={{ width: 24, height: 24, marginLeft: 6, marginBottom: 4 }}
                        />
                    </Button>
                </Box>

            </Box>

            <Box style={{ flexDirection: 'row', alignItems: 'flex-start', alignSelf: 'center', justifyContent: 'flex-start', borderRadius: "10px", backgroundColor: '#F5EDE8', overflow: 'hidden', width: 'auto', padding: '4px', }}
                display={'inline-flex'}>
                <List />
            </Box>

            <Box style={{ flexDirection: 'row', alignItems: 'flex-start', alignSelf: 'center', justifyContent: 'space-between', marginTop: 12.5, marginBottom: 40 }}
                sx={{ flexGrow: 1 }}
                display={'flex'}>
                <Box style={{ flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'center', justifyContent: 'center' }}>
                    <Box style={{ flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'center', justifyContent: 'center' }}>
                        <Typography variant="body2" color="black" fontWeight={'600'} fontSize={'24px'} >
                            {'Raghi Bank'}
                        </Typography>
                        <Typography variant="body2" color="#F36D21" fontWeight={'600'} fontSize={'24px'} >
                            {'Raghi Bank'}
                        </Typography>
                    </Box>
                    <Box style={{ flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'center', justifyContent: 'center' }}>
                        <Typography variant="body2" color="black" fontWeight={'600'} fontSize={'24px'} >
                            {'Raghi Bank'}
                        </Typography>
                        <Typography variant="body2" color="#F36D21" fontWeight={'600'} fontSize={'24px'} >
                            {'Raghi Bank'}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default ChartScreen