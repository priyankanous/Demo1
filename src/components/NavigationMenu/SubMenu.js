import React,{useEffect, useState} from "react";
import { SidebarLabel, SidebarLink, DropdownLink } from "./Value";
import { useLocation } from "react-router";

const SubMenu = ({ item, isOpen, handleSubMenuClick,index }) => {
  const location = useLocation();
  const [isMainmenuactive,setMainmenuactive] = useState(false);
  const [subDropDownActive, setsubDropDownActive] = useState(null)


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
          <SidebarLabel>{item.title}
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
