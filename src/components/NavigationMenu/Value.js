import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

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
  font-size: 1.2rem;

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
  font-size: 1rem;

  &:hover {
    background: #0a8b9c;
    cursor: pointer;
  }
`;

export const SidebarNav = styled.nav`
  background: #072e3a;
  width: 17%;
  height: 105%;
  display: flex;
  justify-content: center;
  position: fixed;
  overflow-y: auto;
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
  background: #072e3a;
  margin-left: 14.3%;
  padding-left: 2.7%;
  font-size: large;
  justify-content: space-between;
  border-color: #052635;
`;

export const MenuLink = styled(Link)`
  color: white;
  display: flex;
  cursor: pointer;
  align-items: center;
  height: 100%;
  &.active {
    color: #000000;
  }
`;
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
`;
export const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 100px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const ModalHeading = styled.h3`
  display:inline;
`

export const ModalIcon = styled.i`
float:right;
color:rgb(10, 139, 156);
font-size:1.2rem;
`

export const TableHeadingSection = styled.div`
display:flex;
width:100%;
justify-content:space-between;
`

export const TableHeading = styled.div`
margin:25px 50px;
font-weight:500;
font-size:1.3rem;
color: #072a3a;
`

export const TableHeadingButton = styled.button`
  background-color: #0a8b9c;
  border: none;
  border-radius: 30px;
  color: white;
  padding: 12px 26px;
  font-size: 16px;
  margin: 12px;
  cursor: pointer;
`
export const TableHeadingButtonPlusIcon = styled.i`
margin:0.4rem;
vertical-align:middle;
`
export const NavBarHeading = styled.div`
margin:20px 60px;
font-size:2rem;
font-family:sans-serif;
font-weight:700;
`

export const UserLoggedInSection = styled.div`
margin-right:5rem;
`
export const LoggedInUserImage = styled.img`
border-radius:50%;
position:relative;
top:20%;
margin-right:1rem
`
export const LoggedInUserName = styled.span`
font-weight:500;
color:rgb(7,46,58);
`
