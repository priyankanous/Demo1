import React,{useEffect, useState} from "react";
import { SidebarLabel, SidebarLink, DropdownLink } from "./Value";
import { useLocation } from "react-router";

const SubMenu = ({ item, isOpen, handleSubMenuClick,index }) => {
  const location = useLocation();
  const [isMainmenuactive,setMainmenuactive] = useState(false);

  useEffect(()=>{
    setMainmenuactive(false);
    if(item && location.pathname.split('/').includes(item.path.substring(1))){
      setMainmenuactive(true);
    }
  },[item,location])
  
  return (
    <>
      <SidebarLink style={{background:isMainmenuactive && '#0a8b9c'}}  to={item.path} onClick={()=>{item.subNav && handleSubMenuClick(index);}}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>{item.subNav && (isOpen ? item.iconOpened : item.iconClosed)}</div>
      </SidebarLink>
      {isOpen &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink style={{background:location.pathname===item.path && '#0a8b9c'}} to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
