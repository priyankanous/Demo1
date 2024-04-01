import React, { useState, useEffect, useRef } from "react";
import { AiFillPlusSquare, AiOutlineClose } from "react-icons/ai";
import { modalStyleObject } from "../../utils/constantsValue";
import Checkbox from "@mui/material/Checkbox";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import Divider from "@mui/material/Divider";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import {
  Table,
  Modal,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  TextField,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import { Box, Typography, IconButton } from "@mui/material";
import {
  TableRowSection,
  TableCellSection,
  ModalHeadingSection,
  ModalHeadingText,
  ModalDetailSection,
  InputTextLabel,
  InputField,
  ButtonSection,
  ModalControlButton,
  MoadalStyle,
  ModalControlButton1,
  ModalControlButton2,
  ModalControlButtonapply,
} from "../../utils/constantsValue";
import {
  ModalHeading,
  ModalIcon,
  NotificationArrowIcons,
} from "../../utils/Value";
import { MemoizedBaseComponent } from "../CommonComponent/Settings/settingBasedComponent";
import * as AiIcons from "react-icons/ai";
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function RoleUserPermission() {
  const defaultRolesObj = {
    roleName: "",
    roleDisplayName: "",
    selectAllPermissions: false,
    dashboardPermissionVO: {
      dashboardPermissionAll: false,
      readDashboardRequired: false,
      editDashboardRequired: false,
    },
    revenuePermissionVO: {
      revenuePermissionAll: false,
      viewAllEntries: false,
      rollingRevenueEntryPermissionVO: {
        rollingrevenueEntryPermissionAll: false,
        viewAllEntriesRequired: false,
        addRevenueEntryRequired: false,
        editRevenueEntryRequired: false,
        deleteRevenueEntryRequired: false,
        copyRevenueEntryRequired: false,
        submitRevenueEntryRequired: false,
        exportRequired: false,
      },
      invoiceDataUploadPermissionVO: {
        invoiceDataUploadPermissionAll: false,
        viewListRequired: false,
        uploadDataRequired: false,
        editableRequired: false,
        deleteRequired: false,
      },
      reviewandPublishPermissionVO: {
        reviewandPublishPermissionAll: false,
        viewRequired: false,
        reviewAndSubmitRequired: false,
        saveRequired: false,
        copyRequired: false,
        editRequired: false,
        publishRequired: false,
        saveRecipientsRequired: false,
      },
    },
    reportsPermissionVO: {
      reportsPermissionsAll: false,
      viewAllEntries: false,
      businessTypeViewPermissionVO: {
        businessTypeViewPermissionAll: false,
        reportsCommonPermissionVO: {
          viewAll: false,
          setFilter: false,
          export: false,
        },
      },
      sbuClientViewPermissionVO: {
        sbuClientViewPermissionAll: false,
        reportsCommonPermissionVO: {
          viewAll: false,
          setFilter: false,
          export: false,
        },
      },
      probabilityTypePermissionVO: {
        probabilityTypePermissionAll: false,
        reportsCommonPermissionVO: {
          viewAll: false,
          setFilter: false,
          export: false,
        },
      },
      regionViewPermissionVO: {
        regionViewPermissionAll: false,
        reportsCommonPermissionVO: {
          viewAll: false,
          setFilter: false,
          export: false,
        },
      },
      buViewPermissionVO: {
        businessUnitViewPermissionAll: false,
        reportsCommonPermissionVO: {
          viewAll: false,
          setFilter: false,
          export: false,
        },
      },
      clientWisePermissionVO: {
        clientWisePermissionAll: false,
        reportsCommonPermissionVO: {
          viewAll: false,
          setFilter: false,
          export: false,
        },
      },
      archiveWisePermissionVO: {
        archiveWisePermissionAll: false,
        reportsCommonPermissionVO: {
          viewAll: false,
          setFilter: false,
          export: false,
        },
      },
    },
    settingsPermissionVO: {
      settingsPermissionAll: false,
      viewAll: false,
      rolesPermissionVO: {
        rolesPermissionAll: false,
        createRoleRequired: false,
        editRoleRequired: false,
        deleteRequired: false,
        active: false,
      },
      roleUserAssignmentPermissionVO: {
        roleUserAssignmentPermissionAll: false,
        createOrUploadRequired: false,
        editOrReUploadRequired: false,
        viewRequired: false,
        deleteRequired: false,
      },
      explicitPermissionVO: {
        explicitPermissionAll: false,
        createRequired: false,
        editRequired: false,
        viewRequired: false,
        deleteRequired: false,
        active: false,
      },
      annualTargetEntryPermissionVO: {
        annualTargetEntryPermissionAll: false,
        createRequired: false,
        editRequired: false,
        viewRequired: false,
        deleteRequired: false,
      },
    },
    calendarPermissionVO: {
      calendarPermissionAll: false,
      viewAllCalendarPermission: false,
      holidayCalendarPermissionVO: {
        holidayCalendarPermissionAll: false,
        commonCalendarPermissionVO: {
          viewRequired: false,
          addRequired: false,
          editRequired: false,
          deleteRequired: false,
        },
      },
      fortnightlyMeetingPermissionVO: {
        fortnightlyMeetingPermissionAll: false,
        commonCalendarPermissionVO: {
          viewRequired: false,
          addRequired: false,
          editRequired: false,
          deleteRequired: false,
        },
      },
      bdmMeetingPermissionVO: {
        bdmMeetingPermissionAll: false,
        commonCalendarPermissionVO: {
          viewRequired: false,
          addRequired: false,
          editRequired: false,
          deleteRequired: false,
        },
      },
    },
    administrationPermissionVO: {
      administrationPermissionAll: false,
      viewAllAdministrationPermission: false,
      accountPermissionVO: {
        accountPermissionAll: false,
        commonAdministrationPermissionVO: {
          view: false,
          add: false,
          edit: false,
          activeOrDeactive: false,
          delete: false,
        },
      },
      opportunityPermissionVO: {
        opportunityPermissionAll: false,
        commonAdministrationPermissionVO: {
          view: false,
          add: false,
          edit: false,
          activeOrDeactive: false,
          delete: false,
        },
      },
      businessUnitPermissionVO: {
        businessUnitPermissionAll: false,
        commonAdministrationPermissionVO: {
          view: false,
          add: false,
          edit: false,
          activeOrDeactive: false,
          delete: false,
        },
      },
      regionPermissionVO: {
        regionPermissionAll: false,
        commonAdministrationPermissionVO: {
          view: false,
          add: false,
          edit: false,
          activeOrDeactive: false,
          delete: false,
        },
      },
      sbuPermissionVO: {
        sbuPermissionAll: false,
        commonAdministrationPermissionVO: {
          view: false,
          add: false,
          edit: false,
          activeOrDeactive: false,
          delete: false,
        },
      },
      sbuHeadPermissionVO: {
        sbuHeadPermissionAll: false,
        commonAdministrationPermissionVO: {
          view: false,
          add: false,
          edit: false,
          activeOrDeactive: false,
          delete: false,
        },
      },
      locationPermissionVO: {
        locationPermissionAll: false,
        commonAdministrationPermissionVO: {
          view: false,
          add: false,
          edit: false,
          activeOrDeactive: false,
          delete: false,
        },
      },
      bdmPermissionVO: {
        bdmPermissionAll: false,
        commonAdministrationPermissionVO: {
          view: false,
          add: false,
          edit: false,
          activeOrDeactive: false,
          delete: false,
        },
      },
      probabilityPermissionVO: {
        probabilityPermissionAll: false,
        commonAdministrationPermissionVO: {
          view: false,
          add: false,
          edit: false,
          activeOrDeactive: false,
          delete: false,
        },
      },
      businessTypePermissionVO: {
        businessTypePermissionAll: false,
        commonAdministrationPermissionVO: {
          view: false,
          add: false,
          edit: false,
          activeOrDeactive: false,
          delete: false,
        },
      },
      cocPracticePermissionVO: {
        cocPracticePermissionAll: false,
        commonAdministrationPermissionVO: {
          view: false,
          add: false,
          edit: false,
          activeOrDeactive: false,
          delete: false,
        },
      },
      pricingTypePermissionVO: {
        pricingTypePermissionAll: false,
        commonAdministrationPermissionVO: {
          view: false,
          add: false,
          edit: false,
          activeOrDeactive: false,
          delete: false,
        },
      },
      workOrderPermissionVO: {
        workOrderPermissionAll: false,
        commonAdministrationPermissionVO: {
          view: false,
          add: false,
          edit: false,
          activeOrDeactive: false,
          delete: false,
        },
      },
      financialYearPermissionVO: {
        financialYearPermissionAll: false,
        commonAdministrationPermissionVO: {
          view: false,
          add: false,
          edit: false,
          activeOrDeactive: false,
          delete: false,
        },
      },
      currencyPermissionVO: {
        currencyPermissionAll: false,
        commonAdministrationPermissionVO: {
          view: false,
          add: false,
          edit: false,
          activeOrDeactive: false,
          delete: false,
        },
      },
      notificationConfigPermissionVO: {
        notificationConfigPermissionAll: false,
        commonAdministrationPermissionVO: {
          view: false,
          add: false,
          edit: false,
          activeOrDeactive: false,
          delete: false,
        },
      },
      globalLeaveLassFactorPermissionVO: {
        globalLeaveLassFactorPermissionAll: false,
        commonAdministrationPermissionVO: {
          view: false,
          add: false,
          edit: false,
          activeOrDeactive: false,
          delete: false,
        },
      },
    },
  };
  const defaultSelectAllObj = {
    roleName: "",
    roleDisplayName: "",
    selectAllPermissions: true,
    dashboardPermissionVO: {
      dashboardPermissionAll: true,
      readDashboardRequired: true,
      editDashboardRequired: true,
    },
    revenuePermissionVO: {
      revenuePermissionAll: true,
      viewAllEntries: true,
      rollingRevenueEntryPermissionVO: {
        rollingrevenueEntryPermissionAll: true,
        viewAllEntriesRequired: true,
        addRevenueEntryRequired: true,
        editRevenueEntryRequired: true,
        deleteRevenueEntryRequired: true,
        copyRevenueEntryRequired: true,
        submitRevenueEntryRequired: true,
        exportRequired: true,
      },
      invoiceDataUploadPermissionVO: {
        invoiceDataUploadPermissionAll: true,
        viewListRequired: true,
        uploadDataRequired: true,
        editableRequired: true,
        deleteRequired: true,
      },
      reviewandPublishPermissionVO: {
        reviewandPublishPermissionAll: true,
        viewRequired: true,
        reviewAndSubmitRequired: true,
        saveRequired: true,
        copyRequired: true,
        editRequired: true,
        publishRequired: true,
        saveRecipientsRequired: true,
      },
    },
    reportsPermissionVO: {
      reportsPermissionsAll: true,
      viewAllEntries: true,
      businessTypeViewPermissionVO: {
        businessTypeViewPermissionAll: true,
        reportsCommonPermissionVO: {
          viewAll: true,
          setFilter: true,
          export: true,
        },
      },
      sbuClientViewPermissionVO: {
        sbuClientViewPermissionAll: true,
        reportsCommonPermissionVO: {
          viewAll: true,
          setFilter: true,
          export: true,
        },
      },
      probabilityTypePermissionVO: {
        probabilityTypePermissionAll: true,
        reportsCommonPermissionVO: {
          viewAll: true,
          setFilter: true,
          export: true,
        },
      },
      regionViewPermissionVO: {
        regionViewPermissionAll: true,
        reportsCommonPermissionVO: {
          viewAll: true,
          setFilter: true,
          export: true,
        },
      },
      buViewPermissionVO: {
        businessUnitViewPermissionAll: true,
        reportsCommonPermissionVO: {
          viewAll: true,
          setFilter: true,
          export: true,
        },
      },
      clientWisePermissionVO: {
        clientWisePermissionAll: true,
        reportsCommonPermissionVO: {
          viewAll: true,
          setFilter: true,
          export: true,
        },
      },
      archiveWisePermissionVO: {
        archiveWisePermissionAll: true,
        reportsCommonPermissionVO: {
          viewAll: true,
          setFilter: true,
          export: true,
        },
      },
    },
    settingsPermissionVO: {
      settingsPermissionAll: true,
      viewAll: true,
      rolesPermissionVO: {
        rolesPermissionAll: true,
        createRoleRequired: true,
        editRoleRequired: true,
        deleteRequired: true,
        active: true,
      },
      roleUserAssignmentPermissionVO: {
        roleUserAssignmentPermissionAll: true,
        createOrUploadRequired: true,
        editOrReUploadRequired: true,
        viewRequired: true,
        deleteRequired: true,
      },
      explicitPermissionVO: {
        explicitPermissionAll: true,
        createRequired: true,
        editRequired: true,
        viewRequired: true,
        deleteRequired: true,
        active: true,
      },
      annualTargetEntryPermissionVO: {
        annualTargetEntryPermissionAll: true,
        createRequired: true,
        editRequired: true,
        viewRequired: true,
        deleteRequired: true,
      },
    },
    calendarPermissionVO: {
      calendarPermissionAll: true,
      viewAllCalendarPermission: true,
      holidayCalendarPermissionVO: {
        holidayCalendarPermissionAll: true,
        commonCalendarPermissionVO: {
          viewRequired: true,
          addRequired: true,
          editRequired: true,
          deleteRequired: true,
        },
      },
      fortnightlyMeetingPermissionVO: {
        fortnightlyMeetingPermissionAll: true,
        commonCalendarPermissionVO: {
          viewRequired: true,
          addRequired: true,
          editRequired: true,
          deleteRequired: true,
        },
      },
      bdmMeetingPermissionVO: {
        bdmMeetingPermissionAll: true,
        commonCalendarPermissionVO: {
          viewRequired: true,
          addRequired: true,
          editRequired: true,
          deleteRequired: true,
        },
      },
    },
    administrationPermissionVO: {
      administrationPermissionAll: true,
      viewAllAdministrationPermission: true,
      accountPermissionVO: {
        accountPermissionAll: true,
        commonAdministrationPermissionVO: {
          view: true,
          add: true,
          edit: true,
          activeOrDeactive: true,
          delete: true,
        },
      },
      opportunityPermissionVO: {
        opportunityPermissionAll: true,
        commonAdministrationPermissionVO: {
          view: true,
          add: true,
          edit: true,
          activeOrDeactive: true,
          delete: true,
        },
      },
      businessUnitPermissionVO: {
        businessUnitPermissionAll: true,
        commonAdministrationPermissionVO: {
          view: true,
          add: true,
          edit: true,
          activeOrDeactive: true,
          delete: true,
        },
      },
      regionPermissionVO: {
        regionPermissionAll: true,
        commonAdministrationPermissionVO: {
          view: true,
          add: true,
          edit: true,
          activeOrDeactive: true,
          delete: true,
        },
      },
      sbuPermissionVO: {
        sbuPermissionAll: true,
        commonAdministrationPermissionVO: {
          view: true,
          add: true,
          edit: true,
          activeOrDeactive: true,
          delete: true,
        },
      },
      sbuHeadPermissionVO: {
        sbuHeadPermissionAll: true,
        commonAdministrationPermissionVO: {
          view: true,
          add: true,
          edit: true,
          activeOrDeactive: true,
          delete: true,
        },
      },
      locationPermissionVO: {
        locationPermissionAll: true,
        commonAdministrationPermissionVO: {
          view: true,
          add: true,
          edit: true,
          activeOrDeactive: true,
          delete: true,
        },
      },
      bdmPermissionVO: {
        bdmPermissionAll: true,
        commonAdministrationPermissionVO: {
          view: true,
          add: true,
          edit: true,
          activeOrDeactive: true,
          delete: true,
        },
      },
      probabilityPermissionVO: {
        probabilityPermissionAll: true,
        commonAdministrationPermissionVO: {
          view: true,
          add: true,
          edit: true,
          activeOrDeactive: true,
          delete: true,
        },
      },
      businessTypePermissionVO: {
        businessTypePermissionAll: true,
        commonAdministrationPermissionVO: {
          view: true,
          add: true,
          edit: true,
          activeOrDeactive: true,
          delete: true,
        },
      },
      cocPracticePermissionVO: {
        cocPracticePermissionAll: true,
        commonAdministrationPermissionVO: {
          view: true,
          add: true,
          edit: true,
          activeOrDeactive: true,
          delete: true,
        },
      },
      pricingTypePermissionVO: {
        pricingTypePermissionAll: true,
        commonAdministrationPermissionVO: {
          view: true,
          add: true,
          edit: true,
          activeOrDeactive: true,
          delete: true,
        },
      },
      workOrderPermissionVO: {
        workOrderPermissionAll: true,
        commonAdministrationPermissionVO: {
          view: true,
          add: true,
          edit: true,
          activeOrDeactive: true,
          delete: true,
        },
      },
      financialYearPermissionVO: {
        financialYearPermissionAll: true,
        commonAdministrationPermissionVO: {
          view: true,
          add: true,
          edit: true,
          activeOrDeactive: true,
          delete: true,
        },
      },
      currencyPermissionVO: {
        currencyPermissionAll: true,
        commonAdministrationPermissionVO: {
          view: true,
          add: true,
          edit: true,
          activeOrDeactive: true,
          delete: true,
        },
      },
      notificationConfigPermissionVO: {
        notificationConfigPermissionAll: true,
        commonAdministrationPermissionVO: {
          view: true,
          add: true,
          edit: true,
          activeOrDeactive: true,
          delete: true,
        },
      },
      globalLeaveLassFactorPermissionVO: {
        globalLeaveLassFactorPermissionAll: true,
        commonAdministrationPermissionVO: {
          view: true,
          add: true,
          edit: true,
          activeOrDeactive: true,
          delete: true,
        },
      },
    },
  };
  const [rolesData, setRolesData] = useState(defaultRolesObj);
  const [value, setValue] = React.useState("one");
  const [allRoles, setAllRoles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true)

  useEffect(() => {
    getAllRolesData();
  }, []);

  const getAllRolesData = async () => {
    await axios
      .get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/roles`)
      .then((response) => {
        const actualDataObject = response.data.data;
        setAllRoles(actualDataObject);
      });
  };

  const updateIsOpen = (value) => {
    setIsOpen(value);
  };

  const updateRolesData = (dataObj) => {
    if(isSaveDisabled) {
      setIsSaveDisabled(false)
    }
    setRolesData(dataObj)
  };

  const handleModalClose = () => {
    resetData();
  };

  const handleChange = (event, newValue) => {
    console.log("Val -->", newValue);
    setValue(newValue);
  };

  const handleChangeradio = (event) => {
    const value = event.target.checked;
    const temp = value ? { ...defaultSelectAllObj } : { ...defaultRolesObj };
    delete temp["roleName"];
    delete temp["roleDisplayName"];
    updateRolesData({ ...rolesData, ...temp });
  };

  const handleRolesDataChange = (
    updateAll,
    viewAll,
    value,
    property,
    section,
    subSection,
    subSectionKey
  ) => {
    console.log("updateAll -->", updateAll);
    console.log("viewAll -->", viewAll);
    console.log("value -->", value);
    console.log("property -->", property);
    console.log("section -->", section);
    console.log("subSection -->", subSection);
    console.log("subSectionKey -->", subSectionKey);

    if (property && section && subSection && subSectionKey) {
      if (typeof updateAll === "boolean") {
        const temp = { ...rolesData };
        const data = temp[`${property}`];
        //To manage the all permissions key of the main section &&
        if (!value) {
          temp["selectAllPermissions"] = value;
          //To manage the all permissions key of the sub section
          const dataKeys = Object.keys(data);
          if (dataKeys?.length > 0) {
            const allPermissionsKey = dataKeys?.find(
              (each) =>
                each?.includes("PermissionAll") ||
                each?.includes("PermissionsAll")
            );
            const viewAllEntriesKey = dataKeys?.find((each) =>
              each?.includes("viewAllEntries")
            );
            console.log("dataKeys -->", dataKeys);
            console.log("allPermissionsKey -->", allPermissionsKey);
            if (allPermissionsKey) {
              data[allPermissionsKey] = value;
            }
            if (viewAllEntriesKey) {
              temp[`${property}`][viewAllEntriesKey] = value;
            }
          }
        }
        //To manage the inner section data
        const sectionData = data[`${section}`];
        if (sectionData) {
          const sectionDataKeys = Object.keys(sectionData);
          if (sectionDataKeys?.length > 0) {
            sectionDataKeys?.forEach((eachKey) => {
              if (typeof sectionData[eachKey]) {
                if (typeof sectionData[eachKey] !== "boolean") {
                  const sectionInnerData = sectionData[eachKey];
                  if (sectionInnerData) {
                    const sectionInnerDataKeys = Object.keys(sectionInnerData);
                    if (sectionInnerDataKeys?.length > 0) {
                      sectionInnerDataKeys?.forEach((sectionInnerKey) => {
                        sectionInnerData[sectionInnerKey] = updateAll;
                      });
                      sectionData[eachKey] = sectionInnerData;
                    }
                  }
                } else {
                  sectionData[eachKey] = updateAll;
                }
              }
            });
            temp[property][section] = sectionData;
          }
        }
        updateRolesData(temp);
      } else {
        const temp = { ...rolesData };
        //To manage the all permissions key of the main section &&
        if (!value) {
          temp["selectAllPermissions"] = value;
          //To manage the all permissions key of the section
          const dataKeys = Object.keys(temp[`${property}`]);
          if (dataKeys?.length > 0) {
            const allPermissionsKey = dataKeys?.find(
              (each) =>
                each?.includes("PermissionAll") ||
                each?.includes("PermissionsAll")
            );
            const viewAllEntriesKey = dataKeys?.find((each) =>
              each?.includes("viewAllEntries")
            );
            if (allPermissionsKey) {
              temp[`${property}`][allPermissionsKey] = value;
            }
            if (
              (subSection?.toLowerCase()?.includes("view") &&
                !subSection?.toLowerCase()?.includes("review")) ||
              (subSectionKey?.toLowerCase()?.includes("view") &&
                !subSectionKey?.toLowerCase()?.includes("review"))
            ) {
              if (viewAllEntriesKey) {
                temp[`${property}`][viewAllEntriesKey] = value;
              }
            }
          }
          //To manage the all permissions key of the sub section
          const innerDataKeys = Object.keys(temp[`${property}`][section]);
          if (innerDataKeys?.length > 0) {
            const allPermissionsKey = innerDataKeys?.find(
              (each) =>
                each?.includes("PermissionAll") ||
                each?.includes("PermissionsAll")
            );
            if (allPermissionsKey) {
              temp[`${property}`][section][allPermissionsKey] = value;
            }
          }
        }
        temp[property][section][subSection][subSectionKey] = value;
        updateRolesData(temp);
      }
    } else if (property && section && subSection) {
      if (typeof updateAll === "boolean") {
        const temp = { ...rolesData };
        const data = temp[`${property}`];
        //To manage the all permissions key of the main section
        if (!value) {
          temp["selectAllPermissions"] = value;
          //To manage the all permissions key of the sub section
          const dataKeys = Object.keys(data);
          if (dataKeys?.length > 0) {
            const allPermissionsKey = dataKeys?.find(
              (each) =>
                each?.includes("PermissionAll") ||
                each?.includes("PermissionsAll")
            );
            const viewAllEntriesKey = dataKeys?.find((each) =>
              each?.includes("viewAllEntries")
            );
            if (allPermissionsKey) {
              data[allPermissionsKey] = value;
            }
            if (viewAllEntriesKey) {
              data[viewAllEntriesKey] = value;
            }
          }
        }
        //To manage the inner section data
        const sectionData = data[`${section}`];
        if (sectionData) {
          const sectionDataKeys = Object.keys(sectionData);
          if (sectionDataKeys?.length > 0) {
            sectionDataKeys?.forEach((eachKey) => {
              if (typeof sectionData[eachKey]) {
                if (typeof sectionData[eachKey] !== "boolean") {
                  const sectionInnerData = sectionData[eachKey];
                  if (sectionInnerData) {
                    const sectionInnerDataKeys = Object.keys(sectionInnerData);
                    if (sectionInnerDataKeys?.length > 0) {
                      sectionInnerDataKeys?.forEach((sectionInnerKey) => {
                        sectionInnerData[sectionInnerKey] = updateAll;
                      });
                      sectionData[eachKey] = sectionInnerData;
                    }
                  }
                } else {
                  sectionData[eachKey] = updateAll;
                }
              }
            });
            temp[property][section] = sectionData;
          }
        }
        //To manage the inner most section data
        const subSectionData = data[`${section}`][subSection];
        if (subSectionData) {
          const subSectionDataKeys = Object.keys(subSectionData);
          if (subSectionDataKeys?.length > 0) {
            subSectionDataKeys?.forEach((eachKey) => {
              subSectionDataKeys[eachKey] = updateAll;
            });
            temp[property][section][subSection] = subSectionData;
          }
        }
        updateRolesData(temp);
      } else {
        const temp = { ...rolesData };
        //To manage the all permissions key of the main section &&
        if (!value) {
          temp["selectAllPermissions"] = value;
          //To manage the all permissions key of the section
          const dataKeys = Object.keys(temp[`${property}`]);
          if (dataKeys?.length > 0) {
            const allPermissionsKey = dataKeys?.find(
              (each) =>
                each?.includes("PermissionAll") ||
                each?.includes("PermissionsAll")
            );
            const viewAllEntriesKey = dataKeys?.find((each) =>
              each?.includes("viewAllEntries")
            );
            if (allPermissionsKey) {
              temp[`${property}`][allPermissionsKey] = value;
            }
            if (
              subSection?.toLowerCase()?.includes("view") &&
              !subSection?.toLowerCase()?.includes("review")
            ) {
              if (viewAllEntriesKey) {
                temp[`${property}`][viewAllEntriesKey] = value;
              }
            }
          }
          //To manage the all permissions key of the sub section
          const innerDataKeys = Object.keys(temp[`${property}`][section]);
          if (innerDataKeys?.length > 0) {
            const allPermissionsKey = innerDataKeys?.find(
              (each) =>
                each?.includes("PermissionAll") ||
                each?.includes("PermissionsAll")
            );
            if (allPermissionsKey) {
              temp[`${property}`][section][allPermissionsKey] = value;
            }
          }
        }
        temp[property][section][subSection] = value;
        updateRolesData(temp);
      }
    } else if (property && section) {
      if (typeof updateAll === "boolean") {
        const temp = { ...rolesData };
        if (!value) {
          temp["selectAllPermissions"] = value;
        }
        const outerData = temp[property];
        const outerDataKeys = Object.keys(outerData);
        if (outerDataKeys?.length > 0) {
          outerDataKeys?.forEach((outerEachKey) => {
            if (typeof outerData[outerEachKey]) {
              if (typeof outerData[outerEachKey] !== "boolean") {
                const innerData = outerData[outerEachKey];
                const innerDataKeys = Object.keys(innerData);
                if (innerDataKeys?.length > 0) {
                  innerDataKeys?.forEach((innerEachKey) => {
                    if (typeof innerData[innerEachKey]) {
                      if (typeof innerData[innerEachKey] !== "boolean") {
                        const innerSectionData = innerData[innerEachKey];
                        const innerSectionDataKeys =
                          Object.keys(innerSectionData);
                        if (innerSectionDataKeys?.length > 0) {
                          innerSectionDataKeys?.forEach(
                            (innerSectionEachKey) => {
                              innerSectionData[innerSectionEachKey] = updateAll;
                            }
                          );
                          innerData[innerEachKey] = innerSectionData;
                        }
                      } else {
                        innerData[innerEachKey] = updateAll;
                      }
                    }
                  });
                  outerData[outerEachKey] = innerData;
                }
              } else {
                // if(!outerEachKey?.toLowerCase()?.includes("view")) {
                outerData[outerEachKey] = updateAll;
                // }
              }
            }
          });
          temp[property] = outerData;
          updateRolesData(temp);
        }
      } else if (typeof viewAll === "boolean") {
        const temp = { ...rolesData };
        //To handle the value of false
        if (!value) {
          temp["selectAllPermissions"] = value;
          //To manage the all permissions key of the section
          const dataKeys = Object.keys(temp[`${property}`]);
          if (dataKeys?.length > 0) {
            const allPermissionsKey = dataKeys?.find(
              (each) =>
                each?.includes("PermissionAll") ||
                each?.includes("PermissionsAll")
            );
            const viewAllEntriesKey = dataKeys?.find((each) =>
              each?.includes("viewAllEntries")
            );
            console.log("allPermissionsKey -->", allPermissionsKey);
            console.log("viewAllEntriesKey -->", viewAllEntriesKey);
            if (allPermissionsKey) {
              temp[`${property}`][allPermissionsKey] = value;
            }
            if (
              subSection?.toLowerCase()?.includes("view") &&
              !subSection?.toLowerCase()?.includes("review")
            ) {
              if (viewAllEntriesKey) {
                temp[`${property}`][viewAllEntriesKey] = value;
              }
            }
          }
          //To manage the all permissions key of the sub section
          const innerDataKeys = Object.keys(temp[`${property}`][section]);
          if (innerDataKeys?.length > 0) {
            const allPermissionsKey = innerDataKeys?.find(
              (each) =>
                each?.includes("PermissionAll") ||
                each?.includes("PermissionsAll")
            );
            if (allPermissionsKey) {
              temp[`${property}`][section][allPermissionsKey] = value;
            }
          }
        }
        temp[property][section] = value;
        //To manipulate the rest of the values
        const outerData = temp[property];
        const outerDataKeys = Object.keys(outerData);
        if (outerDataKeys?.length > 0) {
          outerDataKeys?.forEach((outerEachKey) => {
            if (typeof outerData[outerEachKey]) {
              if (typeof outerData[outerEachKey] !== "boolean") {
                const innerData = outerData[outerEachKey];
                const innerDataKeys = Object.keys(innerData);
                if (innerDataKeys?.length > 0) {
                  innerDataKeys?.forEach((innerEachKey) => {
                    if (typeof innerData[innerEachKey]) {
                      if (typeof innerData[innerEachKey] !== "boolean") {
                        const innerSectionData = innerData[innerEachKey];
                        const innerSectionDataKeys =
                          Object.keys(innerSectionData);
                        if (innerSectionDataKeys?.length > 0) {
                          innerSectionDataKeys?.forEach(
                            (innerSectionEachKey) => {
                              if (
                                innerSectionEachKey
                                  ?.toLowerCase()
                                  ?.includes("view") &&
                                !innerSectionEachKey
                                  ?.toLowerCase()
                                  ?.includes("review")
                              ) {
                                innerSectionData[innerSectionEachKey] = viewAll;
                              }
                            }
                          );
                          innerData[innerEachKey] = innerSectionData;
                        }
                      } else {
                        if (
                          innerEachKey?.toLowerCase()?.includes("view") &&
                          !innerEachKey?.toLowerCase()?.includes("review")
                        ) {
                          innerData[innerEachKey] = viewAll;
                        }
                      }
                    }
                  });
                  outerData[outerEachKey] = innerData;
                }
              } else {
                if (
                  outerEachKey?.toLowerCase()?.includes("view") &&
                  !outerEachKey?.toLowerCase()?.includes("review")
                ) {
                  outerData[outerEachKey] = viewAll;
                }
              }
            }
          });
          temp[property] = outerData;
          updateRolesData(temp);
        }
      } else {
        const temp = { ...rolesData };
        //To handle the value of false
        if (!value) {
          temp["selectAllPermissions"] = value;
          //To manage the all permissions key of the section
          const dataKeys = Object.keys(temp[`${property}`]);
          if (dataKeys?.length > 0) {
            const allPermissionsKey = dataKeys?.find(
              (each) =>
                each?.includes("PermissionAll") ||
                each?.includes("PermissionsAll")
            );
            const viewAllEntriesKey = dataKeys?.find((each) =>
              each?.includes("viewAllEntries")
            );
            console.log("allPermissionsKey -->", allPermissionsKey);
            console.log("viewAllEntriesKey -->", viewAllEntriesKey);
            if (allPermissionsKey) {
              temp[`${property}`][allPermissionsKey] = value;
            }
            if (
              subSection?.toLowerCase()?.includes("view") &&
              !subSection?.toLowerCase()?.includes("review")
            ) {
              if (viewAllEntriesKey) {
                temp[`${property}`][viewAllEntriesKey] = value;
              }
            }
          }
          //To manage the all permissions key of the sub section
          const innerDataKeys = Object.keys(temp[`${property}`][section]);
          if (innerDataKeys?.length > 0) {
            const allPermissionsKey = innerDataKeys?.find(
              (each) =>
                each?.includes("PermissionAll") ||
                each?.includes("PermissionsAll")
            );
            if (allPermissionsKey) {
              temp[`${property}`][section][allPermissionsKey] = value;
            }
          }
        }
        temp[property][section] = value;
        updateRolesData(temp);
      }
    } else if (property) {
      const temp = { ...rolesData };
      temp[property] = value;
      updateRolesData(temp);
    }
  };

  const resetData = () => {
    setAllRoles(null);
    setIsOpen(false);
    getAllRolesData();
    updateRolesData(defaultRolesObj);
  };

  const handleSave = async (e) => {
    if (!rolesData?.roleDisplayName || !rolesData?.roleName) {
      setIsSubmitted(true);
    } else {
      try {
        setIsSubmitted(false);
        console.log("issbunn", isSubmitted);
        if(rolesData?.roleId){
          const response = await axios.put(
            `http://192.168.16.55:8080/rollingrevenuereport/api/v1/roles/${rolesData?.roleId}`,
            rolesData
          );
          console.log("rolesdata", response.data.data);
        }else{
          const response = await axios.post(
            "http://192.168.16.55:8080/rollingrevenuereport/api/v1/roles",
            rolesData
          );
          console.log("rolesdata", response.data.data);
        }
        resetData();
      } catch {}
    }
  };

  const roles = allRoles?.map((ele) => {
    return {
      label: ele?.roleName,
      value: ele,
    };
  });

  return (
    <div>
      <MemoizedBaseComponent
        field="Roles"
        columns={["Display Name", "Role Name", ""]}
        data={allRoles}
        buttonText="Add New"
        Tr={(obj) => {
          return (
            <Tr
              data={obj}
              value={value}
              rolesData={allRoles}
              setIsSaveDisabled={setIsSaveDisabled}
              updateIsOpen={updateIsOpen}
              updateRolesData={updateRolesData}
              getAllRolesData={getAllRolesData}
              handleRolesDataChange={handleRolesDataChange}
              handleTabChange={handleChange}
              handleChangeradio={handleChangeradio}
              resetData={resetData}
            />
          );
        }}
        setIsOpen={setIsOpen}
      />
      <Modal open={isOpen} onClose={handleModalClose}>
        <Box sx={MoadalStyle} style={{ width: "1000px", height: "526px" }}>
          <ModalHeadingSection
            style={{ background: "#EBEBEB", borderRadius: "10px 10px 0px 0px" }}
          >
            <ModalHeadingText>Setup Roles</ModalHeadingText>
            <CloseIcon
              onClick={() => {
                resetData();
              }}
              style={{ cursor: "pointer" }}
            />
          </ModalHeadingSection>
          <ModalDetailSection style={{ maxHeight: "450px" }}>
            <form id="reg-form">
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  rowGap: "30px",
                  marginTop: "20px",
                }}
              >
                <div>
                  <span
                    style={{
                      fontWeight: "500",
                      fontSize: "16px",
                      flexBasis: "25%",
                      fontFamily: "Roboto",
                      lineHeight: "18.75px",
                    }}
                  ></span>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      rowGap: "30px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexBasis: "100%",
                        gap: "20px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: "6px",
                        }}
                      >
                        <div
                          style={{
                            marginRight: "20px",
                            fontFamily: "Roboto",
                            lineHeight: "18.75px",
                            fontSize: "16px",
                          }}
                        >
                          <div>
                            <span style={{ color: "red" }}>*</span>
                            <span>Display Name</span>
                          </div>
                          <div>
                            <InputField
                              size="small"
                              type="text"
                              id="display-name"
                              variant="outlined"
                              spellCheck="false"
                              value={rolesData?.roleDisplayName}
                              style={{
                                border:
                                  isSubmitted && !rolesData.roleDisplayName
                                    ? "1px solid red"
                                    : "1px solid lightgray",
                                borderRadius: "5px",
                              }}
                              onChange={(e) => {
                                handleRolesDataChange(
                                  null,
                                  null,
                                  e.target.value,
                                  "roleDisplayName"
                                );
                              }}
                            />
                          </div>
                        </div>

                        <div>
                          <div>
                            <span style={{ color: "red" }}>*</span>
                            <span>Role Name</span>
                          </div>
                          <div>
                            <InputField
                              size="small"
                              type="text"
                              id="role-name"
                              variant="outlined"
                              spellCheck="false"
                              value={rolesData?.roleName}
                              style={{
                                border:
                                  isSubmitted && !rolesData.roleName
                                    ? "1px solid red"
                                    : "1px solid lightgray",
                                borderRadius: "5px",
                              }}
                              onChange={(e) => {
                                handleRolesDataChange(
                                  null,
                                  null,
                                  e.target.value,
                                  "roleName"
                                );
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div>
                          <span> Copy From </span>
                        </div>
                        <div>
                          <FormControl>
                            <Select
                              size="small"
                              style={{
                                background: "white",
                                width: "150px",
                              }}
                              onChange={(event) => {
                                const temp = { ...event.target.value };
                                delete temp["roleId"];
                                delete temp["roleName"];
                                delete temp["roleDisplayName"];
                                updateRolesData({
                                  ...rolesData,
                                  ...temp,
                                });
                              }}
                            >
                              {roles?.length > 0 &&
                                roles?.map((role, index) => {
                                  return (
                                    <MenuItem value={role?.value} key={index}>
                                      {role?.label}
                                    </MenuItem>
                                  );
                                })}
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "6px",
                  }}
                ></div>

                <div style={{ width: "100%" }}>
                  <div>
                    <Box sx={{ width: "100%" }}>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <Tabs
                          value={value}
                          onChange={handleChange}
                          textColor="black"
                          indicatorColor="primary"
                          aria-label="secondary tabs example"
                        >
                          <Tab
                            value="one"
                            label="Dashboard"
                            style={{
                              fontFamily: "Roboto",
                              background: value === "one" ? "#fff" : "#E1DEDE",
                            }}
                          />
                          <Divider
                            orientation="vertical"
                            className="seperator"
                            flexItem
                          />
                          <Tab
                            value="two"
                            label="Revenue"
                            style={{
                              fontFamily: "Roboto",
                              background: value === "two" ? "#fff" : "#E1DEDE",
                            }}
                          />
                          <Divider
                            orientation="vertical"
                            className="seperator"
                            flexItem
                          />
                          <Tab
                            value="three"
                            label="Reports"
                            style={{
                              fontFamily: "Roboto",
                              background:
                                value === "three" ? "#fff" : "#E1DEDE",
                            }}
                          />
                          <Divider
                            orientation="vertical"
                            className="seperator"
                            flexItem
                          />
                          <Tab
                            value="four"
                            label="Settings"
                            style={{
                              fontFamily: "Roboto",
                              background: value === "four" ? "#fff" : "#E1DEDE",
                            }}
                          />
                          <Divider
                            orientation="vertical"
                            className="seperator"
                            flexItem
                          />
                          <Tab
                            value="five"
                            label="Calender"
                            style={{
                              fontFamily: "Roboto",
                              background: value === "five" ? "#fff" : "#E1DEDE",
                            }}
                          />
                          <Divider
                            orientation="vertical"
                            className="seperator"
                            flexItem
                          />
                          <Tab
                            value="six"
                            label="Administration"
                            style={{
                              fontFamily: "Roboto",
                              background: value === "six" ? "#fff" : "#E1DEDE",
                            }}
                          />
                        </Tabs>
                        <div style={{ marginLeft: "5px", marginTop: "4px" }}>
                          <span> Select All </span>
                          <Checkbox
                            checked={rolesData?.selectAllPermissions}
                            onChange={(e) => {
                              handleChangeradio(e);
                            }}
                            value={rolesData?.selectAllPermissions}
                          />
                        </div>
                      </div>
                      {value === "one" && (
                        <div
                          style={{
                            padding: "5px",
                            border: " 0.5px solid rgba(0, 0, 0, 0.65)",
                            background: "#FFFFFF",
                            width: "99%",
                            overflowY: "scroll",
                            height: "200px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.dashboardPermissionVO
                                        ?.dashboardPermissionAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        e.target.checked,
                                        null,
                                        e.target.checked,
                                        "dashboardPermissionVO",
                                        "dashboardPermissionAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.dashboardPermissionVO
                                        ?.dashboardPermissionAll
                                    }
                                  />
                                  <span>Dashboard</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{}}>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div style={{ marginLeft: "6px" }}>
                                  <Checkbox
                                    checked={
                                      rolesData?.dashboardPermissionVO
                                        ?.readDashboardRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "dashboardPermissionVO",
                                        "readDashboardRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.dashboardPermissionVO
                                        ?.readDashboardRequired
                                    }
                                  />
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.dashboardPermissionVO
                                        ?.editDashboardRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "dashboardPermissionVO",
                                        "editDashboardRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.dashboardPermissionVO
                                        ?.editDashboardRequired
                                    }
                                  />
                                  <span>Edit Dashboard</span>
                                </div>
                              </div>
                            </Box>
                          </div>
                        </div>
                      )}
                      {value === "two" && (
                        <div
                          style={{
                            padding: "5px",
                            border: " 0.5px solid rgba(0, 0, 0, 0.65)",
                            background: "#FFFFFF",
                            width: "99%",
                            overflowY: "scroll",
                            height: "200px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.revenuePermissionVO
                                        ?.revenuePermissionAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        e.target.checked,
                                        null,
                                        e.target.checked,
                                        "revenuePermissionVO",
                                        "revenuePermissionAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.revenuePermissionVO
                                        ?.revenuePermissionAll
                                    }
                                  />
                                  <span>Revenue</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.revenuePermissionVO
                                        ?.viewAllEntries
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        e.target.checked,
                                        e.target.checked,
                                        "revenuePermissionVO",
                                        "viewAllEntries"
                                      );
                                    }}
                                    value={
                                      rolesData?.revenuePermissionVO
                                        ?.viewAllEntries
                                    }
                                  />
                                  <span>View All Entries</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{}}>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div>
                                <div
                                  style={{ flexBasis: "25%", display: "flex" }}
                                >
                                  <div style={{ marginLeft: "6px" }}>
                                    <Checkbox
                                      checked={
                                        rolesData?.revenuePermissionVO
                                          ?.rollingRevenueEntryPermissionVO
                                          ?.rollingrevenueEntryPermissionAll
                                      }
                                      onChange={(e) => {
                                        handleRolesDataChange(
                                          e.target.checked,
                                          null,
                                          e.target.checked,
                                          "revenuePermissionVO",
                                          "rollingRevenueEntryPermissionVO",
                                          "rollingrevenueEntryPermissionAll"
                                        );
                                      }}
                                      value={
                                        rolesData?.revenuePermissionVO
                                          ?.rollingRevenueEntryPermissionVO
                                          ?.rollingrevenueEntryPermissionAll
                                      }
                                    />
                                    <span>Rolling Revenue Entry</span>
                                  </div>
                                </div>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.revenuePermissionVO
                                        ?.rollingRevenueEntryPermissionVO
                                        ?.viewAllEntriesRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "revenuePermissionVO",
                                        "rollingRevenueEntryPermissionVO",
                                        "viewAllEntriesRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.revenuePermissionVO
                                        ?.rollingRevenueEntryPermissionVO
                                        ?.viewAllEntriesRequired
                                    }
                                  />
                                  <span>View All Entries</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.revenuePermissionVO
                                        ?.rollingRevenueEntryPermissionVO
                                        ?.addRevenueEntryRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "revenuePermissionVO",
                                        "rollingRevenueEntryPermissionVO",
                                        "addRevenueEntryRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.revenuePermissionVO
                                        ?.rollingRevenueEntryPermissionVO
                                        ?.addRevenueEntryRequired
                                    }
                                  />
                                  <span>Add Revenue Entry</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.revenuePermissionVO
                                        ?.rollingRevenueEntryPermissionVO
                                        ?.editRevenueEntryRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "revenuePermissionVO",
                                        "rollingRevenueEntryPermissionVO",
                                        "editRevenueEntryRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.revenuePermissionVO
                                        ?.rollingRevenueEntryPermissionVO
                                        ?.editRevenueEntryRequired
                                    }
                                  />
                                  <span>Edit Revenue Entry</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.revenuePermissionVO
                                        ?.rollingRevenueEntryPermissionVO
                                        ?.deleteRevenueEntryRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "revenuePermissionVO",
                                        "rollingRevenueEntryPermissionVO",
                                        "deleteRevenueEntryRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.revenuePermissionVO
                                        ?.rollingRevenueEntryPermissionVO
                                        ?.deleteRevenueEntryRequired
                                    }
                                  />
                                  <span>Delete Revenue Entry</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.revenuePermissionVO
                                        ?.rollingRevenueEntryPermissionVO
                                        ?.copyRevenueEntryRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "revenuePermissionVO",
                                        "rollingRevenueEntryPermissionVO",
                                        "copyRevenueEntryRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.revenuePermissionVO
                                        ?.rollingRevenueEntryPermissionVO
                                        ?.copyRevenueEntryRequired
                                    }
                                  />
                                  <span>Copy Revenue Entries</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div style={{ marginLeft: "3px" }}>
                                  <Checkbox
                                    checked={
                                      rolesData?.revenuePermissionVO
                                        ?.rollingRevenueEntryPermissionVO
                                        ?.exportRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "revenuePermissionVO",
                                        "rollingRevenueEntryPermissionVO",
                                        "exportRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.revenuePermissionVO
                                        ?.rollingRevenueEntryPermissionVO
                                        ?.exportRequired
                                    }
                                  />
                                  <span>Export</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{}}>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div style={{ marginLeft: "6px" }}>
                                {console.log()}
                                <Checkbox
                                  checked={
                                    rolesData?.revenuePermissionVO
                                      ?.invoiceDataUploadPermissionVO
                                      ?.invoiceDataUploadPermissionAll
                                  }
                                  onChange={(e) => {
                                    handleRolesDataChange(
                                      e.target.checked,
                                      null,
                                      e.target.checked,
                                      "revenuePermissionVO",
                                      "invoiceDataUploadPermissionVO",
                                      "invoiceDataUploadPermissionAll"
                                    );
                                  }}
                                  value={
                                    rolesData?.revenuePermissionVO
                                      ?.invoiceDataUploadPermissionVO
                                      ?.invoiceDataUploadPermissionAll
                                  }
                                />
                                <span>Invoice Data Upload</span>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.revenuePermissionVO
                                        ?.invoiceDataUploadPermissionVO
                                        ?.viewListRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "revenuePermissionVO",
                                        "invoiceDataUploadPermissionVO",
                                        "viewListRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.revenuePermissionVO
                                        ?.invoiceDataUploadPermissionVO
                                        ?.viewListRequired
                                    }
                                  />
                                  <span>View List</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.revenuePermissionVO
                                        ?.invoiceDataUploadPermissionVO
                                        ?.uploadDataRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "revenuePermissionVO",
                                        "invoiceDataUploadPermissionVO",
                                        "uploadDataRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.revenuePermissionVO
                                        ?.invoiceDataUploadPermissionVO
                                        ?.uploadDataRequired
                                    }
                                  />
                                  <span>Upload Data</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.revenuePermissionVO
                                        ?.invoiceDataUploadPermissionVO
                                        ?.editableRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "revenuePermissionVO",
                                        "invoiceDataUploadPermissionVO",
                                        "editableRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.revenuePermissionVO
                                        ?.invoiceDataUploadPermissionVO
                                        ?.editableRequired
                                    }
                                  />
                                  <span>Edit/Re-upload</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.revenuePermissionVO
                                        ?.invoiceDataUploadPermissionVO
                                        ?.deleteRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "revenuePermissionVO",
                                        "invoiceDataUploadPermissionVO",
                                        "deleteRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.revenuePermissionVO
                                        ?.invoiceDataUploadPermissionVO
                                        ?.deleteRequired
                                    }
                                  />
                                  <span>Delete</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{}}>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div style={{ marginLeft: "6px" }}>
                                <Checkbox
                                  checked={
                                    rolesData?.revenuePermissionVO
                                      ?.reviewandPublishPermissionVO
                                      ?.reviewandPublishPermissionAll
                                  }
                                  onChange={(e) => {
                                    handleRolesDataChange(
                                      e.target.checked,
                                      null,
                                      e.target.checked,
                                      "revenuePermissionVO",
                                      "reviewandPublishPermissionVO",
                                      "reviewandPublishPermissionAll"
                                    );
                                  }}
                                  value={
                                    rolesData?.revenuePermissionVO
                                      ?.reviewandPublishPermissionVO
                                      ?.reviewandPublishPermissionAll
                                  }
                                />
                                <span>Review and Publish</span>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-6px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.revenuePermissionVO
                                        ?.reviewandPublishPermissionVO
                                        ?.viewRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "revenuePermissionVO",
                                        "reviewandPublishPermissionVO",
                                        "viewRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.revenuePermissionVO
                                        ?.reviewandPublishPermissionVO
                                        ?.viewRequired
                                    }
                                  />
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.revenuePermissionVO
                                        ?.reviewandPublishPermissionVO
                                        ?.reviewAndSubmitRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "revenuePermissionVO",
                                        "reviewandPublishPermissionVO",
                                        "reviewAndSubmitRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.revenuePermissionVO
                                        ?.reviewandPublishPermissionVO
                                        ?.reviewAndSubmitRequired
                                    }
                                  />
                                  <span>Review & Submit</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.revenuePermissionVO
                                        ?.reviewandPublishPermissionVO
                                        ?.saveRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "revenuePermissionVO",
                                        "reviewandPublishPermissionVO",
                                        "saveRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.revenuePermissionVO
                                        ?.reviewandPublishPermissionVO
                                        ?.saveRequired
                                    }
                                  />
                                  <span>Save</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.revenuePermissionVO
                                        ?.reviewandPublishPermissionVO
                                        ?.copyRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "revenuePermissionVO",
                                        "reviewandPublishPermissionVO",
                                        "copyRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.revenuePermissionVO
                                        ?.reviewandPublishPermissionVO
                                        ?.copyRequired
                                    }
                                  />
                                  <span>Copy</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.revenuePermissionVO
                                        ?.reviewandPublishPermissionVO
                                        ?.editRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "revenuePermissionVO",
                                        "reviewandPublishPermissionVO",
                                        "editRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.revenuePermissionVO
                                        ?.reviewandPublishPermissionVO
                                        ?.editRequired
                                    }
                                  />
                                  <span>Edit</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.revenuePermissionVO
                                        ?.reviewandPublishPermissionVO
                                        ?.publishRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "revenuePermissionVO",
                                        "reviewandPublishPermissionVO",
                                        "publishRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.revenuePermissionVO
                                        ?.reviewandPublishPermissionVO
                                        ?.publishRequired
                                    }
                                  />
                                  <span>Publish</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div style={{ marginLeft: "-3px" }}>
                                  <Checkbox
                                    checked={
                                      rolesData?.revenuePermissionVO
                                        ?.reviewandPublishPermissionVO
                                        ?.saveRecipientsRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "revenuePermissionVO",
                                        "reviewandPublishPermissionVO",
                                        "saveRecipientsRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.revenuePermissionVO
                                        ?.reviewandPublishPermissionVO
                                        ?.saveRecipientsRequired
                                    }
                                  />
                                  <span>Save Recipients</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {value === "three" && (
                        <div
                          style={{
                            padding: "5px",
                            border: " 0.5px solid rgba(0, 0, 0, 0.65)",
                            background: "#FFFFFF",
                            width: "99%",
                            overflowY: "scroll",
                            height: "200px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.reportsPermissionVO
                                        ?.reportsPermissionsAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        e.target.checked,
                                        null,
                                        e.target.checked,
                                        "reportsPermissionVO",
                                        "reportsPermissionsAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.reportsPermissionVO
                                        ?.reportsPermissionsAll
                                    }
                                  />
                                  <span>Reports</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.reportsPermissionVO
                                        ?.viewAllEntries
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        e.target.checked,
                                        e.target.checked,
                                        "reportsPermissionVO",
                                        "viewAllEntries"
                                      );
                                    }}
                                    value={
                                      rolesData?.reportsPermissionVO
                                        ?.viewAllEntries
                                    }
                                  />
                                  <span>View All Entries</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{}}>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div style={{ marginLeft: "6px" }}>
                                  <Checkbox
                                    checked={
                                      rolesData?.reportsPermissionVO
                                        ?.businessTypeViewPermissionVO
                                        ?.businessTypeViewPermissionAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        e.target.checked,
                                        null,
                                        e.target.checked,
                                        "reportsPermissionVO",
                                        "businessTypeViewPermissionVO",
                                        "businessTypeViewPermissionAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.reportsPermissionVO
                                        ?.businessTypeViewPermissionVO
                                        ?.businessTypeViewPermissionAll
                                    }
                                  />
                                  <span>Business Type </span>
                                </div>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.reportsPermissionVO
                                        ?.businessTypeViewPermissionVO
                                        ?.reportsCommonPermissionVO?.viewAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "reportsPermissionVO",
                                        "businessTypeViewPermissionVO",
                                        "reportsCommonPermissionVO",
                                        "viewAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.reportsPermissionVO
                                        ?.businessTypeViewPermissionVO
                                        ?.reportsCommonPermissionVO?.viewAll
                                    }
                                  />
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.reportsPermissionVO
                                        ?.businessTypeViewPermissionVO
                                        ?.reportsCommonPermissionVO?.setFilter
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "reportsPermissionVO",
                                        "businessTypeViewPermissionVO",
                                        "reportsCommonPermissionVO",
                                        "setFilter"
                                      );
                                    }}
                                    value={
                                      rolesData?.reportsPermissionVO
                                        ?.businessTypeViewPermissionVO
                                        ?.reportsCommonPermissionVO?.setFilter
                                    }
                                  />
                                  <span>Set Filter</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.reportsPermissionVO
                                        ?.businessTypeViewPermissionVO
                                        ?.reportsCommonPermissionVO?.export
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "reportsPermissionVO",
                                        "businessTypeViewPermissionVO",
                                        "reportsCommonPermissionVO",
                                        "export"
                                      );
                                    }}
                                    value={
                                      rolesData?.reportsPermissionVO
                                        ?.businessTypeViewPermissionVO
                                        ?.reportsCommonPermissionVO?.export
                                    }
                                  />
                                  <span>Export</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{}}>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div style={{ marginLeft: "6px" }}>
                                <Checkbox
                                  checked={
                                    rolesData?.reportsPermissionVO
                                      ?.sbuClientViewPermissionVO
                                      ?.sbuClientViewPermissionAll
                                  }
                                  onChange={(e) => {
                                    handleRolesDataChange(
                                      e.target.checked,
                                      null,
                                      e.target.checked,
                                      "reportsPermissionVO",
                                      "sbuClientViewPermissionVO",
                                      "sbuClientViewPermissionAll"
                                    );
                                  }}
                                  value={
                                    rolesData?.reportsPermissionVO
                                      ?.sbuClientViewPermissionVO
                                      ?.sbuClientViewPermissionAll
                                  }
                                />
                                <span>SBU-Client </span>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.reportsPermissionVO
                                        ?.sbuClientViewPermissionVO
                                        ?.reportsCommonPermissionVO?.viewAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "reportsPermissionVO",
                                        "sbuClientViewPermissionVO",
                                        "reportsCommonPermissionVO",
                                        "viewAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.reportsPermissionVO
                                        ?.sbuClientViewPermissionVO
                                        ?.reportsCommonPermissionVO?.viewAll
                                    }
                                  />
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.reportsPermissionVO
                                        ?.sbuClientViewPermissionVO
                                        ?.reportsCommonPermissionVO?.setFilter
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "reportsPermissionVO",
                                        "sbuClientViewPermissionVO",
                                        "reportsCommonPermissionVO",
                                        "setFilter"
                                      );
                                    }}
                                    value={
                                      rolesData?.reportsPermissionVO
                                        ?.sbuClientViewPermissionVO
                                        ?.reportsCommonPermissionVO?.setFilter
                                    }
                                  />
                                  <span>Set Filter</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.reportsPermissionVO
                                        ?.sbuClientViewPermissionVO
                                        ?.reportsCommonPermissionVO?.export
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "reportsPermissionVO",
                                        "sbuClientViewPermissionVO",
                                        "reportsCommonPermissionVO",
                                        "export"
                                      );
                                    }}
                                    value={
                                      rolesData?.reportsPermissionVO
                                        ?.sbuClientViewPermissionVO
                                        ?.reportsCommonPermissionVO?.export
                                    }
                                  />
                                  <span>Export</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div style={{ marginLeft: "6px" }}>
                                <Checkbox
                                  checked={
                                    rolesData?.reportsPermissionVO
                                      ?.probabilityTypePermissionVO
                                      ?.probabilityTypePermissionAll
                                  }
                                  onChange={(e) => {
                                    handleRolesDataChange(
                                      e.target.checked,
                                      null,
                                      e.target.checked,
                                      "reportsPermissionVO",
                                      "probabilityTypePermissionVO",
                                      "probabilityTypePermissionAll"
                                    );
                                  }}
                                  value={
                                    rolesData?.reportsPermissionVO
                                      ?.probabilityTypePermissionVO
                                      ?.probabilityTypePermissionAll
                                  }
                                />
                                <span>Probability Type </span>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.reportsPermissionVO
                                        ?.probabilityTypePermissionVO
                                        ?.reportsCommonPermissionVO?.viewAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "reportsPermissionVO",
                                        "probabilityTypePermissionVO",
                                        "reportsCommonPermissionVO",
                                        "viewAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.reportsPermissionVO
                                        ?.probabilityTypePermissionVO
                                        ?.reportsCommonPermissionVO?.viewAll
                                    }
                                  />
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.reportsPermissionVO
                                        ?.probabilityTypePermissionVO
                                        ?.reportsCommonPermissionVO?.setFilter
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "reportsPermissionVO",
                                        "probabilityTypePermissionVO",
                                        "reportsCommonPermissionVO",
                                        "setFilter"
                                      );
                                    }}
                                    value={
                                      rolesData?.reportsPermissionVO
                                        ?.probabilityTypePermissionVO
                                        ?.reportsCommonPermissionVO?.setFilter
                                    }
                                  />
                                  <span>Set Filter</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.reportsPermissionVO
                                        ?.probabilityTypePermissionVO
                                        ?.reportsCommonPermissionVO?.export
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "reportsPermissionVO",
                                        "probabilityTypePermissionVO",
                                        "reportsCommonPermissionVO",
                                        "export"
                                      );
                                    }}
                                    value={
                                      rolesData?.reportsPermissionVO
                                        ?.probabilityTypePermissionVO
                                        ?.reportsCommonPermissionVO?.export
                                    }
                                  />
                                  <span>Export</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div style={{ marginLeft: "6px" }}>
                                <Checkbox
                                  checked={
                                    rolesData?.reportsPermissionVO
                                      ?.regionViewPermissionVO
                                      ?.regionViewPermissionAll
                                  }
                                  onChange={(e) => {
                                    handleRolesDataChange(
                                      e.target.checked,
                                      null,
                                      e.target.checked,
                                      "reportsPermissionVO",
                                      "regionViewPermissionVO",
                                      "regionViewPermissionAll"
                                    );
                                  }}
                                  value={
                                    rolesData?.reportsPermissionVO
                                      ?.regionViewPermissionVO
                                      ?.regionViewPermissionAll
                                  }
                                />
                                <span>Region-Wise </span>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.reportsPermissionVO
                                        ?.regionViewPermissionVO
                                        ?.reportsCommonPermissionVO?.viewAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "reportsPermissionVO",
                                        "regionViewPermissionVO",
                                        "reportsCommonPermissionVO",
                                        "viewAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.reportsPermissionVO
                                        ?.regionViewPermissionVO
                                        ?.reportsCommonPermissionVO?.viewAll
                                    }
                                  />
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.reportsPermissionVO
                                        ?.regionViewPermissionVO
                                        ?.reportsCommonPermissionVO?.setFilter
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "reportsPermissionVO",
                                        "regionViewPermissionVO",
                                        "reportsCommonPermissionVO",
                                        "setFilter"
                                      );
                                    }}
                                    value={
                                      rolesData?.reportsPermissionVO
                                        ?.regionViewPermissionVO
                                        ?.reportsCommonPermissionVO?.setFilter
                                    }
                                  />
                                  <span>Set Filter</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.reportsPermissionVO
                                        ?.regionViewPermissionVO
                                        ?.reportsCommonPermissionVO?.export
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "reportsPermissionVO",
                                        "regionViewPermissionVO",
                                        "reportsCommonPermissionVO",
                                        "export"
                                      );
                                    }}
                                    value={
                                      rolesData?.reportsPermissionVO
                                        ?.regionViewPermissionVO
                                        ?.reportsCommonPermissionVO?.export
                                    }
                                  />
                                  <span>Export</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div style={{ marginLeft: "6px" }}>
                                <Checkbox
                                  checked={
                                    rolesData?.reportsPermissionVO
                                      ?.buViewPermissionVO
                                      ?.businessUnitViewPermissionAll
                                  }
                                  onChange={(e) => {
                                    handleRolesDataChange(
                                      e.target.checked,
                                      null,
                                      e.target.checked,
                                      "reportsPermissionVO",
                                      "buViewPermissionVO",
                                      "businessUnitViewPermissionAll"
                                    );
                                  }}
                                  value={
                                    rolesData?.reportsPermissionVO
                                      ?.buViewPermissionVO
                                      ?.businessUnitViewPermissionAll
                                  }
                                />
                                <span>BU-Wise </span>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.reportsPermissionVO
                                        ?.buViewPermissionVO
                                        ?.reportsCommonPermissionVO?.viewAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "reportsPermissionVO",
                                        "buViewPermissionVO",
                                        "reportsCommonPermissionVO",
                                        "viewAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.reportsPermissionVO
                                        ?.buViewPermissionVO
                                        ?.reportsCommonPermissionVO?.viewAll
                                    }
                                  />
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.reportsPermissionVO
                                        ?.buViewPermissionVO
                                        ?.reportsCommonPermissionVO?.setFilter
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "reportsPermissionVO",
                                        "buViewPermissionVO",
                                        "reportsCommonPermissionVO",
                                        "setFilter"
                                      );
                                    }}
                                    value={
                                      rolesData?.reportsPermissionVO
                                        ?.buViewPermissionVO
                                        ?.reportsCommonPermissionVO?.setFilter
                                    }
                                  />
                                  <span>Set Filter</span>
                                </div>
                              </div>
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.reportsPermissionVO
                                        ?.buViewPermissionVO
                                        ?.reportsCommonPermissionVO?.export
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "reportsPermissionVO",
                                        "buViewPermissionVO",
                                        "reportsCommonPermissionVO",
                                        "export"
                                      );
                                    }}
                                    value={
                                      rolesData?.reportsPermissionVO
                                        ?.buViewPermissionVO
                                        ?.reportsCommonPermissionVO?.export
                                    }
                                  />
                                  <span>Export</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div style={{ marginLeft: "6px" }}>
                                <Checkbox
                                  checked={
                                    rolesData?.reportsPermissionVO
                                      ?.clientWisePermissionVO
                                      ?.clientWisePermissionAll
                                  }
                                  onChange={(e) => {
                                    handleRolesDataChange(
                                      e.target.checked,
                                      null,
                                      e.target.checked,
                                      "reportsPermissionVO",
                                      "clientWisePermissionVO",
                                      "clientWisePermissionAll"
                                    );
                                  }}
                                  value={
                                    rolesData?.reportsPermissionVO
                                      ?.clientWisePermissionVO
                                      ?.clientWisePermissionAll
                                  }
                                />
                                <span>Client-Wise </span>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.reportsPermissionVO
                                        ?.clientWisePermissionVO
                                        ?.reportsCommonPermissionVO?.viewAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "reportsPermissionVO",
                                        "clientWisePermissionVO",
                                        "reportsCommonPermissionVO",
                                        "viewAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.reportsPermissionVO
                                        ?.clientWisePermissionVO
                                        ?.reportsCommonPermissionVO?.viewAll
                                    }
                                  />
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.reportsPermissionVO
                                        ?.clientWisePermissionVO
                                        ?.reportsCommonPermissionVO?.setFilter
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "reportsPermissionVO",
                                        "clientWisePermissionVO",
                                        "reportsCommonPermissionVO",
                                        "setFilter"
                                      );
                                    }}
                                    value={
                                      rolesData?.reportsPermissionVO
                                        ?.clientWisePermissionVO
                                        ?.reportsCommonPermissionVO?.setFilter
                                    }
                                  />
                                  <span>Set Filter</span>
                                </div>
                              </div>
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.reportsPermissionVO
                                        ?.clientWisePermissionVO
                                        ?.reportsCommonPermissionVO?.export
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "reportsPermissionVO",
                                        "clientWisePermissionVO",
                                        "reportsCommonPermissionVO",
                                        "export"
                                      );
                                    }}
                                    value={
                                      rolesData?.reportsPermissionVO
                                        ?.clientWisePermissionVO
                                        ?.reportsCommonPermissionVO?.export
                                    }
                                  />
                                  <span>Export</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div style={{ marginLeft: "6px" }}>
                                <Checkbox
                                  checked={
                                    rolesData?.reportsPermissionVO
                                      ?.archiveWisePermissionVO
                                      ?.archiveWisePermissionAll
                                  }
                                  onChange={(e) => {
                                    handleRolesDataChange(
                                      e.target.checked,
                                      null,
                                      e.target.checked,
                                      "reportsPermissionVO",
                                      "archiveWisePermissionVO",
                                      "archiveWisePermissionAll"
                                    );
                                  }}
                                  value={
                                    rolesData?.reportsPermissionVO
                                      ?.archiveWisePermissionVO
                                      ?.archiveWisePermissionAll
                                  }
                                />
                                <span>Archieve</span>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.reportsPermissionVO
                                        ?.archiveWisePermissionVO
                                        ?.reportsCommonPermissionVO?.viewAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "reportsPermissionVO",
                                        "archiveWisePermissionVO",
                                        "reportsCommonPermissionVO",
                                        "viewAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.reportsPermissionVO
                                        ?.clientWisePermissionVO
                                        ?.archiveWisePermissionVO?.viewAll
                                    }
                                  />
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.reportsPermissionVO
                                        ?.archiveWisePermissionVO
                                        ?.reportsCommonPermissionVO?.setFilter
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "reportsPermissionVO",
                                        "archiveWisePermissionVO",
                                        "reportsCommonPermissionVO",
                                        "setFilter"
                                      );
                                    }}
                                    value={
                                      rolesData?.reportsPermissionVO
                                        ?.archiveWisePermissionVO
                                        ?.reportsCommonPermissionVO?.setFilter
                                    }
                                  />
                                  <span>Set Filter</span>
                                </div>
                              </div>
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.reportsPermissionVO
                                        ?.archiveWisePermissionVO
                                        ?.reportsCommonPermissionVO?.export
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "reportsPermissionVO",
                                        "archiveWisePermissionVO",
                                        "reportsCommonPermissionVO",
                                        "export"
                                      );
                                    }}
                                    value={
                                      rolesData?.reportsPermissionVO
                                        ?.archiveWisePermissionVO
                                        ?.reportsCommonPermissionVO?.export
                                    }
                                  />
                                  <span>Export</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {value === "four" && (
                        <div
                          style={{
                            padding: "5px",
                            border: " 0.5px solid rgba(0, 0, 0, 0.65)",
                            background: "#FFFFFF",
                            width: "99%",
                            overflowY: "scroll",
                            height: "200px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.settingsPermissionVO
                                        ?.settingsPermissionAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        e.target.checked,
                                        null,
                                        e.target.checked,
                                        "settingsPermissionVO",
                                        "settingsPermissionAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.settingsPermissionVO
                                        ?.settingsPermissionAll
                                    }
                                  />
                                  <span>Settings</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.settingsPermissionVO?.viewAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        e.target.checked,
                                        e.target.checked,
                                        "settingsPermissionVO",
                                        "viewAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.settingsPermissionVO?.viewAll
                                    }
                                  />
                                  <span>View All Entries</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{}}>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div style={{ marginLeft: "6px" }}>
                                  <Checkbox
                                    checked={
                                      rolesData?.settingsPermissionVO
                                        ?.rolesPermissionVO?.rolesPermissionAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        e.target.checked,
                                        null,
                                        e.target.checked,
                                        "settingsPermissionVO",
                                        "rolesPermissionVO",
                                        "rolesPermissionAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.settingsPermissionVO
                                        ?.rolesPermissionVO?.rolesPermissionAll
                                    }
                                  />
                                  <span>Roles</span>
                                </div>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.settingsPermissionVO
                                        ?.rolesPermissionVO?.deleteRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "settingsPermissionVO",
                                        "rolesPermissionVO",
                                        "deleteRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.settingsPermissionVO
                                        ?.rolesPermissionVO?.deleteRequired
                                    }
                                  />
                                  <span>Delete</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.settingsPermissionVO
                                        ?.rolesPermissionVO?.createRoleRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "settingsPermissionVO",
                                        "rolesPermissionVO",
                                        "createRoleRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.settingsPermissionVO
                                        ?.rolesPermissionVO?.createRoleRequired
                                    }
                                  />
                                  <span>Create Role</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.settingsPermissionVO
                                        ?.rolesPermissionVO?.editRoleRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "settingsPermissionVO",
                                        "rolesPermissionVO",
                                        "editRoleRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.settingsPermissionVO
                                        ?.rolesPermissionVO?.editRoleRequired
                                    }
                                  />
                                  <span>Edit Role</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{}}>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div style={{ marginLeft: "6px" }}>
                                <Checkbox
                                  checked={
                                    rolesData?.settingsPermissionVO
                                      ?.roleUserAssignmentPermissionVO
                                      ?.roleUserAssignmentPermissionAll
                                  }
                                  onChange={(e) => {
                                    handleRolesDataChange(
                                      e.target.checked,
                                      null,
                                      e.target.checked,
                                      "settingsPermissionVO",
                                      "roleUserAssignmentPermissionVO",
                                      "roleUserAssignmentPermissionAll"
                                    );
                                  }}
                                  value={
                                    rolesData?.settingsPermissionVO
                                      ?.roleUserAssignmentPermissionVO
                                      ?.roleUserAssignmentPermissionAll
                                  }
                                />
                                <span>Role User Permission</span>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.settingsPermissionVO
                                        ?.roleUserAssignmentPermissionVO
                                        ?.viewRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "settingsPermissionVO",
                                        "roleUserAssignmentPermissionVO",
                                        "viewRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.settingsPermissionVO
                                        ?.rolesPermissionVO?.viewRequired
                                    }
                                  />
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.settingsPermissionVO
                                        ?.roleUserAssignmentPermissionVO
                                        ?.createOrUploadRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "settingsPermissionVO",
                                        "roleUserAssignmentPermissionVO",
                                        "createOrUploadRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.settingsPermissionVO
                                        ?.rolesPermissionVO
                                        ?.createOrUploadRequired
                                    }
                                  />
                                  <span>Add</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.settingsPermissionVO
                                        ?.roleUserAssignmentPermissionVO
                                        ?.editOrReUploadRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "settingsPermissionVO",
                                        "roleUserAssignmentPermissionVO",
                                        "editOrReUploadRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.settingsPermissionVO
                                        ?.rolesPermissionVO
                                        ?.editOrReUploadRequired
                                    }
                                  />
                                  <span>Edit</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.settingsPermissionVO
                                        ?.roleUserAssignmentPermissionVO
                                        ?.deleteRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "settingsPermissionVO",
                                        "roleUserAssignmentPermissionVO",
                                        "deleteRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.settingsPermissionVO
                                        ?.rolesPermissionVO?.deleteRequired
                                    }
                                  />
                                  <span>Delete</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div style={{ marginLeft: "6px" }}>
                                <Checkbox
                                  checked={
                                    rolesData?.settingsPermissionVO
                                      ?.explicitPermissionVO
                                      ?.explicitPermissionAll
                                  }
                                  onChange={(e) => {
                                    handleRolesDataChange(
                                      e.target.checked,
                                      null,
                                      e.target.checked,
                                      "settingsPermissionVO",
                                      "explicitPermissionVO",
                                      "explicitPermissionAll"
                                    );
                                  }}
                                  value={
                                    rolesData?.settingsPermissionVO
                                      ?.explicitPermissionVO
                                      ?.explicitPermissionAll
                                  }
                                />
                                <span>Explicit Permission</span>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.settingsPermissionVO
                                        ?.explicitPermissionVO?.viewRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "settingsPermissionVO",
                                        "explicitPermissionVO",
                                        "viewRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.settingsPermissionVO
                                        ?.explicitPermissionVO?.viewRequired
                                    }
                                  />
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.settingsPermissionVO
                                        ?.explicitPermissionVO?.createRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "settingsPermissionVO",
                                        "explicitPermissionVO",
                                        "createRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.settingsPermissionVO
                                        ?.explicitPermissionVO?.createRequired
                                    }
                                  />
                                  <span>Add</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.settingsPermissionVO
                                        ?.explicitPermissionVO?.editRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "settingsPermissionVO",
                                        "explicitPermissionVO",
                                        "editRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.settingsPermissionVO
                                        ?.explicitPermissionVO?.editRequired
                                    }
                                  />
                                  <span>Edit</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.settingsPermissionVO
                                        ?.explicitPermissionVO?.deleteRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "settingsPermissionVO",
                                        "explicitPermissionVO",
                                        "deleteRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.settingsPermissionVO
                                        ?.explicitPermissionVO?.deleteRequired
                                    }
                                  />
                                  <span>Delete</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div style={{ marginLeft: "6px" }}>
                                <Checkbox
                                  checked={
                                    rolesData?.settingsPermissionVO
                                      ?.annualTargetEntryPermissionVO
                                      ?.annualTargetEntryPermissionAll
                                  }
                                  onChange={(e) => {
                                    handleRolesDataChange(
                                      e.target.checked,
                                      null,
                                      e.target.checked,
                                      "settingsPermissionVO",
                                      "annualTargetEntryPermissionVO",
                                      "annualTargetEntryPermissionAll"
                                    );
                                  }}
                                  value={
                                    rolesData?.settingsPermissionVO
                                      ?.annualTargetEntryPermissionVO
                                      ?.annualTargetEntryPermissionAll
                                  }
                                />
                                <span>Annual Target Entry</span>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.settingsPermissionVO
                                        ?.annualTargetEntryPermissionVO
                                        ?.viewRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "settingsPermissionVO",
                                        "annualTargetEntryPermissionVO",
                                        "viewRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.settingsPermissionVO
                                        ?.annualTargetEntryPermissionVO
                                        ?.viewRequired
                                    }
                                  />
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.settingsPermissionVO
                                        ?.annualTargetEntryPermissionVO
                                        ?.createRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "settingsPermissionVO",
                                        "annualTargetEntryPermissionVO",
                                        "createRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.settingsPermissionVO
                                        ?.annualTargetEntryPermissionVO
                                        ?.createRequired
                                    }
                                  />
                                  <span>Add/Upload</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.settingsPermissionVO
                                        ?.annualTargetEntryPermissionVO
                                        ?.editRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "settingsPermissionVO",
                                        "annualTargetEntryPermissionVO",
                                        "editRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.settingsPermissionVO
                                        ?.annualTargetEntryPermissionVO
                                        ?.editRequired
                                    }
                                  />{" "}
                                  <span>Reupload/Edit</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.settingsPermissionVO
                                        ?.annualTargetEntryPermissionVO
                                        ?.deleteRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "settingsPermissionVO",
                                        "annualTargetEntryPermissionVO",
                                        "deleteRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.settingsPermissionVO
                                        ?.annualTargetEntryPermissionVO
                                        ?.deleteRequired
                                    }
                                  />{" "}
                                  <span>Delete</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {value === "five" && (
                        <div
                          style={{
                            padding: "5px",
                            border: " 0.5px solid rgba(0, 0, 0, 0.65)",
                            background: "#FFFFFF",
                            width: "99%",
                            overflowY: "scroll",
                            height: "200px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.calendarPermissionVO
                                        ?.calendarPermissionAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        e.target.checked,
                                        null,
                                        e.target.checked,
                                        "calendarPermissionVO",
                                        "calendarPermissionAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.calendarPermissionVO
                                        ?.calendarPermissionAll
                                    }
                                  />
                                  <span>Calendar</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.calendarPermissionVO
                                        ?.viewAllCalendarPermission
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        e.target.checked,
                                        e.target.checked,
                                        "calendarPermissionVO",
                                        "viewAllCalendarPermission"
                                      );
                                    }}
                                    value={
                                      rolesData?.calendarPermissionVO
                                        ?.viewAllCalendarPermission
                                    }
                                  />
                                  <span>View All Entries</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{}}>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div style={{ marginLeft: "6px" }}>
                                  <Checkbox
                                    checked={
                                      rolesData?.calendarPermissionVO
                                        ?.holidayCalendarPermissionVO
                                        ?.holidayCalendarPermissionAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        e.target.checked,
                                        null,
                                        e.target.checked,
                                        "calendarPermissionVO",
                                        "holidayCalendarPermissionVO",
                                        "holidayCalendarPermissionAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.calendarPermissionVO
                                        ?.holidayCalendarPermissionVO
                                        ?.holidayCalendarPermissionAll
                                    }
                                  />
                                  <span>Holiday Calendar</span>
                                </div>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.calendarPermissionVO
                                        ?.holidayCalendarPermissionVO
                                        ?.commonCalendarPermissionVO
                                        ?.viewRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "calendarPermissionVO",
                                        "holidayCalendarPermissionVO",
                                        "commonCalendarPermissionVO",
                                        "viewRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.calendarPermissionVO
                                        ?.holidayCalendarPermissionVO
                                        ?.commonCalendarPermissionVO
                                        ?.viewRequired
                                    }
                                  />
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.calendarPermissionVO
                                        ?.holidayCalendarPermissionVO
                                        ?.commonCalendarPermissionVO
                                        ?.addRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "calendarPermissionVO",
                                        "holidayCalendarPermissionVO",
                                        "commonCalendarPermissionVO",
                                        "addRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.calendarPermissionVO
                                        ?.holidayCalendarPermissionVO
                                        ?.commonCalendarPermissionVO
                                        ?.addRequired
                                    }
                                  />
                                  <span>Add</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.calendarPermissionVO
                                        ?.holidayCalendarPermissionVO
                                        ?.commonCalendarPermissionVO
                                        ?.editRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "calendarPermissionVO",
                                        "holidayCalendarPermissionVO",
                                        "commonCalendarPermissionVO",
                                        "editRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.calendarPermissionVO
                                        ?.holidayCalendarPermissionVO
                                        ?.commonCalendarPermissionVO
                                        ?.editRequired
                                    }
                                  />
                                  <span>Edit</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.calendarPermissionVO
                                        ?.holidayCalendarPermissionVO
                                        ?.commonCalendarPermissionVO
                                        ?.deleteRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "calendarPermissionVO",
                                        "holidayCalendarPermissionVO",
                                        "commonCalendarPermissionVO",
                                        "deleteRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.calendarPermissionVO
                                        ?.holidayCalendarPermissionVO
                                        ?.commonCalendarPermissionVO
                                        ?.deleteRequired
                                    }
                                  />
                                  <span>Delete</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{}}>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div style={{ marginLeft: "6px" }}>
                                  <Checkbox
                                    checked={
                                      rolesData?.calendarPermissionVO
                                        ?.fortnightlyMeetingPermissionVO
                                        ?.fortnightlyMeetingPermissionAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        e.target.checked,
                                        null,
                                        e.target.checked,
                                        "calendarPermissionVO",
                                        "fortnightlyMeetingPermissionVO",
                                        "fortnightlyMeetingPermissionAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.calendarPermissionVO
                                        ?.fortnightlyMeetingPermissionVO
                                        ?.fortnightlyMeetingPermissionAll
                                    }
                                  />
                                  <span>Fortnightly Meetings</span>
                                </div>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.calendarPermissionVO
                                        ?.fortnightlyMeetingPermissionVO
                                        ?.commonCalendarPermissionVO
                                        ?.viewRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "calendarPermissionVO",
                                        "fortnightlyMeetingPermissionVO",
                                        "commonCalendarPermissionVO",
                                        "viewRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.calendarPermissionVO
                                        ?.fortnightlyMeetingPermissionVO
                                        ?.commonCalendarPermissionVO
                                        ?.viewRequired
                                    }
                                  />
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.calendarPermissionVO
                                        ?.fortnightlyMeetingPermissionVO
                                        ?.commonCalendarPermissionVO
                                        ?.addRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "calendarPermissionVO",
                                        "fortnightlyMeetingPermissionVO",
                                        "commonCalendarPermissionVO",
                                        "addRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.calendarPermissionVO
                                        ?.fortnightlyMeetingPermissionVO
                                        ?.commonCalendarPermissionVO
                                        ?.addRequired
                                    }
                                  />
                                  <span>Add</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.calendarPermissionVO
                                        ?.fortnightlyMeetingPermissionVO
                                        ?.commonCalendarPermissionVO
                                        ?.editRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "calendarPermissionVO",
                                        "fortnightlyMeetingPermissionVO",
                                        "commonCalendarPermissionVO",
                                        "editRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.calendarPermissionVO
                                        ?.fortnightlyMeetingPermissionVO
                                        ?.commonCalendarPermissionVO
                                        ?.editRequired
                                    }
                                  />
                                  <span>Edit</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.calendarPermissionVO
                                        ?.fortnightlyMeetingPermissionVO
                                        ?.commonCalendarPermissionVO
                                        ?.deleteRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "calendarPermissionVO",
                                        "fortnightlyMeetingPermissionVO",
                                        "commonCalendarPermissionVO",
                                        "deleteRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.calendarPermissionVO
                                        ?.fortnightlyMeetingPermissionVO
                                        ?.commonCalendarPermissionVO
                                        ?.deleteRequired
                                    }
                                  />
                                  <span>Delete</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{}}>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div style={{ marginLeft: "6px" }}>
                                  <Checkbox
                                    checked={
                                      rolesData?.calendarPermissionVO
                                        ?.bdmMeetingPermissionVO
                                        ?.bdmMeetingPermissionAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        e.target.checked,
                                        null,
                                        e.target.checked,
                                        "calendarPermissionVO",
                                        "bdmMeetingPermissionVO",
                                        "bdmMeetingPermissionAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.calendarPermissionVO
                                        ?.bdmMeetingPermissionVO
                                        ?.bdmMeetingPermissionAll
                                    }
                                  />
                                  <span>BDM Meetings</span>
                                </div>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.calendarPermissionVO
                                        ?.bdmMeetingPermissionVO
                                        ?.commonCalendarPermissionVO
                                        ?.viewRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "calendarPermissionVO",
                                        "bdmMeetingPermissionVO",
                                        "commonCalendarPermissionVO",
                                        "viewRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.calendarPermissionVO
                                        ?.bdmMeetingPermissionVO
                                        ?.commonCalendarPermissionVO
                                        ?.viewRequired
                                    }
                                  />{" "}
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.calendarPermissionVO
                                        ?.bdmMeetingPermissionVO
                                        ?.commonCalendarPermissionVO
                                        ?.addRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "calendarPermissionVO",
                                        "bdmMeetingPermissionVO",
                                        "commonCalendarPermissionVO",
                                        "addRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.calendarPermissionVO
                                        ?.bdmMeetingPermissionVO
                                        ?.commonCalendarPermissionVO
                                        ?.addRequired
                                    }
                                  />{" "}
                                  <span>Add</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.calendarPermissionVO
                                        ?.bdmMeetingPermissionVO
                                        ?.commonCalendarPermissionVO
                                        ?.editRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "calendarPermissionVO",
                                        "bdmMeetingPermissionVO",
                                        "commonCalendarPermissionVO",
                                        "editRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.calendarPermissionVO
                                        ?.bdmMeetingPermissionVO
                                        ?.commonCalendarPermissionVO
                                        ?.editRequired
                                    }
                                  />{" "}
                                  <span>Edit</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.calendarPermissionVO
                                        ?.bdmMeetingPermissionVO
                                        ?.commonCalendarPermissionVO
                                        ?.deleteRequired
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "calendarPermissionVO",
                                        "bdmMeetingPermissionVO",
                                        "commonCalendarPermissionVO",
                                        "deleteRequired"
                                      );
                                    }}
                                    value={
                                      rolesData?.calendarPermissionVO
                                        ?.bdmMeetingPermissionVO
                                        ?.commonCalendarPermissionVO
                                        ?.deleteRequired
                                    }
                                  />{" "}
                                  <span>Delete</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {value === "six" && (
                        <div
                          style={{
                            padding: "5px",
                            border: " 0.5px solid rgba(0, 0, 0, 0.65)",
                            background: "#FFFFFF",
                            width: "99%",
                            overflowY: "scroll",
                            height: "200px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.administrationPermissionAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        e.target.checked,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "administrationPermissionAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.administrationPermissionAll
                                    }
                                  />
                                  <span>Administration</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.viewAllAdministrationPermission
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        e.target.checked,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "viewAllAdministrationPermission"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.viewAllAdministrationPermission
                                    }
                                  />
                                  <span>View All Entries</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{}}>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div style={{ marginLeft: "6px" }}>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.accountPermissionVO
                                        ?.accountPermissionAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        e.target.checked,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "accountPermissionVO",
                                        "accountPermissionAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.accountPermissionVO
                                        ?.accountPermissionAll
                                    }
                                  />
                                  <span>Account</span>
                                </div>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.accountPermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "accountPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "view"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.accountPermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                  />
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.accountPermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "accountPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "add"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.accountPermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                  />
                                  <span>Add</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.accountPermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "accountPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "edit"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.accountPermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                  />
                                  <span>Edit</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.accountPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "accountPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "activeOrDeactive"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.accountPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                  />
                                  <span>Activate/Deactivate</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.accountPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "accountPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "delete"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.accountPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                  />
                                  <span>Delete</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{}}>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div style={{ marginLeft: "6px" }}>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.opportunityPermissionVO
                                        ?.opportunityPermissionAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        e.target.checked,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "opportunityPermissionVO",
                                        "opportunityPermissionAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.opportunityPermissionVO
                                        ?.opportunityPermissionAll
                                    }
                                  />
                                  <span>Opportunity</span>
                                </div>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.opportunityPermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "opportunityPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "view"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.opportunityPermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                  />
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.opportunityPermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "opportunityPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "add"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.opportunityPermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                  />{" "}
                                  <span>Add</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.opportunityPermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "opportunityPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "edit"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.opportunityPermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                  />{" "}
                                  <span>Edit</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.opportunityPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "opportunityPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "activeOrDeactive"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.opportunityPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                  />{" "}
                                  <span>Activate/Deactivate</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.opportunityPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "opportunityPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "delete"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.opportunityPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                  />{" "}
                                  <span>Delete</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{}}>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div style={{ marginLeft: "6px" }}>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.businessUnitPermissionVO
                                        ?.businessUnitPermissionAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        e.target.checked,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "businessUnitPermissionVO",
                                        "businessUnitPermissionAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.businessUnitPermissionVO
                                        ?.businessUnitPermissionAll
                                    }
                                  />
                                  <span>BU</span>
                                </div>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.businessUnitPermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "businessUnitPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "view"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.businessUnitPermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                  />
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.businessUnitPermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "businessUnitPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "add"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.businessUnitPermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                  />
                                  <span>Add</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.businessUnitPermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "businessUnitPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "edit"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.opportunityPermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                  />
                                  <span>Edit</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.businessUnitPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "businessUnitPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "activeOrDeactive"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.businessUnitPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                  />
                                  <span>Activate/Deactivate</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.businessUnitPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "businessUnitPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "delete"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.opportunityPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                  />
                                  <span>Delete</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{}}>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div style={{ marginLeft: "6px" }}>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.regionPermissionVO
                                        ?.regionPermissionAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        e.target.checked,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "regionPermissionVO",
                                        "regionPermissionAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.regionPermissionVO
                                        ?.regionPermissionAll
                                    }
                                  />
                                  <span>Region</span>
                                </div>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.regionPermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "regionPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "view"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.regionPermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                  />
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.regionPermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "regionPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "add"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.regionPermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                  />
                                  <span>Add</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.regionPermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "regionPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "edit"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.regionPermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                  />
                                  <span>Edit</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.regionPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "regionPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "activeOrDeactive"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.regionPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                  />
                                  <span>Activate/Deactivate</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.regionPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "regionPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "delete"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.regionPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                  />
                                  <span>Delete</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{}}>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div style={{ marginLeft: "6px" }}>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.sbuPermissionVO?.sbuPermissionAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        e.target.checked,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "sbuPermissionVO",
                                        "sbuPermissionAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.sbuPermissionVO?.sbuPermissionAll
                                    }
                                  />
                                  <span>SBU</span>
                                </div>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.sbuPermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "sbuPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "view"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.sbuPermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                  />
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.sbuPermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "sbuPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "add"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.sbuPermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                  />{" "}
                                  <span>Add</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.sbuPermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "sbuPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "edit"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.sbuPermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                  />
                                  <span>Edit</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.sbuPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "sbuPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "activeOrDeactive"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.sbuPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                  />
                                  <span>Activate/Deactivate</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.sbuPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "sbuPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "delete"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.sbuPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                  />
                                  <span>Delete</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{}}>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div style={{ marginLeft: "6px" }}>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.sbuHeadPermissionVO
                                        ?.sbuHeadPermissionAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        e.target.checked,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "sbuHeadPermissionVO",
                                        "sbuHeadPermissionAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.sbuHeadPermissionVO
                                        ?.sbuHeadPermissionAll
                                    }
                                  />
                                  <span>SBU Head</span>
                                </div>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.sbuHeadPermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "sbuHeadPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "view"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.sbuHeadPermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                  />
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.sbuHeadPermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "sbuHeadPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "add"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.sbuHeadPermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                  />{" "}
                                  <span>Add</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.sbuHeadPermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "sbuHeadPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "edit"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.sbuHeadPermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                  />{" "}
                                  <span>Edit</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.sbuHeadPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "sbuHeadPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "activeOrDeactive"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.sbuHeadPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                  />{" "}
                                  <span>Activate/Deactivate</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.sbuHeadPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "sbuHeadPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "delete"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.sbuHeadPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                  />{" "}
                                  <span>Delete</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{}}>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div style={{ marginLeft: "6px" }}>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.locationPermissionVO
                                        ?.locationPermissionAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        e.target.checked,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "locationPermissionVO",
                                        "locationPermissionAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.locationPermissionVO
                                        ?.locationPermissionAll
                                    }
                                  />
                                  <span>Location</span>
                                </div>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.locationPermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "locationPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "view"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.locationPermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                  />{" "}
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.locationPermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "locationPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "add"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.locationPermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                  />
                                  <span>Add</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.locationPermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "locationPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "edit"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.locationPermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                  />
                                  <span>Edit</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.locationPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "locationPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "activeOrDeactive"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.locationPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                  />
                                  <span>Activate/Deactivate</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.locationPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "locationPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "delete"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.locationPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                  />
                                  <span>Delete</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{}}>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div style={{ marginLeft: "6px" }}>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.bdmPermissionVO?.bdmPermissionAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        e.target.checked,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "bdmPermissionVO",
                                        "bdmPermissionAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.bdmPermissionVO?.bdmPermissionAll
                                    }
                                  />
                                  <span>BDM</span>
                                </div>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.bdmPermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "bdmPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "view"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.bdmPermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                  />
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.bdmPermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "bdmPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "add"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.bdmPermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                  />
                                  <span>Add</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.bdmPermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "bdmPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "edit"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.bdmPermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                  />
                                  <span>Edit</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.bdmPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "bdmPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "activeOrDeactive"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.bdmPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                  />
                                  <span>Activate/Deactivate</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.bdmPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "bdmPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "delete"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.bdmPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                  />
                                  <span>Delete</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{}}>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div style={{ marginLeft: "6px" }}>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.probabilityPermissionVO
                                        ?.probabilityPermissionAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        e.target.checked,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "probabilityPermissionVO",
                                        "probabilityPermissionAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.probabilityPermissionVO
                                        ?.probabilityPermissionAll
                                    }
                                  />
                                  <span>Probability Type</span>
                                </div>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.probabilityPermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "probabilityPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "view"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.probabilityPermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                  />
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.probabilityPermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "probabilityPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "add"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.probabilityPermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                  />
                                  <span>Add</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.probabilityPermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "probabilityPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "edit"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.probabilityPermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                  />
                                  <span>Edit</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.probabilityPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "probabilityPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "activeOrDeactive"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.probabilityPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                  />
                                  <span>Activate/Deactivate</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.probabilityPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "probabilityPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "delete"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.probabilityPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                  />
                                  <span>Delete</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{}}>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div style={{ marginLeft: "6px" }}>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.businessTypePermissionVO
                                        ?.businessTypePermissionAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        e.target.checked,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "businessTypePermissionVO",
                                        "businessTypePermissionAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.businessTypePermissionVO
                                        ?.businessTypePermissionAll
                                    }
                                  />
                                  <span>Business Type</span>
                                </div>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.businessTypePermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "businessTypePermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "view"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.businessTypePermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                  />
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.businessTypePermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "businessTypePermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "add"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.businessTypePermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                  />
                                  <span>Add</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.businessTypePermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "businessTypePermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "edit"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.businessTypePermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                  />
                                  <span>Edit</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.businessTypePermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "businessTypePermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "activeOrDeactive"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.businessTypePermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                  />
                                  <span>Activate/Deactivate</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.businessTypePermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "businessTypePermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "delete"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.businessTypePermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                  />
                                  <span>Delete</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{}}>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div style={{ marginLeft: "6px" }}>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.cocPracticePermissionVO
                                        ?.cocPracticePermissionAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        e.target.checked,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "cocPracticePermissionVO",
                                        "cocPracticePermissionAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.cocPracticePermissionVO
                                        ?.cocPracticePermissionAll
                                    }
                                  />
                                  <span>COC Practice</span>
                                </div>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.cocPracticePermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "cocPracticePermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "view"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.cocPracticePermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                  />
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.cocPracticePermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "cocPracticePermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "add"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.cocPracticePermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                  />
                                  <span>Add</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.cocPracticePermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "cocPracticePermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "edit"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.cocPracticePermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                  />
                                  <span>Edit</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.cocPracticePermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "cocPracticePermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "activeOrDeactive"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.cocPracticePermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                  />
                                  <span>Activate/Deactivate</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.cocPracticePermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "cocPracticePermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "delete"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.cocPracticePermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                  />
                                  <span>Delete</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{}}>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div style={{ marginLeft: "6px" }}>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.pricingTypePermissionVO
                                        ?.pricingTypePermissionAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        e.target.checked,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "pricingTypePermissionVO",
                                        "pricingTypePermissionAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.pricingTypePermissionVO
                                        ?.pricingTypePermissionAll
                                    }
                                  />
                                  <span>Pricing Type</span>
                                </div>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.pricingTypePermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "pricingTypePermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "view"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.pricingTypePermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                  />
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.pricingTypePermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "pricingTypePermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "add"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.pricingTypePermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                  />{" "}
                                  <span>Add</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.pricingTypePermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "pricingTypePermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "edit"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.pricingTypePermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                  />{" "}
                                  <span>Edit</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.pricingTypePermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "pricingTypePermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "activeOrDeactive"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.pricingTypePermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                  />{" "}
                                  <span>Activate/Deactivate</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.pricingTypePermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "pricingTypePermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "delete"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.pricingTypePermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                  />{" "}
                                  <span>Delete</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{}}>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div style={{ marginLeft: "6px" }}>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.workOrderPermissionVO
                                        ?.workOrderPermissionAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        e.target.checked,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "workOrderPermissionVO",
                                        "workOrderPermissionAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.workOrderPermissionVO
                                        ?.workOrderPermissionAll
                                    }
                                  />
                                  <span>Work Order</span>
                                </div>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.workOrderPermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "workOrderPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "view"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.workOrderPermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                  />
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.workOrderPermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "workOrderPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "add"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.workOrderPermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                  />
                                  <span>Add</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.workOrderPermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "workOrderPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "edit"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.workOrderPermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                  />
                                  <span>Edit</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.workOrderPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "workOrderPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "activeOrDeactive"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.workOrderPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                  />
                                  <span>Activate/Deactivate</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.workOrderPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "workOrderPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "delete"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.workOrderPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                  />
                                  <span>Delete</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{}}>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div style={{ marginLeft: "6px" }}>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.financialYearPermissionVO
                                        ?.financialYearPermissionAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        e.target.checked,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "financialYearPermissionVO",
                                        "financialYearPermissionAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.financialYearPermissionVO
                                        ?.financialYearPermissionAll
                                    }
                                  />
                                  <span>Financial Year</span>
                                </div>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.financialYearPermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "financialYearPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "view"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.financialYearPermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                  />
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.financialYearPermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "financialYearPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "add"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.financialYearPermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                  />
                                  <span>Add</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.financialYearPermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "financialYearPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "edit"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.financialYearPermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                  />
                                  <span>Edit</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.financialYearPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "financialYearPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "activeOrDeactive"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.financialYearPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                  />
                                  <span>Activate/Deactivate</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.financialYearPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "financialYearPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "delete"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.financialYearPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                  />
                                  <span>Delete</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{}}>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div style={{ marginLeft: "6px" }}>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.currencyPermissionVO
                                        ?.currencyPermissionAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        e.target.checked,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "currencyPermissionVO",
                                        "currencyPermissionAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.currencyPermissionVO
                                        ?.currencyPermissionAll
                                    }
                                  />
                                  <span>Currency</span>
                                </div>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.currencyPermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "currencyPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "view"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.currencyPermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                  />
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.currencyPermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "currencyPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "add"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.currencyPermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                  />{" "}
                                  <span>Add</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.currencyPermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "currencyPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "edit"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.currencyPermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                  />{" "}
                                  <span>Edit</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.currencyPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "currencyPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "activeOrDeactive"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.currencyPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                  />{" "}
                                  <span>Activate/Deactivate</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.currencyPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "currencyPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "delete"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.currencyPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                  />{" "}
                                  <span>Delete</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{}}>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div style={{ marginLeft: "6px" }}>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.notificationConfigPermissionVO
                                        ?.notificationConfigPermissionAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        e.target.checked,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "notificationConfigPermissionVO",
                                        "notificationConfigPermissionAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.notificationConfigPermissionVO
                                        ?.notificationConfigPermissionAll
                                    }
                                  />
                                  <span>Notification Config</span>
                                </div>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.notificationConfigPermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "notificationConfigPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "view"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.notificationConfigPermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                  />
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.notificationConfigPermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "notificationConfigPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "add"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.notificationConfigPermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                  />{" "}
                                  <span>Add</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.notificationConfigPermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "notificationConfigPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "edit"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.notificationConfigPermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                  />{" "}
                                  <span>Edit</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.notificationConfigPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "notificationConfigPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "activeOrDeactive"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.notificationConfigPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                  />{" "}
                                  <span>Activate/Deactivate</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.notificationConfigPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "notificationConfigPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "delete"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.notificationConfigPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                  />{" "}
                                  <span>Delete</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{}}>
                            <Box
                              sx={{
                                display: "-webkit-box",
                                background: "#EBEBEB",
                                marginLeft: "-5px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div style={{ marginLeft: "6px" }}>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.globalLeaveLassFactorPermissionVO
                                        ?.globalLeaveLassFactorPermissionAll
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        e.target.checked,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "globalLeaveLassFactorPermissionVO",
                                        "globalLeaveLassFactorPermissionAll"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.globalLeaveLassFactorPermissionVO
                                        ?.globalLeaveLassFactorPermissionAll
                                    }
                                  />
                                  <span>Global Leave Loss Factor</span>
                                </div>
                              </div>
                            </Box>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                              }}
                            >
                              <div
                                style={{ display: "flex", flexBasis: "25%" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.globalLeaveLassFactorPermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "globalLeaveLassFactorPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "view"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.globalLeaveLassFactorPermissionVO
                                        ?.commonAdministrationPermissionVO?.view
                                    }
                                  />
                                  <span>View</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.globalLeaveLassFactorPermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "globalLeaveLassFactorPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "add"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.globalLeaveLassFactorPermissionVO
                                        ?.commonAdministrationPermissionVO?.add
                                    }
                                  />
                                  <span>Add</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.globalLeaveLassFactorPermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "globalLeaveLassFactorPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "edit"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.globalLeaveLassFactorPermissionVO
                                        ?.commonAdministrationPermissionVO?.edit
                                    }
                                  />
                                  <span>Edit</span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexBasis: "100%",
                                gap: "125px",
                                marginTop: "-12px",
                              }}
                            >
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.globalLeaveLassFactorPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "globalLeaveLassFactorPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "activeOrDeactive"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.globalLeaveLassFactorPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.activeOrDeactive
                                    }
                                  />
                                  <span>Activate/Deactivate</span>
                                </div>
                              </div>
                              <div
                                style={{ flexBasis: "25%", display: "flex" }}
                              >
                                <div>
                                  <Checkbox
                                    checked={
                                      rolesData?.administrationPermissionVO
                                        ?.globalLeaveLassFactorPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                    onChange={(e) => {
                                      handleRolesDataChange(
                                        null,
                                        null,
                                        e.target.checked,
                                        "administrationPermissionVO",
                                        "globalLeaveLassFactorPermissionVO",
                                        "commonAdministrationPermissionVO",
                                        "delete"
                                      );
                                    }}
                                    value={
                                      rolesData?.administrationPermissionVO
                                        ?.globalLeaveLassFactorPermissionVO
                                        ?.commonAdministrationPermissionVO
                                        ?.delete
                                    }
                                  />
                                  <span>Delete</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Box>
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: "250px",
                    marginTop: "-13px",
                    letterSpacing: "1.25px",
                  }}
                >
                  <ButtonSection>
                    <ModalControlButton2
                      style={{ marginRight: "20px", marginLeft: "100px" }}
                      type="button"
                      variant="contained"
                      onClick={() => {
                        resetData();
                      }}
                      value="Cancel"
                      id="cancel"
                    >
                      Cancel
                    </ModalControlButton2>
                    <ModalControlButton
                      type="button"
                      value="Save"
                      id="create-account"
                      variant="contained"
                      onClick={() => {
                        handleSave();
                      }}
                      disabled={isSaveDisabled}
                    >
                      Save
                    </ModalControlButton>
                  </ButtonSection>
                </div>
              </div>
            </form>
          </ModalDetailSection>
        </Box>
      </Modal>
    </div>
  );
}

