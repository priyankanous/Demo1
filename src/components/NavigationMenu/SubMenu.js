import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { styled } from '@mui/material';
import { DropdownLink   } from "../../utils/Value";

const SidebarLink = styled('Link')({
  display: "flex",
  color: "#000000",
  justifyContent: "space-between",
  alignItems: "center",
  height:"34px",
  padding: "3px 0px 3px 30px",
  listStyle: "none",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "500",
});

const SidebarLabel = styled('span')({
  marginLeft: "1rem",
});

const SubMenu = ({
  item,
  isOpen,
  handleSubMenuClick,
  index,
  setOpenSubmenu,
}) => {
  const location = useLocation();
  const [isMainmenuactive, setMainmenuactive] = useState(false);
  const [subDropDownActive, setsubDropDownActive] = useState(null);

  useEffect(() => {
    setMainmenuactive(false);
    if (item && location.pathname.split("/").includes(item.path.substring(1))) {
      setMainmenuactive(true);
    }
    if (item?.subNav && location) {
      for (let i = 0; i < item?.subNav.length; i++) {
        if (item?.subNav[i].path === location?.pathname) {
          setsubDropDownActive(item?.subNav[i].path);
          handleSubMenuClick(index);
          setOpenSubmenu(index);
          break;
        }
      }
    }
  }, [item, location]);

  return (
    <>
      <SidebarLink
        key={index}
        style={{
          background: isMainmenuactive && "#1E4482",
          color: isMainmenuactive && "#FFFFFF",
          fontWeight: isMainmenuactive && "400",
        }}
        to={item.path}
        onClick={() => {
          item.subNav && handleSubMenuClick(index);
        }}
      >
        <div>
          {item.icon}
          <SidebarLabel>
            {item.title}
            <span class="sideBarIcon">
              {item.subNav && (isOpen ? item.iconOpened : item.iconClosed)}
            </span>
          </SidebarLabel>
        </div>
      </SidebarLink>
      {isOpen &&
        item.subNav.map((item, index1) => {
          return (
            <DropdownLink
              onClick={() => {
                setsubDropDownActive(item.path);
              }}
              to={item.path}
              key={index1}
              style={{ borderTop: "1px solid rgba(245, 249, 252, 0.5)"}}
            >
              <SidebarLabel
                className={subDropDownActive == item.path && "active"}
              >
                {item.title}
              </SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
