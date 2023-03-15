import "./App.css";
import Sidebar from "./components/NavigationMenu/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BuisnessUnit from "./components/Adminstration/BusinessUnit";
import HomePage from "./components/Home/HomePage";
import "./css/style.scss"
import Region from "./components/Adminstration/Region";

function App() {
  return (
    <Router>
      <Sidebar />
      <Switch>
        <Route path="/administration/bu" component={BuisnessUnit} />
        <Route path="/dashboard" component={HomePage}/>
        <Route path="/admistration/region" component={Region}/>
        <Route path="/services" />
        <Route path="/services/services1" />
        <Route path="/services/services2" />
        <Route path="/services/services3" />
        <Route path="/contact" />
        <Route path="/events" />
        <Route path="/events/events1" />
        <Route path="/events/events2" />
        <Route path="/support" />
      </Switch>
    </Router>
  );
}

export default App;
