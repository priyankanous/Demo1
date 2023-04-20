import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export const SidebarLink = styled(Link)`
  display: flex;
  color: white;
  justify-content: space-between;
  align-items: center;
  padding: 4%;
  padding-left: 2rem;
  list-style: none;
  height: 1%;
  text-decoration: none;
  font-size: 1.5vh;
`;

export const SidebarLabel = styled.span`
  margin-left: 1rem;
`;

export const DropdownLink = styled(Link)`
  background: #0a8b9;
  margin-left: 0rem;
  padding-right: 1rem;
  padding-top: 0.4rem;
  padding-bottom: 0.25rem;
  display: block;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 1.5vh;
  overflow:auto;

  .active {
    background: #23C5C7;
    border-radius: 5.5rem;
    margin-left: 0.4rem;
    marging-right: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    color:black;
    
  }
`;

export const SidebarNav = styled.nav`
  background: #002333;
  width: 17%;
  height: 105%;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
  overflow:auto;
`;

export const SidebarWrap = styled.div`
  width: 100%;
`;

export const PrimaryNav = styled.nav`
  height: 4.2rem;
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

export const ModalHeading = styled.h5`
  display: inline;
`;

export const ModalIcon = styled.i`
  float: right;
  color: rgb(10, 139, 156);
  font-size: 1.2rem;
`;

export const TableHeadingSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const TableHeading = styled.div`
  margin: 25px 50px;
  font-weight: 500;
  font-size: 1.1rem;
  color: #072a3a;
`;

export const TableHeadingButton = styled.button`
  background-color: #002333;
  border: none;
  border-radius: 30px;
  color: white;
  padding: 0.6rem 1.4rem;
  font-size: 1vw;
  margin: 1vw;
  cursor: pointer;
`;
export const TableHeadingButtonPlusIcon = styled.i`
  margin: 0.4rem;
  vertical-align: middle;
`;
export const NavBarHeading = styled.div`
  margin-top: 1em;
  margin-left:4rem;
  font-size: 1.5vw;
  font-family: sans-serif;
  font-weight: 700;
  text-align:middle;
`;

export const UserLoggedInSection = styled.div`
  margin-right: 1rem;
`;
export const LoggedInUserImage = styled.img`
  position: relative;
  top: 20%;
  margin-right: 1rem;
  width:2.5rem;
  height:2.5rem;
  border-radius:50%;
`;
export const LoggedInUserName = styled.span`
  font-weight: 500;
  font-size:1.2vw;
  color: rgb(7, 46, 58);
`;
export const ModalFormButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  padding: 2px;
  width: 100%;
`;

export const NotificationArrowIcons = styled.div`
  width: 20%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 5rem;
  color: #0a8b9c;
`;
