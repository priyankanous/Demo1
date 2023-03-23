import {React, useState} from "react";
import { SidebarLabel, SidebarLink, DropdownLink } from "./Value";

const SubMenu = ({ item, isOpen, onClick }) => {
  const [dropDownActive, setdropDownActive] = useState(null)
  const [subDropDownActive, setsubDropDownActive] = useState(null)

  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && onClick} >
        <div onClick={() => setdropDownActive(item.path)} className={dropDownActive == item.path && 'active'}>
          {item.icon}
          <SidebarLabel >{item.title}
          <span class="sideBarIcon"> {item.subNav && (isOpen ? item.iconOpened : item.iconClosed)}</span>
          </SidebarLabel>
        </div>
        
      </SidebarLink>
      {isOpen &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}> 
              {item.icon} 
              <SidebarLabel onClick={() => setsubDropDownActive(item.path)} className={subDropDownActive == item.path && 'active'}>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;