import React from "react";
import { SidebarLabel, SidebarLink, DropdownLink } from "./Value";

const SubMenu = ({ item, isOpen, onClick }) => {
  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && onClick}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>{item.subNav && (isOpen ? item.iconOpened : item.iconClosed)}</div>
      </SidebarLink>
      {isOpen &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
