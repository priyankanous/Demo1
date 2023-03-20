import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaBars } from 'react-icons/fa';

export const SidebarLink = styled(Link)`
  display: flex;
  color: white;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  list-style: none;
  height: 10px;
  text-decoration: none;
  font-size: medium;

  &:hover {
    background: #0a8b9c;
    cursor: pointer;
  }
`;

export const SidebarLabel = styled.span`
  margin-left: 16px;
`;

export const DropdownLink = styled(Link)`
  background: #0a8b9;
  padding-left:3rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: medium;

  &:hover {
    background: #0a8b9c;
    cursor: pointer;
  }
`;

export const SidebarNav = styled.nav`
  background:  #072e3a;
  width: 230px;
  height: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  overflow-y:auto;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

export const SidebarWrap = styled.div`
  width: 100%;
`;

export const PrimaryNav = styled.nav`
  z-index: 14;
  height: 90px;
  display: flex;
  background: #0a8b9c;
  justify-content: space-between;
  padding: 0.18rem calc((100vw - 1000px) / 2);
`
export const MenuLink = styled(Link)`
  color: #fff;
  display: flex;
  cursor: pointer;
  align-items: center;
  font-weight: 100px;
  text-decoration: none;
  padding: 0 1.2rem;
  height: 100%;
  &.active {
    color: #000000;
  }
`
export const Hamburger = styled(FaBars)`
  display: none;
  color: #ffffff;
  @media screen and (max-width: 768px) {
    display: block;
    font-size: 1.9rem;
    top: 0;
    right: 0;
    position: absolute;
    cursor: pointer;
    transform: translate(-100%, 75%);
  }
`
export const Menu = styled.div`
  display: flex;
  align-items: center;
  font-weight: 100px;
  margin-right: -25px;
  margin-Left: 80px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const ModalHeading = styled.h3`
  display:inline;
`

export const ModalIcon = styled.i`
float:right;
color:rgb(10, 139, 156);
font-size:1.2rem;
`

// export const ModalContainer = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   background: rgba(0, 0, 0, 0.5);
// `;

// export const Modal = styled.div`
//   background: #fff;
//   position: absolute;
//   top: 50px;
//   right: calc(50% - 100px);
//   border: 1px solid #000;
//   padding: 20px;
//   min-height: 200px;
// `;