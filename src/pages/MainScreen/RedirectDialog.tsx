import { Box, Button, Typography } from "@mui/material"
import ic_export from '../../assets/ic_export.svg';
import ic_close from '../../assets/ic_close.svg';
import ic_unselected from '../../assets/ic_orange_unselected.svg';
import ic_selected from '../../assets/ic_orange_selected.svg';
import ic_orange_radio_unselected from '../../assets/ic_orange_radio_unselected.svg';
import ic_orange_radio_selected from '../../assets/ic_orange_radio_selected.svg';
import ic_chart_mixed from '../../assets/ic_chart_mixed.svg';
import ic_file_lines from '../../assets/ic_file_lines.svg';
import ic_pdf from '../../assets/ic_pdf.svg';
import ic_excel from '../../assets/ic_excel.svg';
import { useState } from "react";

interface Props {
    close: Function;
    RedirectUrl: string;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',

    borderRadius: '20px !important',
};
const RedirectDialog: React.FC<Props> = ({ close, RedirectUrl }) => {


    console.log("RedirectUrl", RedirectUrl)

    return (
        <Box sx={style}
        >
            <Box sx={{ flexDirection: 'column', alignItems: 'center', alignSelf: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: '20px !important', padding: '20px' }}>
                <Box style={{
                    flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    columnGap: '10px'
                }}
                >

                    <Box sx={{ flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'flex-start', width: '100%', }}>
                        <Typography variant="body2" color="black" fontWeight={'bold'} fontSize={'18px'} style={{ maxWidth: '70%' }}>
                            Choose your preferred
                            way to complete the process
                        </Typography>

                    </Box>
                    <Box
                        style={{}}
                        component="img"
                        loading="lazy"
                        sx={{
                            height: "24px",
                            width: "24px",
                        }}
                        alt="neotek logo"
                        src={ic_close}
                        onClick={() => { close() }}
                        paddingTop={1}
                    />
                </Box>

                <Typography color="black" fontWeight={'400'} fontSize={'12px'} style={{ maxWidth: '70%', marginTop: '10px' }}>
                    We can generate a QR code for you to continue your journey from your mobile
                </Typography>

                <Button onClick={() => { }}>
                    Generate QR Code
                </Button>
                <Button onClick={() => { window.open(RedirectUrl, "_blank"); close() }}>
                    Open Redirect URL
                </Button>
            </Box>
        </Box>
    )
}

export default RedirectDialog;