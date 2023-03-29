import "./App.css";
import Sidebar from "./components/NavigationMenu/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BuisnessUnit from "./components/Adminstration/BusinessUnit";
import HomePage from "./components/Home/HomePage";
import "./css/style.scss";
import Region from "./components/Adminstration/Region";
import Organization from "./components/Adminstration/Organization";
import Sbu from "./components/Adminstration/SBU";
import SbuHead from "./components/Adminstration/SbuHead";
import Location from "./components/Adminstration/Location";
import Bdm from "./components/Adminstration/BDM";
import Probability from "./components/Adminstration/ProbabilityType";
import BusinessType from "./components/Adminstration/BusinessType";
import CocPractice from "./components/Adminstration/CocPractice";
import PricingType from "./components/Adminstration/PricingType";
import WorkOrderStatus from "./components/Adminstration/WorkOrderStatus";
import Status from "./components/Adminstration/Status";
import FinancialYear from "./components/Adminstration/FinancialYear";
import Currency from "./components/Adminstration/GlobalLeaveLossFactor";
import GlobalLeaveLossFactor from "./components/Adminstration/GlobalLeaveLossFactor";

function App() {
  return (
    <Router>
      <Sidebar />
      <Switch>
        <Route path="/dashboard" component={HomePage} />
        <Route path="/administration/bu" component={BuisnessUnit} />
        <Route path="/administration/region" component={Region} />
        <Route path="/administration/organization" component={Organization} />
        <Route path="/administration/sbu" component={Sbu} />
        <Route path="/administration/sbuhead" component={SbuHead} />
        <Route path="/administration/location" component={Location} />
        <Route path="/administration/bdm" component={Bdm} />
        <Route path="/administration/probabilitytype" component={Probability} />
        <Route path="/administration/businesstype" component={BusinessType} />
        <Route path="/administration/cocPractice" component={CocPractice} />
        <Route path="/administration/pricingType" component={PricingType} />
        <Route path="/administration/wostatus" component={WorkOrderStatus} />
        <Route path="/administration/status" component={Status} />
        <Route path="/administration/financialYear" component={FinancialYear} />
        <Route
          path="/administration/globalleavelossfactor"
          component={GlobalLeaveLossFactor}
        />
      </Switch>
    </Router>
  );
}

export default App;
