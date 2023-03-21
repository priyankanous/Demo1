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
      </Switch>
    </Router>
  );
}

export default App;
