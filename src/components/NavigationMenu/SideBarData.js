import React from "react";
import * as AiIcons from "react-icons/ai";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AiIcons.AiFillHome />,
    subNav: [],
  },
  {
    title: "Revenue",
    path: "/revenue",
    icon: <AiIcons.AiFillSignal />,

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
    icon: <AiIcons.AiFillSchedule />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <AiIcons.AiFillSetting />,
  },
  {
    title: "Calendar",
    path: "/calender",
    icon: <AiIcons.AiFillCalendar />,
  },
  {
    title: "Administration",
    path: "/administration",
    icon: <AiIcons.AiFillAccountBook />,

    subNav: [
      {
        title: "Organization",
        path: "/administration/organization",
        cName: "sub-nav",
      },
      {
        title: "Business Unit",
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
        title: "CoC Practice",
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
        path: "/admistration/currency",
        cName: "sub-nav",
      },
      {
        title: "Notification Config",
        path: "/admistration/notificationconfig",
        cName: "sub-nav",
      },
      {
        title: "Global Leave Loss Factor",
        path: "/admistration/globalleavelossfactor",
        cName: "sub-nav",
      },
    ],
  },
];
