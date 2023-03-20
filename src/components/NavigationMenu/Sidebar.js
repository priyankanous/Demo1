import React, { useState } from "react";
import { SidebarData } from "./SideBarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import { SidebarNav, SidebarWrap } from "./Value";
import Nous_Infosystems from "./Images/Nous Infosystems.jpg";
import { Menu, MenuLink, PrimaryNav } from "../NavigationMenu/Value";
import { Navbar } from "react-bootstrap";
import { AiFillProfile } from "react-icons/ai";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleSubMenuClick = (index) => {
    setOpenSubmenu(index === openSubmenu ? null : index);
  };

  return (
    <>
      <Navbar>
        <>
          <div>
            <PrimaryNav>
              <Menu className="nav">
                <h1>Rolling Revenue</h1>
              </Menu>
            </PrimaryNav>
          </div>
        </>
      </Navbar>
      <hr style={{ width: "75%", marginRight: "5rem" }} />
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
