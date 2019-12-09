import React, { Component } from "react";
import Menu from "./Menu";
import NavBar from "./Navbar";
import RecMenu from "./RecMenu";
import Dessertmenu from "./Dessertmenu";
import SidesMenu from "./SidesMenu";
import DrinksMenu from "./DrinksMenu";
import { Switch, Route } from "react-router-dom";
import ManageLogin from "./ManageLogin";
import ManageMenu from "./ManageMenu";
import StaffBio from "./StaffBio";
import AddStaff from "./AddStaff";
import showMenu from "./showMenu";
import DeleteStaff from "./DeleteStaff";
import EditStaff from "./EditStaff";
import editMenu from "./editMenu";
import deleteMenu from "./deleteMenu";
import showorders from "./showorders";
import payment from'./payment';
import thanks from './thanks';
import Login from "./Login";
import EntreesMenu from "./EntreesMenu";
import StartersMenu from "./StartersMenu"
import ChefMenu from "./ChefMenu";


class MainPage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <NavBar />

        <Switch>
          <Route exact path="/main" component={Menu} />
          <Route path="/main/recommendation" component={RecMenu} />
          <Route path="/main/desserts" component={Dessertmenu} />
          <Route path="/main/sides" component={SidesMenu} />
          <Route path="/main/drinks" component={DrinksMenu} />
          <Route path="/main/managelogin" component={ManageLogin} />
          <Route path="/main/managemenu" component={ManageMenu} />
          <Route path="/main/staffpage" component={StaffBio} />>
          <Route path="/main/addstaff" component={AddStaff} />
          <Route path="/main/showmenu" component={showMenu} />
          <Route path="/main/deletestaff" component={DeleteStaff}></Route>
          <Route path="/main/editstaff" component={EditStaff}></Route>
          <Route path="/main/editmenu" component={editMenu}></Route>
          <Route path="/main/deletemenu" component={deleteMenu}></Route>
          <Route path="/main/showorders" component={showorders}></Route>
          <Route path="/main/payment" component={payment}></Route>
          <Route path="/main/thanks" component={thanks}></Route>
          <Route path="/main/entrees" component={EntreesMenu}></Route>
          <Route path="/main/starters" component={StartersMenu}></Route>
          <Route path="/main/chef" component={ChefMenu}></Route>
          <Route path="/main/login" component={Login}></Route>
        </Switch>
      </React.Fragment>
    );
  }
}

export default MainPage;
