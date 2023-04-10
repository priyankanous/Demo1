import React, { useState, useEffect } from "react";
import { SidebarData } from "./SideBarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import {
  LoggedInUserImage,
  LoggedInUserName,
  NavBarHeading,
  SidebarNav,
  SidebarWrap,
  UserLoggedInSection,
} from "./Value";
import Nous_Infosystems from "./Images/Nous Infosystems.jpg";
import { Menu, MenuLink, PrimaryNav } from "../NavigationMenu/Value";
import { Navbar, Image } from "react-bootstrap";
import axios from "axios";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [userObj, setUserObj] = useState(null);

  const handleSubMenuClick = (index,isFromNewComp = true) => {
    console.log('qwerty',index)
    // debugger;
    if(isFromNewComp)setOpenSubmenu(index === openSubmenu ? null : index);
  };

  useEffect(()=>{
    const dataFetach = async ()=>{
      const data = await axios.get('https://randomuser.me/api/?gender=male');
      setUserObj(data.data.results[0])
    }
    dataFetach();
  },[])

  return (
    <>
      <Navbar>
        <>
          <div>
            <PrimaryNav>
              <Menu className="nav">
                <NavBarHeading>Rolling Revenue</NavBarHeading>
                <UserLoggedInSection>
                  <LoggedInUserImage src={userObj?.picture?.thumbnail} />
                  <LoggedInUserName>KUNAL TIWARI</LoggedInUserName>
                </UserLoggedInSection>
              </Menu>
            </PrimaryNav>
          </div>
        </>
      </Navbar>
      <hr style={{ width: "75%", marginRight: "4rem" }} />
      <IconContext.Provider value={{ color: "#fff" }}>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <img src={Nous_Infosystems} alt="Nous logo" className="image" />
            <hr style={{ width: "80%", color: "#0a8b9" }}></hr>
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
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
