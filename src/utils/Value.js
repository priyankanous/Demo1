import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export const SidebarLink = styled(Link)`
  display: flex;
  color: #000000;
  justify-content: space-between;
  align-items: center;
  height:34px;
  padding: 3px 0px 3px 30px;
  list-style: none;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
`;
export const SidebarLabel = styled.span`
  margin-left: 1rem;
`;

export const DropdownLink = styled(Link)`
  background: rgba(30, 68, 130, 0.2);
  color: #000000;
  font-size: 14px;
  font-weight:500;
  line-height: 15px;
  display: block;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 58px;
  // margin-left: 0rem;
  // padding-right: 1rem;
  // align-items: center;
  text-decoration: none;
  overflow: auto;

  .active {
    font-weight:700;
    // background: rgba(30, 68, 130, 0.2);
    // background: #23c5c7;
    // border-radius: 10px;
    // padding: 2px 5px;
    // margin-left: 0.4rem;
    // padding-left: 0.5rem;
    // padding-right: 0.5rem;
    // padding-top: 0.25rem;
    // padding-bottom: 0.25rem;
    // color: black;
  }
`;
export const SidebarNavBar = styled.nav`
  background: #FFFFFF;
  width: 240px;
  height: 924px;
  top:60px;
  left:0px;
  // display: flex;
  // justify-content: center;
  position: absolute;
  // left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  // transition: 350ms;
  // z-index: 10;
  // overflow: auto;
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
  overflow: auto;
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
  margin-left: 1vw;
`;

export const ModalIcon = styled.i`
  float: right;
  color: rgb(10, 139, 156);
  font-size: 1rem;
`;

export const TableHeadingSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  // padding-top: 5px;
`;
export const TableRevenue = styled.div`
  width: 50%;
`;
export const TableHeading = styled.div`
  // margin: 15px 50px;
  font-weight: 600;
  font-size: 21px;
  color: #000000;
  padding: 7px 0px 5px 5px;
`;

export const TableButtons = styled.button`
  width: 8vw;
  height: 6vh;
  background: #002333;
  border-radius: 30px;
  cursor: pointer;
  font-style: normal;
  font-weight: 500;
  font-size: 0.9vw;
  line-height: 19px;
  color: #ffffff;
  // margin: 2.9vh 3vh 0vh 0vh;
`;
export const TableHeadingButton = styled.button`
  background-color: #002333;
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 2vh;
  margin: 1vw;
  cursor: pointer;
  width: auto;
`;

export const TableHeadingButtonPlusIcon = styled.i`
  margin: 0.4rem;
  vertical-align: middle;
`;
export const NavBarHeading = styled.div`
  position: relative;
  top: 40%;
  margin-left: 4rem;
  font-size: 1.5vw;
  font-family: sans-serif;
  font-weight: 700;
  text-align: middle;
`;

export const UserLoggedInSection = styled.div`
  margin-right: 1rem;
`;
export const LoggedInUserImage = styled.img`
  width: 40px;
  height:40px
  position: relative;
  margin-right: 20px;
  border-radius: 50%;
`;
export const LoggedInUserName = styled.span`
  font-weight: 400;
  font-size: 16px;
  // color: rgb(0, 35, 51, 1);
  color: #000000;
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
export const MilestoneInput = styled.nav`
  width: 100px;
`;
