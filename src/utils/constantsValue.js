import { Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, styled, Typography, InputLabel, TextField, Button } from '@mui/material';


export const modalStyleObject = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  content: {
    position: "relative",
    top: "20%",
    left: "40%",
    border: "none",
    overflow: "overlay",
    outline: "none",
    padding: "10px",
    width: "25%",
    margin: "0",
    bottom: "10%",
    borderRadius: "5%",
  },
};
export const revenueModalStyleObject = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  content: {
    position: "absolute",
    top: "4%",
    left: "18%",
    border: "none",
    overflow: "overlay",
    outline: "none",
    padding: "15px",
    width: "74%",
    margin: "0",
    height: "90%",
    background: "white",
    overflowY: "overlay",
    borderRadius: "4%",
  },
};

export const bdmStyleObject = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  content: {
    position: "absolute",
    top: "10%",
    left: "35%",
    border: "none",
    overflow: "overlay",
    outline: "none",
    padding: "15px",
    width: "30%",
    margin: "0",
    height: "70%",
    background: "white",
    overflowY: "overlay",
    borderRadius: "3%",
  },
};

export const notificationModalStyleObj = {
  overlay: {
    backgroundColor: "rgb(0,0,0)",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  content: {
    width: "70%",
    height: "70%",
    position: "absolute",
    top: "13%",
    left: "20%",
    background: "white",
    borderRadius: "10px",
  },
};

export const TableRowSection = styled(TableRow)({
  overflow:"hidden",
  padding: "0px"
});

export const TableCellSection = styled(TableCell)({
  fontSize:"14px", 
  fontWeight:"500", 
  color:"#000000",
  textAlign:"left",
  padding:"7px 15px"
});

export const ModalHeadingSection = styled('div')({
  display: 'flex',
  justifyContent: 'space-between', 
  alignItems: 'center', 
  height: "50px", 
  background: '#FFFFFF', 
  borderRadius: "10px", 
  padding: "0px 15px"
});

export const ModalHeadingText = styled(Typography)({
  fontSize: "17px", 
  fontWeight: "600", 
  color: "#000000"
});

export const ModalDetailSection2 = styled('div')({
  background: "#F5F9FC", 
  display: "flex", 
  paddingLeft: "20px",
  paddingTop: "25px",
  justifyContent: "Left", 
  borderRadius: "10px"
});

export const ModalDetailSection = styled('div')({
  background: "#F5F9FC", 
  padding: "12px 10px",
  display: "flex", 
  justifyContent: "center", 
  borderRadius: "10px"
});

export const InputTextLabel = styled(InputLabel)({
  fontSize: "15px", 
  fontWeight: "500", 
  color: "#000000"
});

// export const InputField = styled(TextField)({
//   background: "white", 
//   boxShadow: "none !important",
// });

export const InputField = styled(TextField)`
  && {
    background: white;
    box-shadow: none;
  }
`;

export const ButtonSection = styled('div')({
  display: "flex", 
  justifyContent: "space-between", 
  padding: "10px 0px"
});

export const ModalControlButton = styled(Button)({
  color: "#FFFFFF", 
  background: "#1E4482",
  '&:hover': {
    backgroundColor: '#1E4482',
  },
});

export const MoadalStyle = {
  position: 'absolute',
  top: '50%',
  left: '55%',
  transform: 'translate(-50%, -50%)',
  width: '300px',
  bgcolor: 'background.paper',
  border: '1px solid transparent',
  borderRadius: "10px"
  // boxShadow: 24,
  // p: 1,
};

export const MoadalStyle2 = {
  position: 'absolute',
  top: '50%',
  left: '55%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  bgcolor: 'background.paper',
  border: '1px solid transparent',
  borderRadius: "10px"
  // boxShadow: 24,
  // p: 1,
};

export const apiV1 = "http://192.168.16.55:8080/rollingrevenuereport/api/v1";