function Tr({
  data: { roleId, roleDisplayName, roleName, active },
  rolesData,
  setIsSaveDisabled,
  getAllRolesData,
  updateIsOpen,
  updateRolesData,
}) {
  const [isDropdown, setDropdown] = useState(false);

  const OutsideClick = (ref) => {
    useEffect(() => {
      const handleOutsideClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setDropdown(false);
        }
      };
      document.addEventListener("mousedown", handleOutsideClick);
    }, [ref]);
  };

  const wrapperRef = useRef(null);
  OutsideClick(wrapperRef);

  const closeDropDown = () => {
    isDropdown ? setDropdown(false) : setDropdown(true);
  };

  const deleteRecord = (roleId) => {
    axios
      .delete(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/roles/${roleId}`
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        getAllRolesData();
        updateIsOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <TableRowSection ref={wrapperRef}>
        <TableCellSection>
          <span>{roleName || "Unknown"}</span>
        </TableCellSection>
        <TableCellSection>
          <span>{roleDisplayName || "Unknown"}</span>
        </TableCellSection>
        <TableCellSection style={{ position: "relative" }}>
          <span style={{ float: "right" }}>
            <AiIcons.AiOutlineMore
              onClick={(e) => {
                closeDropDown();
              }}
            ></AiIcons.AiOutlineMore>
            {isDropdown && (
              <div
                style={{
                  float: "right",
                  right: "20px",
                  position: "absolute",
                  overflow: "hidden",
                  width: "100px",
                  boxShadow: "none",
                }}
                class="dropdown-content"
              >
                <a
                  // className={!isActive && "disable-table-row"}
                  style={{ padding: "5px" }}
                  onClick={() => {
                    const found = rolesData?.find((e) => e?.roleId === roleId);
                    if (found) {
                      updateRolesData(found);
                      setIsSaveDisabled(true);
                      updateIsOpen(true);
                    }
                  }}
                >
                  <BorderColorOutlinedIcon
                    style={{ fontSize: "12px", paddingRight: "5px" }}
                  />
                  Edit / View
                </a>
                <a
                  // className={!isActive && "disable-table-row"}
                  style={{ padding: "5px" }}
                  onClick={() => {
                    deleteRecord(roleId);
                  }}
                >
                  <DeleteOutlinedIcon
                    style={{ fontSize: "15px", paddingRight: "5px" }}
                  />
                  Delete
                </a>
              </div>
            )}
          </span>
        </TableCellSection>
      </TableRowSection>
    </React.Fragment>
  );
}

export default RoleUserPermission;
