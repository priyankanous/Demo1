import React from "react";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import HomeIcon from '@mui/icons-material/Home';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <HomeIcon style={{fontSize:"medium"}} />,
    subNav: [],
  },
  {
    title: "Revenue",
    path: "/revenue",
    // icon: < AiIcons.AiFillSignal/>,
    icon: <SignalCellularAltIcon style={{fontSize:"medium"}} />,
    // iconClosed: <RiIcons.RiArrowDownSFill />,
    // iconOpened: <RiIcons.RiArrowUpSFill />,
    iconClosed: <ArrowDropDownIcon />,
    iconOpened: <ArrowDropUpIcon />,

    subNav: [
      {
        title: "Rolling Revenue Entry",
        path: "/revenue/rrentry",
        cName: "sub-nav",
      },
      {
        title: "Invoice Data",
        path: "/revenue/invoicedata",
        cName: "sub-nav",
      },
      {
        title: "Review and Publish",
        path: "/revenue/reviewandpublish",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Reports",
    path: "/reports",
    // icon: < AiIcons.AiFillSchedule/>,
    icon: < TextSnippetIcon style={{fontSize:"medium"}}/>,
    iconClosed: <ArrowDropDownIcon />,
    iconOpened: <ArrowDropUpIcon />,

    subNav: [
      {
        title: "Business type wise view",
        path: "/reports/businesstypewiseview",
        cName: "sub-nav",
      },
      {
        title: "SBU-Client wise view",
        path: "/reports/sbuclientwiseview",
        cName: "sub-nav",
      },
      {
        title: "Probability type view",
        path: "/reports/probabilitytypeview",
        cName: "sub-nav",
      },
      {
        title: "Region-wise view",
        path: "/reports/regionwiseview",
        cName: "sub-nav",
      },
      {
        title: "BU-wise view",
        path: "/reports/buwiseview",
        cName: "sub-nav",
      },
      {
        title: "Client-wise view",
        path: "/reports/clientwiseview",
        cName: "sub-nav",
      },
      {
        title: "Archive",
        path: "/reports/archive",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Settings",
    path: "/settings",
    // icon: < AiIcons.AiFillSetting/>,
    icon: < SettingsIcon style={{fontSize:"medium"}}/>,
    iconClosed: <ArrowDropDownIcon />,
    iconOpened: <ArrowDropUpIcon />,

    subNav: [
      {
        title: "Account",
        path: "/settings/account",
        cName: "sub-nav",
      },
      {
        title: "Opportunity",
        path: "/settings/opportunity",
        cName: "sub-nav",
      },
      {
        title: "Roles",
        path: "/settings/roles",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Calendar",
    path: "/calender",
    // icon: <AiIcons.AiFillCalendar/>,
    icon: <CalendarMonthOutlinedIcon style={{fontSize:"medium"}} />,

    iconClosed: <ArrowDropDownIcon />,
    iconOpened: <ArrowDropUpIcon />,
    subNav: [
      {
        title: "Holiday Calender",
        path: "/calender/holidaycalender",
        cName: "sub-nav",
      },
      {
        title: "Fortnightly meetings",
        path: "/calender/fortnightlymeeting",
        cName: "sub-nav",
      },
      {
        title: "Monthly BDM Meetings",
        path: "/calender/monthlybdmmeetings",
        cName: "sub-nav",
      },
    ],
   
  },
  {
    title: "Administration",
    path: "/administration",
    // icon: <AiIcons.AiFillAccountBook/>,
    icon: <AdminPanelSettingsOutlinedIcon style={{fontSize:"medium"}}/>,
    iconClosed: <ArrowDropDownIcon />,
    iconOpened: <ArrowDropUpIcon />,

    subNav: [
      // {
      //   title: "Organization",
      //   path: "/administration/organization",
      //   cName: "sub-nav",
      // },
      {
        title: "BU",
        path: "/administration/bu",
        cName: "sub-nav",
      },
      {
        title: "Region",
        path: "/administration/region",
        cName: "sub-nav",
      },
      {
        title: "SBU",
        path: "/administration/sbu",
        cName: "sub-nav",
      },
      {
        title: "SBU Head",
        path: "/administration/sbuhead",
        cName: "sub-nav",
      },
      {
        title: "Location",
        path: "/administration/location",
        cName: "sub-nav",
      },
      {
        title: "BDM",
        path: "/administration/bdm",
        cName: "sub-nav",
      },
      {
        title: "Probability Type",
        path: "/administration/probabilitytype",
        cName: "sub-nav",
      },
      {
        title: "Business Type",
        path: "/administration/businesstype",
        cName: "sub-nav",
      },
      {
        title: "COC Practice",
        path: "/administration/cocPractice",
        cName: "sub-nav",
      },
      {
        title: "Pricing Type",
        path: "/administration/pricingType",
        cName: "sub-nav",
      },
      {
        title: "Status",
        path: "/administration/status",
        cName: "sub-nav",
      },
      {
        title: "WO Status",
        path: "/administration/wostatus",
        cName: "sub-nav",
      },
      {
        title: "Financial Year",
        path: "/administration/financialYear",
        cName: "sub-nav",
      },
      {
        title: "Currency",
        path: "/administration/currency",
        cName: "sub-nav",
      },
      {
        title: "Notification Config",
        path: "/administration/notificationconfig",
        cName: "sub-nav",
      },
      {
        title: "Global Leave Loss Factor",
        path: "/administration/globalleavelossfactor",
        cName: "sub-nav",
      },
    ],
  },
];
