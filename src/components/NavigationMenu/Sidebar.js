import React, { useState, useEffect } from "react";
import axios from "axios";
import { SidebarData } from "./SideBarData";
import SubMenu from "./SubMenu";
import Nous_Infosystems from "./Images/Nous Infosystems.jpg";
import { 
        Box, 
        AppBar, 
        Typography,
        styled } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const AppNavBar = styled(AppBar)({
  background: "#FFFFFF",
  width: "1440px",
  height: "60px",
  border: "1px solid rgba(0, 0, 0, 0.2)",
  boxShadow: "none",
});

const InnerBox = styled(Box)({
  display: "flex",
  alignItems: "center"

});

const Img = styled('img')({
  width: "113",
  height: "52px",
  margin: "3px 0px 0px 71px"
});

const Heading = styled(Typography)({
  fontFamily: "Roboto",
  paddingLeft: "102px",
  fontSize: "24px",
  fontWeight: "700",
  color: "#000000",
});

const LoggedInUserSection = styled('div')({
  display: "flex",
  paddingLeft: "550px",
  alignItems: "center"
});

const LoggedInUserImage = styled('img')({
  width: "40px",
  height: "40px",
  position: "relative",
  marginRight: "20px",
  borderRadius: "50%",
});

const LoggedInUserName = styled('span')({
  fontWeight: "400",
  fontSize: "16px",
  // color: "rgb(0, 35, 51, 1)",
  color: "rgba(0, 35, 51, 1)",

});

const SideBar = styled('Nav')({
  background: "#FFFFFF",
  width: "240px",
  // height: "420px !important",
  height: "90vh",

  top: "60px",
  left: "0px",
  position: "absolute",
  cursor:"pointer",
  overflowY:"scroll",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    width: "0.2em", // Customize scrollbar width for webkit browsers
  },
  "&::-webkit-scrollbar-track": {
    background: "#FFFFFF", // Customize scrollbar track color for webkit browsers
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888", // Customize scrollbar thumb color for webkit browsers
    borderRadius: "4px", // Customize scrollbar thumb border radius for webkit browsers
  },
});

const SidebarWrap = styled('div')({
  width: "100%",
});

const ArrowDownIcon = styled(ArrowDropDownIcon)({
  color:"#000000",
  padding:"2px 0px 0px 5px"
});

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [userObj, setUserObj] = useState(null);

  const handleSubMenuClick = (index, isFromNewComp = true) => {
    console.log("qwerty", index);
    // debugger;
    if (isFromNewComp) setOpenSubmenu(index === openSubmenu ? null : index);
  };

  useEffect(() => {
    const dataFetach = async () => {
      const data = await axios.get("https://randomuser.me/api/?gender=male");
      setUserObj(data.data.results[0]);
    };
    dataFetach();
  }, []);

  return (
    <>
      <div>
        <Box sx={{ flexGrow: 1, overflow: "hidden" }}  >
          <AppNavBar position="static" >
            <InnerBox >
              <div>
                <Img src={Nous_Infosystems} alt="Nous logo" />
              </div>
              <div>
                <Heading>Rolling Revenue</Heading>
              </div>
              <LoggedInUserSection>
                <LoggedInUserImage src={userObj?.picture?.thumbnail} />
                <LoggedInUserName>Rohit Sharma</LoggedInUserName>
                <ArrowDownIcon />
              </LoggedInUserSection>
            </InnerBox>
          </AppNavBar>
        </Box>

        <SideBar sidebar={sidebar} >
          <SidebarWrap>
            {SidebarData.map((item, index) => {
              return (
                <SubMenu
                  item={item}
                  key={index}
                  isOpen={openSubmenu === index}
                  handleSubMenuClick={handleSubMenuClick}
                  index={index}
                  setOpenSubmenu={setOpenSubmenu}
                />
              );
            })}
          </SidebarWrap>
        </SideBar>
      </div>
    </>
  );
};

export default Sidebar;
