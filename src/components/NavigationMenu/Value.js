import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaBars } from 'react-icons/fa';

export const SidebarLink = styled(Link)`
  display: flex;
  color: white;
  justify-content: space-between;
  align-items: center;
  padding: 5%;
  padding-left: 2rem;
  list-style: none;
  height: 1%;
  text-decoration: none;
  font-size: small;

  &:hover {
    background: #0a8b9c;
    cursor: pointer;
  }
`;

export const SidebarLabel = styled.span`
  margin-left: 1rem;
`;

export const DropdownLink = styled(Link)`
  background: #0a8b9;
  padding-left: 4rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: small;

  &:hover {
    background: #0a8b9c;
    cursor: pointer;
  }
`;

export const SidebarNav = styled.nav`
  background:  #072e3a;
  width: 17%;
  height: 105%;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

export const SidebarWrap = styled.div`
  width: 100%;
`;

export const PrimaryNav = styled.nav`
  height: 5rem;
  display: flex;
  background:  #072e3a;
  margin-left: 14.3%;
  padding-left: 2.7%;
  font-size: large;
  justify-content: space-between;
  border-color: #052635;
`
export const MenuLink = styled(Link)`
  color: white;
  display: flex;
  cursor: pointer;
  align-items: center;
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