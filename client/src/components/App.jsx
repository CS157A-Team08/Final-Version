import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import WelPage from "./WelPage";
import Login from "./Login";
import MainPage from "./MainPage";
import SingleOrder from "./SingleOrder";
import ManageLogin from "./ManageLogin";
import ManageMenu from "./ManageMenu";
import Products from "./Products";
import StaffLogin from "./StaffLogin";
import AddStaff from "./AddStaff";
import StaffBio from "./StaffBio";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={WelPage}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/main" component={MainPage}></Route>
          <Route path="/staff" component={StaffLogin}></Route>
          <Route path="/managelogin" component={ManageLogin}></Route>
          <Route path="/managemenu" component={ManageMenu}></Route>
          <Route path="/order" component={SingleOrder}></Route>
          <Route path="/product" component={Products}></Route>
          <Route path="/managestaff" component={AddStaff}></Route>
          <Route path="/staffbio" component={StaffBio}></Route>

        </Switch>
      </React.Fragment>
    );
  }
}export default App;