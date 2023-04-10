import React,{useEffect, useState} from "react";
import { SidebarLabel, SidebarLink, DropdownLink } from "./Value";
import { useLocation } from "react-router";

const SubMenu = ({ item, isOpen, handleSubMenuClick,index,setOpenSubmenu }) => {
  const location = useLocation();
  const [isMainmenuactive,setMainmenuactive] = useState(false);
  const [subDropDownActive, setsubDropDownActive] = useState(null)


  useEffect(()=>{
    setMainmenuactive(false);
    if(item && location.pathname.split('/').includes(item.path.substring(1))){
      setMainmenuactive(true);
    }
    if(item?.subNav && location){
      for(let i=0; i<item?.subNav.length;i++){
        if(item?.subNav[i].path === location?.pathname){
          setsubDropDownActive(item?.subNav[i].path);
          handleSubMenuClick(index);
          setOpenSubmenu(index)
          break;
        }
      }
    }
  },[item,location])

  return (
    <>
      <SidebarLink key={index} style={{background:isMainmenuactive && '#0a8b9c'}}   to={item.path} onClick={()=>{item.subNav && handleSubMenuClick(index);}}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}
          <span class="sideBarIcon"> {item.subNav && (isOpen ? item.iconOpened : item.iconClosed)}</span>
          </SidebarLabel>
        </div>
      </SidebarLink>
      {isOpen  &&
        item.subNav.map((item, index1) => {
          return (
            <DropdownLink onClick={() => {console.log(index1,item.path);setsubDropDownActive(item.path)}} to={item.path} key={index1}> 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <SidebarLabel  className={subDropDownActive == item.path && 'active'}>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;

