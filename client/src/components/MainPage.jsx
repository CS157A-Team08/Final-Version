import React, { Component } from "react";
import Menu from "./Menu";
import NavBar from "./Navbar";
import RecMenu from "./RecMenu";
import SeafoodMenu from "./SeafoodMenu";
import SidesMenu from "./SidesMenu";
import DrinksMenu from "./DrinksMenu";
import { Switch, Route } from "react-router-dom";
import ManageLogin from "./ManageLogin";
import ManageMenu from "./ManageMenu";
import StaffBio from "./StaffBio";
import AddStaff from "./AddStaff";
import showMenu from "./showMenu";

class MainPage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <NavBar />

        <Switch>
          <Route exact path="/main" component={Menu} />
          <Route path="/main/recommendation" component={RecMenu} />
          <Route path="/main/seafood" component={SeafoodMenu} />
          <Route path="/main/sides" component={SidesMenu} />
          <Route path="/main/drinks" component={DrinksMenu} />
          <Route path="/main/drinks" component={DrinksMenu} />
          <Route path="/main/managelogin" component={ManageLogin} />
          <Route path="/main/managemenu" component={ManageMenu} />
          <Route path="/main/staffpage" component={StaffBio} />>
          <Route path="/main/addstaff" component={AddStaff} />
          <Route path="/main/showmenu" component={showMenu} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default MainPage;
