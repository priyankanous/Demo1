import "./App.css";
import Sidebar from "./components/NavigationMenu/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import "./css/style.scss";
import RollingRevenueAdministration from "./utils/RollingRevenueAdministration";
import { RevenueEntry } from "./utils/RevenueEntry";
import { Reports } from "./utils/Reports";
import { Settings } from "./utils/Settings";
import Calendar from "./utils/Calendar";

function App() {
  return (
    <Router>
      <Sidebar />
      <Switch>
        <Route path="/dashboard" component={HomePage} />
        <Route
          path="/administration/bu"
          component={RollingRevenueAdministration.BuisnessUnit}
        />
        <Route
          path="/administration/region"
          component={RollingRevenueAdministration.Region}
        />
        <Route
          path="/administration/organization"
          component={RollingRevenueAdministration.Organization}
        />
        <Route
          path="/administration/sbu"
          component={RollingRevenueAdministration.Sbu}
        />
        <Route
          path="/administration/sbuhead"
          component={RollingRevenueAdministration.SbuHead}
        />
        <Route
          path="/administration/location"
          component={RollingRevenueAdministration.Location}
        />
        <Route
          path="/administration/bdm"
          component={RollingRevenueAdministration.Bdm}
        />
        <Route
          path="/administration/probabilitytype"
          component={RollingRevenueAdministration.Probability}
        />
        <Route
          path="/administration/businesstype"
          component={RollingRevenueAdministration.BusinessType}
        />
        <Route
          path="/administration/cocPractice"
          component={RollingRevenueAdministration.CocPractice}
        />
        <Route
          path="/administration/pricingType"
          component={RollingRevenueAdministration.PricingType}
        />
        <Route
          path="/administration/wostatus"
          component={RollingRevenueAdministration.WorkOrderStatus}
        />
        <Route
          path="/administration/status"
          component={RollingRevenueAdministration.Status}
        />
        <Route
          path="/administration/financialYear"
          component={RollingRevenueAdministration.FinancialYear}
        />
        <Route
          path="/administration/notificationConfig"
          component={RollingRevenueAdministration.NotificationConfig}
        />
        <Route
          path="/administration/currency"
          component={RollingRevenueAdministration.Currency}
        />
        <Route
          path="/administration/globalleavelossfactor"
          component={RollingRevenueAdministration.GlobalLeaveLossFactor}
        />
        <Route path="/revenue/rrentry" component={RevenueEntry.RREntry} />
        <Route
          path="/reports/businesstypewiseview"
          component={Reports.BusinessType}
        />
        <Route path="/settings/account" component={Settings.Account} />
        <Route path="/settings/opportunity" component={Settings.Opportunity} />
        <Route
          path="/settings/role-user-permission"
          component={Settings.RoleUserPermission}
        />
        <Route
          path="/settings/explicit-permission"
          component={Settings.ExplicitPermission}
        />
        <Route
          path="/settings/annual-target-entry"
          component={Settings.AnnualTargetEntry}
        />
        <Route
         path="/calender/holidaycalender"
         component={Calendar.HolidayCalendar}
        />
        <Route
         path="/calender/fortnightlymeeting"
         component={Calendar.FortnightlyMeetings}
        />
        <Route
         path="/calender/monthlybdmmeetings"
         component={Calendar.BdmMeetings}
        />
      </Switch>
    </Router>
  );
}

export default App;
