import React, { useState } from "react";
import { SidebarData } from "./SideBarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import { SidebarNav, SidebarWrap } from "./Value";
import Nous_Infosystems from "./Images/Nous Infosystems.png";
import { Menu, MenuLink, PrimaryNav } from "../NavigationMenu/Value";
import { Navbar } from "react-bootstrap";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const showSidebar = () => {
    setSidebar(!sidebar);
    setOpenSubmenu(null);
  };

  const handleSubMenuClick = (index) => {
    setOpenSubmenu(index === openSubmenu ? null : index);
  };

  return (
    <>
    <Navbar>
                <>
                <div>
                    <PrimaryNav className="Navbar">
                        <Menu >
                            <h1>Rolling Revenue</h1>
                        </Menu>
                    </PrimaryNav>
                  </div>
                </>
            </Navbar>
      <IconContext.Provider value={{ color: "#fff" }}>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <img src={Nous_Infosystems} alt="Nous logo" className="image" />
            <hr></hr>
            {SidebarData.map((item, index) => {
              return (
                <SubMenu
                  item={item}
                  key={index}
                  isOpen={openSubmenu === index}
                  onClick={() => handleSubMenuClick(index)}
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
